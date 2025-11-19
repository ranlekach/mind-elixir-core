import type { Topic, Wrapper } from '../types/dom'
import type { MindElixirInstance, ZoomDetailStop } from '../types'

const HIDDEN_CLASS = 'lod-hidden'
const PROMOTED_CLASS = 'lod-promoted'
export const DEFAULT_PROMOTION_BOOST = 0.3

export const DEFAULT_ZOOM_DETAIL_STOPS: ZoomDetailStop[] = [
  { scale: 0.95, depth: Infinity },
  { scale: 0.85, depth: 6 },
  { scale: 0.72, depth: 4 },
  { scale: 0.58, depth: 3 },
  { scale: 0.45, depth: 2 },
  { scale: 0, depth: 1 },
]

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const getStops = (instance: MindElixirInstance) => {
  const stops = instance.zoomDetail?.depthStops?.length ? instance.zoomDetail.depthStops : DEFAULT_ZOOM_DETAIL_STOPS
  return stops
}

const resolveDepthLimit = (instance: MindElixirInstance): number => {
  const stops = getStops(instance)
  const scale = instance.scaleVal
  for (let i = 0; i < stops.length; i++) {
    const stop = stops[i]
    if (scale >= stop.scale) {
      return stop.depth
    }
  }
  return stops[stops.length - 1]?.depth ?? Infinity
}

const resolveParentTopic = (wrapper: Wrapper, instance: MindElixirInstance): Topic | null => {
  const parentEl = wrapper.parentElement
  if (!parentEl) return null
  const tag = parentEl.tagName
  if (tag === 'ME-CHILDREN') {
    const parentWrapper = parentEl.parentElement as Wrapper | null
    return parentWrapper?.querySelector('me-parent > me-tpc') || null
  }
  if (tag === 'ME-MAIN') {
    return instance.map.querySelector('me-root > me-tpc') as Topic | null
  }
  return null
}

const toggleTopicVisibility = (wrapper: Wrapper, topic: Topic, hidden: boolean) => {
  wrapper.classList.toggle(HIDDEN_CLASS, hidden)
  topic.classList.toggle(HIDDEN_CLASS, hidden)
}

const resetLevelOfDetail = (instance: MindElixirInstance) => {
  if (!instance.map) return
  const elements = instance.map.querySelectorAll<HTMLElement>(`.${HIDDEN_CLASS}`)
  elements.forEach(el => el.classList.remove(HIDDEN_CLASS))
  const promoted = instance.map.querySelectorAll<HTMLElement>(`me-tpc.${PROMOTED_CLASS}`)
  promoted.forEach(el => {
    el.classList.remove(PROMOTED_CLASS)
    el.style.removeProperty('--lod-promote-scale')
  })
  const hiddenPaths = instance.map.querySelectorAll<SVGPathElement>(`path.${HIDDEN_CLASS}`)
  hiddenPaths.forEach(path => path.classList.remove(HIDDEN_CLASS))
}

const applyPromotionState = (instance: MindElixirInstance, targets: Set<string>, depthLimit: number) => {
  const topics = instance.map.querySelectorAll<Topic>('me-tpc')
  const scale = computePromotionScale(instance)
  topics.forEach(topic => {
    const shouldPromote = Number.isFinite(depthLimit) && targets.has(topic.nodeObj.id) && !topic.classList.contains(HIDDEN_CLASS)
    topic.classList.toggle(PROMOTED_CLASS, shouldPromote)
    if (shouldPromote) {
      topic.style.setProperty('--lod-promote-scale', scale.toFixed(3))
    } else {
      topic.style.removeProperty('--lod-promote-scale')
    }
  })
}

const computePromotionScale = (instance: MindElixirInstance) => {
  const stops = getStops(instance)
  const topScale = stops[0]?.scale || 1
  const boost = instance.zoomDetail?.promotionBoost ?? DEFAULT_PROMOTION_BOOST
  if (topScale <= 0) return 1 + boost
  const normalized = 1 - clamp(instance.scaleVal / topScale, 0, 1)
  return 1 + normalized * boost
}

const toggleConnectorVisibility = (instance: MindElixirInstance, depthLimit: number) => {
  const connectors = instance.map.querySelectorAll<SVGPathElement>('path[data-node-depth]')
  connectors.forEach(connector => {
    const depth = Number(connector.dataset.nodeDepth ?? '0')
    const hidden = Number.isFinite(depthLimit) && depth > depthLimit
    connector.classList.toggle(HIDDEN_CLASS, hidden)
  })
}

export const applyLevelOfDetail = function (this: MindElixirInstance) {
  if (!this.nodes || !this.map) return
  if (!this.zoomDetail?.enabled) {
    resetLevelOfDetail(this)
    return
  }
  const depthLimit = resolveDepthLimit(this)
  if (!Number.isFinite(depthLimit)) {
    resetLevelOfDetail(this)
    return
  }
  const wrappers = this.nodes.querySelectorAll<Wrapper>('me-wrapper')
  const promoteTargets = new Set<string>()
  wrappers.forEach(wrapper => {
    const topic = wrapper.querySelector<Topic>('me-parent > me-tpc')
    if (!topic) return
    const depth = Number(topic.dataset.depth ?? '0')
    const hidden = depth > depthLimit
    toggleTopicVisibility(wrapper, topic, hidden)
    if (hidden) {
      const parentTopic = resolveParentTopic(wrapper, this)
      if (parentTopic) promoteTargets.add(parentTopic.nodeObj.id)
    }
  })
  applyPromotionState(this, promoteTargets, depthLimit)
  toggleConnectorVisibility(this, depthLimit)
}

export const getActiveDepthLimit = function (this: MindElixirInstance) {
  return resolveDepthLimit(this)
}
