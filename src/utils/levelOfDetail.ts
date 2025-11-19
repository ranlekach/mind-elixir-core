import type { Topic, Wrapper } from '../types/dom'
import type { MindElixirInstance, ZoomDetailStop } from '../types'

const HIDDEN_CLASS = 'lod-hidden'
const FADING_CLASS = 'lod-fading'
const PROMOTED_CLASS = 'lod-promoted'
const FADE_BUFFER_DECAY_START = 0.35
export const DEFAULT_PROMOTION_BOOST = 0.3
export const DEFAULT_FADE_DEPTH_BUFFER = 1

export const DEFAULT_ZOOM_DETAIL_STOPS: ZoomDetailStop[] = [
  { scale: 1.1, depth: Infinity },
  { scale: 1.0, depth: 6 },
  { scale: 0.95, depth: 4 },
  { scale: 0.8, depth: 3 },
  { scale: 0.6, depth: 2 },
  { scale: 0, depth: 1 },
]

/*export const DEFAULT_ZOOM_DETAIL_STOPS: ZoomDetailStop[] = [
  { scale: 0.95, depth: Infinity },
  { scale: 0.85, depth: 6 },
  { scale: 0.72, depth: 4 },
  { scale: 0.58, depth: 3 },
  { scale: 0.45, depth: 2 },
  { scale: 0, depth: 1 },
]*/

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const getStops = (instance: MindElixirInstance) => {
  const stops = instance.zoomDetail?.depthStops?.length ? instance.zoomDetail.depthStops : DEFAULT_ZOOM_DETAIL_STOPS
  return stops
}

type DepthContext = {
  depthLimit: number
  stopIndex: number
  stops: ZoomDetailStop[]
}

const resolveDepthContext = (instance: MindElixirInstance): DepthContext => {
  const stops = getStops(instance)
  const scale = instance.scaleVal
  const lastIndex = Math.max(0, stops.length - 1)
  for (let i = 0; i < stops.length; i++) {
    const stop = stops[i]
    if (scale >= stop.scale) {
      return { depthLimit: stop.depth, stopIndex: i, stops }
    }
  }
  return { depthLimit: stops[lastIndex]?.depth ?? Infinity, stopIndex: lastIndex, stops }
}

const computeZoomProgress = (scale: number, stops: ZoomDetailStop[], stopIndex: number) => {
  if (!stops.length) return 1
  const currentStop = stops[stopIndex]
  const previousStop = stops[stopIndex - 1]
  const upperScale = previousStop?.scale ?? 1
  const lowerScale = currentStop?.scale ?? 0
  const range = Math.max(upperScale - lowerScale, Number.EPSILON)
  const progress = (upperScale - scale) / range
  return clamp(progress, 0, 1)
}

