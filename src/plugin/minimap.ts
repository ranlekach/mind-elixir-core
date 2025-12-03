import type { MindElixirInstance } from '../types'
import type { Topic } from '../types/dom'
import { getOffsetLT, getTranslate } from '../utils/index'
import './minimap.less'

type Bounds = { left: number; top: number; width: number; height: number }
type Point = { x: number; y: number }
type NodeSnapshot = {
  topic: Topic
  id: string
  parentId?: string
  relX: number
  relY: number
  width: number
  height: number
  depth: number
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const isTransparent = (value?: string | null) => !value || value === 'transparent' || value === 'rgba(0, 0, 0, 0)'
const DEFAULT_BG = '#111827'
const MINIMAP_NODE_FILL = 'rgba(156, 163, 175, 0.85)'
const MINIMAP_NODE_STROKE = 'rgba(75, 85, 99, 0.95)'
const MINIMAP_EDGE_STROKE = 'rgba(75, 85, 99, 0.65)'
const MIN_STROKE_PX = 0.45

const resolveContainerBackground = (mind: MindElixirInstance) => {
  try {
    const bg = window.getComputedStyle(mind.container).backgroundColor
    return isTransparent(bg) ? DEFAULT_BG : bg
  } catch (err) {
    return DEFAULT_BG
  }
}

const ensureMiniStrokeWidth = (baseWidth: number, scale: number) => {
  if (!Number.isFinite(scale) || scale <= 0) return baseWidth
  const minWidth = MIN_STROKE_PX / scale
  return Math.max(baseWidth, minWidth)
}

export default function initMinimap(mind: MindElixirInstance) {
  if (!mind.container || !mind.map || !mind.nodes) return

  const config = mind.minimap
  const resolveFrameBackground = () => (config.backgroundColor?.trim() ? config.backgroundColor : resolveContainerBackground(mind))
  // remove stale minimap if present (e.g. after re-init)
  mind.minimapContainer?.remove()

  const container = document.createElement('div')
  container.className = 'mind-elixir-minimap'
  container.style.width = `${config.width}px`
  container.style.height = `${config.height}px`
  container.style.setProperty('--mind-elixir-minimap-bg', resolveFrameBackground())
  container.style.setProperty('--mind-elixir-minimap-border', config.borderColor)
  if (!config.visible) {
    container.classList.add('hidden')
  }

  const canvas = document.createElement('canvas')
  canvas.className = 'mind-elixir-minimap__canvas'
  const dpr = window.devicePixelRatio || 1
  canvas.width = Math.round(config.width * dpr)
  canvas.height = Math.round(config.height * dpr)
  canvas.style.width = `${config.width}px`
  canvas.style.height = `${config.height}px`
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.scale(dpr, dpr)

  const viewport = document.createElement('div')
  viewport.className = 'mind-elixir-minimap__viewport'
  viewport.style.setProperty('--mind-elixir-minimap-viewport-fill', config.viewportColor)
  viewport.style.setProperty('--mind-elixir-minimap-viewport-border', config.viewportBorderColor)

  container.appendChild(canvas)
  container.appendChild(viewport)
  mind.container.appendChild(container)
  mind.minimapContainer = container

  let contentBounds: Bounds = {
    left: mind.nodes.offsetLeft,
    top: mind.nodes.offsetTop,
    width: Math.max(1, mind.nodes.offsetWidth),
    height: Math.max(1, mind.nodes.offsetHeight),
  }
  let renderScale = 1
  let renderOffsetX = 0
  let renderOffsetY = 0
  let redrawFrame: number | null = null
  let viewportFrame: number | null = null
  let pendingRedraw = false
  let isDragging = false
  let dragPointerId: number | null = null
  let dragPointerOffset: Point = { x: 0, y: 0 }

  const measureContentBounds = (): Bounds => {
    const nodes = mind.nodes
    if (!nodes) return contentBounds
    return {
      left: nodes.offsetLeft,
      top: nodes.offsetTop,
      width: Math.max(1, nodes.offsetWidth),
      height: Math.max(1, nodes.offsetHeight),
    }
  }

  const computeRenderTransform = () => {
    const { width, height } = contentBounds
    const targetWidth = Math.max(1, config.width - config.padding * 2)
    const targetHeight = Math.max(1, config.height - config.padding * 2)
    const ratio = Math.min(targetWidth / width, targetHeight / height)
    renderScale = Number.isFinite(ratio) && ratio > 0 ? ratio : 1
    const drawnWidth = width * renderScale
    const drawnHeight = height * renderScale
    renderOffsetX = (config.width - drawnWidth) / 2
    renderOffsetY = (config.height - drawnHeight) / 2
  }

  const drawMinimap = () => {
    contentBounds = measureContentBounds()
    computeRenderTransform()
    ctx.clearRect(0, 0, config.width, config.height)

    const drawnWidth = contentBounds.width * renderScale
    const drawnHeight = contentBounds.height * renderScale
    const frameBackground = resolveFrameBackground()
    ctx.fillStyle = frameBackground
    ctx.fillRect(renderOffsetX, renderOffsetY, drawnWidth, drawnHeight)
    ctx.strokeStyle = config.borderColor
    ctx.strokeRect(renderOffsetX + 0.5, renderOffsetY + 0.5, Math.max(0, drawnWidth - 1), Math.max(0, drawnHeight - 1))

    const topics = mind.nodes.querySelectorAll<Topic>('me-tpc')
    const snapshots: NodeSnapshot[] = []
    const centers = new Map<string, Point>()

    topics.forEach(topic => {
      if (!topic.offsetParent) return
      const topicWidth = topic.offsetWidth
      const topicHeight = topic.offsetHeight
      if (!topicWidth || !topicHeight) return
      const { offsetLeft, offsetTop } = getOffsetLT(mind.map, topic)
      const relX = offsetLeft - contentBounds.left
      const relY = offsetTop - contentBounds.top
      const depth = Number(topic.dataset.depth ?? '0')
      const snapshot: NodeSnapshot = {
        topic,
        id: topic.nodeObj.id,
        parentId: topic.nodeObj.parent?.id,
        relX,
        relY,
        width: topicWidth,
        height: topicHeight,
        depth,
      }
      snapshots.push(snapshot)
      centers.set(snapshot.id, { x: relX + topicWidth / 2, y: relY + topicHeight / 2 })
    })

    const canRenderCurves = typeof Path2D !== 'undefined'
    if (canRenderCurves && mind.lines) {
      const connectorPaths = mind.lines.querySelectorAll<SVGPathElement>('path[data-node-id]')
      if (connectorPaths.length) {
        ctx.save()
        ctx.translate(renderOffsetX - contentBounds.left * renderScale, renderOffsetY - contentBounds.top * renderScale)
        ctx.scale(renderScale, renderScale)
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.strokeStyle = MINIMAP_EDGE_STROKE
        connectorPaths.forEach(pathEl => {
          const d = pathEl.getAttribute('d')
          if (!d) return
          const baseWidth = ensureMiniStrokeWidth(Number(pathEl.getAttribute('stroke-width')) || 2, renderScale)
          ctx.lineWidth = baseWidth
          try {
            const path = new Path2D(d)
            ctx.stroke(path)
          } catch (err) {
            // ignore malformed paths; sub connectors handled below
          }
        })
        ctx.restore()
      }
    }

    const connectorWidth = Math.max(1, renderScale * 1.2)
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    snapshots.forEach(snapshot => {
      if (!snapshot.parentId) return
      if (snapshot.depth <= 1) return
      const parentCenter = centers.get(snapshot.parentId)
      const childCenter = centers.get(snapshot.id)
      if (!parentCenter || !childCenter) return
      ctx.strokeStyle = MINIMAP_EDGE_STROKE
      ctx.lineWidth = connectorWidth
      ctx.beginPath()
      ctx.moveTo(renderOffsetX + parentCenter.x * renderScale, renderOffsetY + parentCenter.y * renderScale)
      const ctrlX = parentCenter.x + (childCenter.x - parentCenter.x) * 0.5
      ctx.bezierCurveTo(
        renderOffsetX + ctrlX * renderScale,
        renderOffsetY + parentCenter.y * renderScale,
        renderOffsetX + ctrlX * renderScale,
        renderOffsetY + childCenter.y * renderScale,
        renderOffsetX + childCenter.x * renderScale,
        renderOffsetY + childCenter.y * renderScale
      )
      ctx.stroke()
    })

    snapshots.forEach(snapshot => {
      const drawX = renderOffsetX + snapshot.relX * renderScale
      const drawY = renderOffsetY + snapshot.relY * renderScale
      const drawW = Math.max(1, snapshot.width * renderScale)
      const drawH = Math.max(1, snapshot.height * renderScale)
      ctx.fillStyle = MINIMAP_NODE_FILL
      ctx.fillRect(drawX, drawY, drawW, drawH)
      ctx.strokeStyle = MINIMAP_NODE_STROKE
      ctx.lineWidth = Math.max(0.5, renderScale * 0.9)
      ctx.strokeRect(drawX + 0.5, drawY + 0.5, Math.max(0, drawW - 1), Math.max(0, drawH - 1))
    })

    scheduleViewportUpdate()
  }

  const scheduleFullRedraw = () => {
    pendingRedraw = true
    if (redrawFrame !== null) return
    redrawFrame = requestAnimationFrame(() => {
      redrawFrame = null
      if (!pendingRedraw) return
      pendingRedraw = false
      drawMinimap()
    })
  }

  const updateViewportOverlay = () => {
    if (!mind.map) return
    const { x: translateX, y: translateY } = getTranslate(mind.map.style.transform || '')
    const scale = mind.scaleVal || 1
    const containerWidth = mind.container.clientWidth
    const containerHeight = mind.container.clientHeight
    const viewportWidthWorld = containerWidth / scale
    const viewportHeightWorld = containerHeight / scale
    const viewportLeftWorld = (0 - translateX) / scale
    const viewportTopWorld = (0 - translateY) / scale

    const relLeft = viewportLeftWorld - contentBounds.left
    const relTop = viewportTopWorld - contentBounds.top

    const miniWidth = viewportWidthWorld * renderScale
    const miniHeight = viewportHeightWorld * renderScale
    const miniLeft = renderOffsetX + relLeft * renderScale
    const miniTop = renderOffsetY + relTop * renderScale

    const widthPx = Math.max(8, miniWidth)
    const heightPx = Math.max(8, miniHeight)
    const leftPx = miniLeft
    const topPx = miniTop

    viewport.style.width = `${widthPx}px`
    viewport.style.height = `${heightPx}px`
    viewport.style.transform = `translate(${leftPx}px, ${topPx}px)`
  }

  const scheduleViewportUpdate = () => {
    if (viewportFrame !== null) return
    viewportFrame = requestAnimationFrame(() => {
      viewportFrame = null
      updateViewportOverlay()
    })
  }

  const minimapToWorld = (mini: Point): Point => {
    if (!renderScale) return { x: contentBounds.left, y: contentBounds.top }
    const x = (mini.x - renderOffsetX) / renderScale + contentBounds.left
    const y = (mini.y - renderOffsetY) / renderScale + contentBounds.top
    const left = contentBounds.left
    const top = contentBounds.top
    const right = left + contentBounds.width
    const bottom = top + contentBounds.height
    return {
      x: clamp(x, left, right),
      y: clamp(y, top, bottom),
    }
  }

  const panToWorldCenter = (point: Point) => {
    const { x: currentX, y: currentY } = getTranslate(mind.map.style.transform || '')
    const scale = mind.scaleVal || 1
    const targetX = mind.container.clientWidth / 2 - point.x * scale
    const targetY = mind.container.clientHeight / 2 - point.y * scale
    const dx = targetX - currentX
    const dy = targetY - currentY
    if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) return
    mind.move(dx, dy)
  }

  const panToMinimapPoint = (miniX: number, miniY: number) => {
    const worldPoint = minimapToWorld({ x: miniX, y: miniY })
    panToWorldCenter(worldPoint)
  }

  const getLocalCoords = (event: PointerEvent): Point => {
    const rect = container.getBoundingClientRect()
    return {
      x: clamp(event.clientX - rect.left, 0, config.width),
      y: clamp(event.clientY - rect.top, 0, config.height),
    }
  }

  const handlePointerDown = (event: PointerEvent) => {
    event.preventDefault()
    event.stopPropagation()
    const local = getLocalCoords(event)
    const viewportRect = viewport.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const viewportCenterX = viewportRect.left - containerRect.left + viewportRect.width / 2
    const viewportCenterY = viewportRect.top - containerRect.top + viewportRect.height / 2
    const target = event.target as HTMLElement
    if (target === viewport || viewport.contains(target)) {
      dragPointerOffset = {
        x: local.x - viewportCenterX,
        y: local.y - viewportCenterY,
      }
    } else {
      dragPointerOffset = { x: 0, y: 0 }
      panToMinimapPoint(local.x, local.y)
    }
    isDragging = true
    dragPointerId = event.pointerId
    container.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent) => {
    if (!isDragging || dragPointerId !== event.pointerId) return
    event.preventDefault()
    const local = getLocalCoords(event)
    const targetX = clamp(local.x - dragPointerOffset.x, 0, config.width)
    const targetY = clamp(local.y - dragPointerOffset.y, 0, config.height)
    panToMinimapPoint(targetX, targetY)
  }

  const endDrag = (event: PointerEvent) => {
    if (dragPointerId !== event.pointerId) return
    isDragging = false
    dragPointerId = null
    dragPointerOffset = { x: 0, y: 0 }
    if (container.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId)
    }
  }

  container.addEventListener('pointerdown', handlePointerDown)
  container.addEventListener('pointermove', handlePointerMove)
  container.addEventListener('pointerup', endDrag)
  container.addEventListener('pointercancel', endDrag)

  const handleScale = () => scheduleViewportUpdate()
  const handleMove = () => scheduleViewportUpdate()
  const handleOperation = () => scheduleFullRedraw()
  const handleLinkDiv = () => scheduleFullRedraw()

  mind.bus.addListener('scale', handleScale)
  mind.bus.addListener('move', handleMove)
  mind.bus.addListener('operation', handleOperation)
  mind.bus.addListener('linkDiv', handleLinkDiv)

  const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => scheduleViewportUpdate()) : null
  resizeObserver?.observe(mind.container)

  scheduleFullRedraw()

  return () => {
    resizeObserver?.disconnect()
    if (redrawFrame !== null) cancelAnimationFrame(redrawFrame)
    if (viewportFrame !== null) cancelAnimationFrame(viewportFrame)
    container.removeEventListener('pointerdown', handlePointerDown)
    container.removeEventListener('pointermove', handlePointerMove)
    container.removeEventListener('pointerup', endDrag)
    container.removeEventListener('pointercancel', endDrag)
    mind.bus.removeListener('scale', handleScale)
    mind.bus.removeListener('move', handleMove)
    mind.bus.removeListener('operation', handleOperation)
    mind.bus.removeListener('linkDiv', handleLinkDiv)
    if (mind.minimapContainer === container) {
      mind.minimapContainer = undefined
    }
    container.remove()
  }
}
