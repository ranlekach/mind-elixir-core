import type { Topic } from '../types/dom'
import type { MindElixirInstance } from '../types'
import { setAttributes } from '../utils'
import { getOffsetLT, isTopic } from '../utils'

const ns = 'http://www.w3.org/2000/svg'

// SVG filter definitions for frosted glass effect
const createFrostedGlassFilter = () => {
  const defs = document.createElementNS(ns, 'defs')

  // Frosted glass filter for regular nodes
  const filter = document.createElementNS(ns, 'filter')
  filter.setAttribute('id', 'frosted-glass')
  filter.setAttribute('x', '-50%')
  filter.setAttribute('y', '-50%')
  filter.setAttribute('width', '200%')
  filter.setAttribute('height', '200%')

  // Gaussian blur for the frosted effect
  const blur = document.createElementNS(ns, 'feGaussianBlur')
  blur.setAttribute('in', 'SourceGraphic')
  blur.setAttribute('stdDeviation', '2')
  blur.setAttribute('result', 'blur')

  filter.appendChild(blur)
  defs.appendChild(filter)

  // Drop shadow filter
  const shadowFilter = document.createElementNS(ns, 'filter')
  shadowFilter.setAttribute('id', 'node-shadow')
  shadowFilter.setAttribute('x', '-50%')
  shadowFilter.setAttribute('y', '-50%')
  shadowFilter.setAttribute('width', '200%')
  shadowFilter.setAttribute('height', '200%')

  const shadowBlur = document.createElementNS(ns, 'feGaussianBlur')
  shadowBlur.setAttribute('in', 'SourceAlpha')
  shadowBlur.setAttribute('stdDeviation', '8')
  shadowBlur.setAttribute('result', 'blur')

  const shadowOffset = document.createElementNS(ns, 'feOffset')
  shadowOffset.setAttribute('in', 'blur')
  shadowOffset.setAttribute('dx', '0')
  shadowOffset.setAttribute('dy', '4')
  shadowOffset.setAttribute('result', 'offsetBlur')

  const shadowFlood = document.createElementNS(ns, 'feFlood')
  shadowFlood.setAttribute('flood-color', 'rgba(31, 38, 135, 0.12)')
  shadowFlood.setAttribute('result', 'color')

  const shadowComposite = document.createElementNS(ns, 'feComposite')
  shadowComposite.setAttribute('in', 'color')
  shadowComposite.setAttribute('in2', 'offsetBlur')
  shadowComposite.setAttribute('operator', 'in')
  shadowComposite.setAttribute('result', 'shadow')

  const shadowMerge = document.createElementNS(ns, 'feMerge')
  const shadowMergeNode1 = document.createElementNS(ns, 'feMergeNode')
  shadowMergeNode1.setAttribute('in', 'shadow')
  const shadowMergeNode2 = document.createElementNS(ns, 'feMergeNode')
  shadowMergeNode2.setAttribute('in', 'SourceGraphic')
  shadowMerge.appendChild(shadowMergeNode1)
  shadowMerge.appendChild(shadowMergeNode2)

  shadowFilter.appendChild(shadowBlur)
  shadowFilter.appendChild(shadowOffset)
  shadowFilter.appendChild(shadowFlood)
  shadowFilter.appendChild(shadowComposite)
  shadowFilter.appendChild(shadowMerge)
  defs.appendChild(shadowFilter)

  return defs
}

function createSvgDom(height: string, width: string) {
  const svg = document.createElementNS(ns, 'svg')
  setAttributes(svg, {
    version: '1.1',
    xmlns: ns,
    height,
    width,
  })
  return svg
}

function lineHightToPadding(lineHeight: string, fontSize: string) {
  return (parseInt(lineHeight) - parseInt(fontSize)) / 2
}

