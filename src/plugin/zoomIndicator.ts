import type { MindElixirInstance } from '../types'
import './zoomIndicator.less'

const formatScale = (scale: number) => `${Math.round(scale * 100)}%`

export default function zoomIndicator(mind: MindElixirInstance) {
  const indicator = document.createElement('div')
  indicator.className = 'mind-elixir-zoom-indicator'

  const label = document.createElement('div')
  label.className = 'mind-elixir-zoom-indicator__value'
  indicator.appendChild(label)

  const update = (scale = mind.scaleVal) => {
    label.textContent = formatScale(scale)
  }

  update()

  mind.container.appendChild(indicator)

  const handleScale = (scale: number) => {
    update(scale)
  }

  mind.bus.addListener('scale', handleScale)

  return () => {
    mind.bus.removeListener('scale', handleScale)
    indicator.remove()
  }
}