const computeEffectiveFadeDepth = (depthLimit: number, baseFadeBuffer: number, zoomProgress: number) => {
  if (!Number.isFinite(depthLimit) || baseFadeBuffer <= 0) return depthLimit
  if (zoomProgress <= FADE_BUFFER_DECAY_START) {
    return depthLimit + baseFadeBuffer
  }
  const remainingRatio = clamp(1 - (zoomProgress - FADE_BUFFER_DECAY_START) / (1 - FADE_BUFFER_DECAY_START), 0, 1)
  return depthLimit + baseFadeBuffer * remainingRatio
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

type VisibilityState = 'visible' | 'fading' | 'hidden'

const applyTopicState = (wrapper: Wrapper, topic: Topic, state: VisibilityState, fadeStrength = 0) => {
  const isHidden = state === 'hidden'
  const isFading = state === 'fading'
  wrapper.classList.toggle(HIDDEN_CLASS, isHidden)
  wrapper.classList.toggle(FADING_CLASS, isFading)
  topic.classList.toggle(HIDDEN_CLASS, isHidden)
  topic.classList.toggle(FADING_CLASS, isFading)
  if (isFading) {
    topic.style.setProperty('--lod-fade-progress', fadeStrength.toFixed(3))
  } else {
    topic.style.removeProperty('--lod-fade-progress')
  }
}

const resetLevelOfDetail = (instance: MindElixirInstance) => {
  if (!instance.map) return
  const hidden = instance.map.querySelectorAll<HTMLElement>(`.${HIDDEN_CLASS}`)
  hidden.forEach(el => el.classList.remove(HIDDEN_CLASS))
  const fading = instance.map.querySelectorAll<HTMLElement>(`.${FADING_CLASS}`)
  fading.forEach(el => {
    el.classList.remove(FADING_CLASS)
    el.style?.removeProperty('--lod-fade-progress')
  })
  const promoted = instance.map.querySelectorAll<HTMLElement>(`me-tpc.${PROMOTED_CLASS}`)
  promoted.forEach(el => {
    el.classList.remove(PROMOTED_CLASS)
    el.style.removeProperty('--lod-promote-scale')
  })
  const affectedPaths = instance.map.querySelectorAll<SVGPathElement>(`path.${HIDDEN_CLASS}, path.${FADING_CLASS}`)
  affectedPaths.forEach(path => {
    path.classList.remove(HIDDEN_CLASS)
    path.classList.remove(FADING_CLASS)
    path.style.removeProperty('--lod-fade-progress')
  })
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

const computeFadeStrength = (depth: number, depthLimit: number, fadeDepth: number, zoomProgress: number) => {
  if (depth <= depthLimit) return 0
  const range = Math.max(fadeDepth - depthLimit, 0.001)
  const depthRatio = (depth - depthLimit) / range
  return clamp((depthRatio + zoomProgress) / 2, 0, 1)
}

const applyConnectorState = (instance: MindElixirInstance, depthLimit: number, fadeDepth: number, zoomProgress: number) => {
  const connectors = instance.map.querySelectorAll<SVGPathElement>('path[data-node-depth]')
  connectors.forEach(connector => {
    const depth = Number(connector.dataset.nodeDepth ?? '0')
    const hidden = Number.isFinite(fadeDepth) && depth > fadeDepth
    const fading = !hidden && Number.isFinite(depthLimit) && depth > depthLimit
    connector.classList.toggle(HIDDEN_CLASS, hidden)
    connector.classList.toggle(FADING_CLASS, fading)
    if (fading) {
      const fadeStrength = computeFadeStrength(depth, depthLimit, fadeDepth, zoomProgress)
      connector.style.setProperty('--lod-fade-progress', fadeStrength.toFixed(3))
    } else {
      connector.style.removeProperty('--lod-fade-progress')
    }
  })
}

export const applyLevelOfDetail = function (this: MindElixirInstance) {
  if (!this.nodes || !this.map) return
  if (!this.zoomDetail?.enabled) {
    resetLevelOfDetail(this)
    return
  }
  const { depthLimit, stopIndex, stops } = resolveDepthContext(this)
  if (!Number.isFinite(depthLimit)) {
    resetLevelOfDetail(this)
    return
  }
  const zoomProgress = computeZoomProgress(this.scaleVal, stops, stopIndex)
  const baseFadeBuffer = Math.max(0, this.zoomDetail?.fadeDepthBuffer ?? DEFAULT_FADE_DEPTH_BUFFER)
  const fadeDepth = computeEffectiveFadeDepth(depthLimit, baseFadeBuffer, zoomProgress)
  const wrappers = this.nodes.querySelectorAll<Wrapper>('me-wrapper')
  const promoteTargets = new Set<string>()
  wrappers.forEach(wrapper => {
    const topic = wrapper.querySelector<Topic>('me-parent > me-tpc')
    if (!topic) return
    const depth = Number(topic.dataset.depth ?? '0')
    const hidden = Number.isFinite(fadeDepth) && depth > fadeDepth
    const fading = !hidden && depth > depthLimit
    const state: VisibilityState = hidden ? 'hidden' : fading ? 'fading' : 'visible'
    const fadeStrength = fading ? computeFadeStrength(depth, depthLimit, fadeDepth, zoomProgress) : 0
    applyTopicState(wrapper, topic, state, fadeStrength)
    if (depth > depthLimit) {
      const parentTopic = resolveParentTopic(wrapper, this)
      if (parentTopic) promoteTargets.add(parentTopic.nodeObj.id)
    }
  })
  applyPromotionState(this, promoteTargets, depthLimit)
  applyConnectorState(this, depthLimit, fadeDepth, zoomProgress)
}

export const getActiveDepthLimit = function (this: MindElixirInstance) {
  const { depthLimit } = resolveDepthContext(this)
  return depthLimit
}