function generateSvgText(tpc: HTMLElement, tpcStyle: CSSStyleDeclaration, x: number, y: number) {
  const g = document.createElementNS(ns, 'g')
  // Get text content - tpc might be the text span directly or a Topic element
  let content = ''
  if ((tpc as Topic).text) {
    content = (tpc as Topic).text.textContent || ''
  } else {
    // tpc is likely the text span itself
    content = tpc.textContent || ''
  }
  const lines = content.split('\n')
  lines.forEach((line, index) => {
    const text = document.createElementNS(ns, 'text')
    setAttributes(text, {
      x: x + parseInt(tpcStyle.paddingLeft || '0') + '',
      y:
        y +
        parseInt(tpcStyle.paddingTop || '0') +
        lineHightToPadding(tpcStyle.lineHeight || '16px', tpcStyle.fontSize || '14px') * (index + 1) +
        parseFloat(tpcStyle.fontSize || '14') * (index + 1) +
        '',
      'text-anchor': 'start',
      'font-family': tpcStyle.fontFamily,
      'font-size': `${tpcStyle.fontSize}`,
      'font-weight': `${tpcStyle.fontWeight}`,
      fill: `${tpcStyle.color}`,
    })
    text.innerHTML = line
    g.appendChild(text)
  })
  return g
}

function generateSvgTextUsingForeignObject(tpc: HTMLElement, tpcStyle: CSSStyleDeclaration, x: number, y: number) {
  // Get text content - tpc might be the text span directly or a Topic element
  let content = ''
  if ((tpc as Topic).nodeObj?.dangerouslySetInnerHTML) {
    content = (tpc as Topic).nodeObj.dangerouslySetInnerHTML!
  } else if ((tpc as Topic).text) {
    content = (tpc as Topic).text.textContent || ''
  } else {
    // tpc is likely the text span itself - get its innerHTML to preserve any formatting
    content = tpc.innerHTML || tpc.textContent || ''
  }
  const foreignObject = document.createElementNS(ns, 'foreignObject')
  // Use larger dimensions to prevent text clipping
  const width = Math.max(parseInt(tpcStyle.width) || 200, 200)
  const height = Math.max(parseInt(tpcStyle.height) || 50, 50)
  setAttributes(foreignObject, {
    x: x + '',
    y: y + '',
    width: width + 'px',
    height: height + 'px',
  })
  const div = document.createElement('div')
  setAttributes(div, {
    xmlns: 'http://www.w3.org/1999/xhtml',
    style: `font-family: ${tpcStyle.fontFamily}; font-size: ${tpcStyle.fontSize}; font-weight: ${tpcStyle.fontWeight}; color: ${tpcStyle.color}; white-space: nowrap; overflow: visible;`,
  })
  div.innerHTML = content
  foreignObject.appendChild(div)
  return foreignObject
}

function createElBox(mei: MindElixirInstance, tpc: Topic) {
  const tpcStyle = getComputedStyle(tpc)
  const { offsetLeft: x, offsetTop: y } = getOffsetLT(mei.nodes, tpc)

  // Create a group to hold shadow and node background
  const g = document.createElementNS(ns, 'g')
  g.setAttribute('filter', 'url(#node-shadow)')

  const bg = document.createElementNS(ns, 'rect')

  // Parse the border radius (handle formats like "16px")
  const borderRadius = parseInt(tpcStyle.borderRadius) || 16

  // Default: frosted glass look (white with slight gray tint)
  let fillColor = 'rgba(248, 250, 252, 0.95)'
  let strokeColor = 'rgba(226, 232, 240, 0.8)'

  // Check if this is a root node - root nodes should also use frosted glass
  // We detect root by checking if parent is me-root or if it has specific root styling
  const isRoot = tpc.parentElement?.tagName === 'ME-ROOT'

  // Only preserve color for non-root nodes with explicit color coding (not blue/purple root styles)
  if (!isRoot) {
    const bgColor = tpcStyle.backgroundColor
    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
      const rgbaMatch = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
      if (rgbaMatch) {
        const r = parseInt(rgbaMatch[1])
        const gVal = parseInt(rgbaMatch[2])
        const b = parseInt(rgbaMatch[3])

        // Only use color if it's not a blue/purple shade (which are typically root/selection colors)
        // and not pure white
        const isBlueish = b > r + 30 && b > gVal + 30
        const isPurpleish = r > 100 && b > 100 && gVal < r - 30
        const isWhitish = r > 240 && gVal > 240 && b > 240

        if (!isBlueish && !isPurpleish && !isWhitish && (r < 245 || gVal < 245 || b < 245)) {
          fillColor = `rgba(${r}, ${gVal}, ${b}, 0.95)`
          strokeColor = `rgba(${Math.max(0, r - 30)}, ${Math.max(0, gVal - 30)}, ${Math.max(0, b - 30)}, 0.5)`
        }
      }
    }
  }

  setAttributes(bg, {
    x: x + '',
    y: y + '',
    rx: borderRadius + '',
    ry: borderRadius + '',
    width: tpcStyle.width,
    height: tpcStyle.height,
    fill: fillColor,
    stroke: strokeColor,
    'stroke-width': '1',
  })

  g.appendChild(bg)
  return g
}
function convertDivToSvg(mei: MindElixirInstance, tpc: HTMLElement, useForeignObject = false) {
  const tpcStyle = getComputedStyle(tpc)
  const { offsetLeft: x, offsetTop: y } = getOffsetLT(mei.nodes, tpc)

  const bg = document.createElementNS(ns, 'rect')
  setAttributes(bg, {
    x: x + '',
    y: y + '',
    rx: tpcStyle.borderRadius,
    ry: tpcStyle.borderRadius,
    width: tpcStyle.width,
    height: tpcStyle.height,
    fill: tpcStyle.backgroundColor,
    stroke: tpcStyle.borderColor,
    'stroke-width': tpcStyle.borderWidth,
  })
  const g = document.createElementNS(ns, 'g')
  g.appendChild(bg)
  let text: SVGGElement | null
  if (useForeignObject) {
    text = generateSvgTextUsingForeignObject(tpc, tpcStyle, x, y)
  } else text = generateSvgText(tpc, tpcStyle, x, y)
  g.appendChild(text)
  return g
}

function convertAToSvg(mei: MindElixirInstance, a: HTMLAnchorElement) {
  const aStyle = getComputedStyle(a)
  const { offsetLeft: x, offsetTop: y } = getOffsetLT(mei.nodes, a)
  const svgA = document.createElementNS(ns, 'a')
  const text = document.createElementNS(ns, 'text')
  setAttributes(text, {
    x: x + '',
    y: y + parseInt(aStyle.fontSize) + '',
    'text-anchor': 'start',
    'font-family': aStyle.fontFamily,
    'font-size': `${aStyle.fontSize}`,
    'font-weight': `${aStyle.fontWeight}`,
    fill: `${aStyle.color}`,
  })
  text.innerHTML = a.textContent!
  svgA.appendChild(text)
  svgA.setAttribute('href', a.href)
  return svgA
}

function convertImgToSvg(mei: MindElixirInstance, a: HTMLImageElement) {
  const aStyle = getComputedStyle(a)
  const { offsetLeft: x, offsetTop: y } = getOffsetLT(mei.nodes, a)
  const svgI = document.createElementNS(ns, 'image')
  setAttributes(svgI, {
    x: x + '',
    y: y + '',
    width: aStyle.width + '',
    height: aStyle.height + '',
    href: a.src,
  })
  return svgI
}

const padding = 100

const head = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">`

const generateSvg = (mei: MindElixirInstance, noForeignObject = false) => {
  const mapDiv = mei.nodes

  // Temporarily remove selection styling for clean export
  const selectedElements = mapDiv.querySelectorAll('.selected')
  selectedElements.forEach(el => el.classList.remove('selected'))

  const height = mapDiv.offsetHeight + padding * 2
  const width = mapDiv.offsetWidth + padding * 2
  const svg = createSvgDom(height + 'px', width + 'px')

  // Add filter definitions for frosted glass effect
  svg.appendChild(createFrostedGlassFilter())

  const g = document.createElementNS(ns, 'svg')
  const bgColor = document.createElementNS(ns, 'rect')
  setAttributes(bgColor, {
    x: '0',
    y: '0',
    width: `${width}`,
    height: `${height}`,
    fill: mei.theme.cssVar['--bgcolor'] as string,
  })
  svg.appendChild(bgColor)
  mapDiv.querySelectorAll('.subLines').forEach(item => {
    const clone = item.cloneNode(true) as SVGSVGElement
    const { offsetLeft, offsetTop } = getOffsetLT(mapDiv, item.parentElement as HTMLElement)
    clone.setAttribute('x', `${offsetLeft}`)
    clone.setAttribute('y', `${offsetTop}`)
    g.appendChild(clone)
  })

  const mainLine = mapDiv.querySelector('.lines')?.cloneNode(true)
  mainLine && g.appendChild(mainLine)
  const topiclinks = mapDiv.querySelector('.topiclinks')?.cloneNode(true)
  topiclinks && g.appendChild(topiclinks)
  const summaries = mapDiv.querySelector('.summary')?.cloneNode(true)
  summaries && g.appendChild(summaries)

  mapDiv.querySelectorAll<Topic>('me-tpc').forEach(tpc => {
    if (tpc.nodeObj.dangerouslySetInnerHTML) {
      g.appendChild(convertDivToSvg(mei, tpc, noForeignObject ? false : true))
    } else {
      g.appendChild(createElBox(mei, tpc))
      g.appendChild(convertDivToSvg(mei, tpc.text, noForeignObject ? false : true))
    }
  })
  mapDiv.querySelectorAll('.tags > span').forEach(tag => {
    g.appendChild(convertDivToSvg(mei, tag as HTMLElement))
  })
  mapDiv.querySelectorAll('.icons > span').forEach(icon => {
    g.appendChild(convertDivToSvg(mei, icon as HTMLElement))
  })
  mapDiv.querySelectorAll('.hyper-link').forEach(hl => {
    g.appendChild(convertAToSvg(mei, hl as HTMLAnchorElement))
  })
  mapDiv.querySelectorAll('img').forEach(img => {
    g.appendChild(convertImgToSvg(mei, img))
  })
  setAttributes(g, {
    x: padding + '',
    y: padding + '',
    overflow: 'visible',
  })
  svg.appendChild(g)

  // Restore selection styling
  selectedElements.forEach(el => el.classList.add('selected'))

  return svg
}

const generateSvgStr = (svgEl: SVGSVGElement, injectCss?: string) => {
  if (injectCss) svgEl.insertAdjacentHTML('afterbegin', '<style>' + injectCss + '</style>')
  return head + svgEl.outerHTML
}

function blobToUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = evt => {
      resolve(evt.target!.result as string)
    }
    reader.onerror = err => {
      reject(err)
    }
    reader.readAsDataURL(blob)
  })
}

export const exportSvg = function (this: MindElixirInstance, noForeignObject = false, injectCss?: string) {
  const svgEl = generateSvg(this, noForeignObject)
  const svgString = generateSvgStr(svgEl, injectCss)
  const blob = new Blob([svgString], { type: 'image/svg+xml' })
  return blob
}

export const exportPng = async function (this: MindElixirInstance, noForeignObject = false, injectCss?: string): Promise<Blob | null> {
  const blob = this.exportSvg(noForeignObject, injectCss)
  // use base64 to bypass canvas taint
  const url = await blobToUrl(blob)
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.setAttribute('crossOrigin', 'anonymous')
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      canvas.toBlob(resolve, 'image/png', 1)
    }
    img.src = url
    img.onerror = reject
  })
}
