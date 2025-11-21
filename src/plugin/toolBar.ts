import type { MindElixirInstance } from '../types/index'
import side from '../icons/side.svg?raw'
import left from '../icons/left.svg?raw'
import right from '../icons/right.svg?raw'
import full from '../icons/full.svg?raw'
import living from '../icons/living.svg?raw'
import zoomin from '../icons/zoomin.svg?raw'
import zoomout from '../icons/zoomout.svg?raw'

import './toolBar.less'

const map: Record<string, string> = {
  side,
  left,
  right,
  full,
  living,
  zoomin,
  zoomout,
}
const createButton = (id: string, name: string) => {
  const button = document.createElement('span')
  button.id = id
  button.innerHTML = map[name]
  return button
}

function createToolBarRBContainer(mind: MindElixirInstance) {
  const toolBarRBContainer = document.createElement('div')
  const fc = createButton('fullscreen', 'full')
  const gc = createButton('toCenter', 'living')
  const cs = createButton('centerOnSelected', 'living')
  const zo = createButton('zoomout', 'zoomout')
  const zi = createButton('zoomin', 'zoomin')
  const percentage = document.createElement('span')
  percentage.innerText = '100%'

  // Add titles for accessibility and clarity
  fc.title = 'Toggle Fullscreen'
  gc.title = 'Center on Root'
  cs.title = 'Center on Selected Node'
  zo.title = 'Zoom Out'
  zi.title = 'Zoom In'

  // Add a visual indicator to distinguish centerOnSelected from toCenter
  cs.style.opacity = '0.7'

  toolBarRBContainer.appendChild(fc)
  toolBarRBContainer.appendChild(gc)
  toolBarRBContainer.appendChild(cs)
  toolBarRBContainer.appendChild(zo)
  toolBarRBContainer.appendChild(zi)
  // toolBarRBContainer.appendChild(percentage)
  toolBarRBContainer.className = 'mind-elixir-toolbar rb'
  fc.onclick = () => {
    if (document.fullscreenElement === mind.el) {
      document.exitFullscreen()
    } else {
      mind.el.requestFullscreen()
    }
  }
  gc.onclick = () => {
    mind.toCenter()
  }
  cs.onclick = () => {
    mind.centerOnSelected()
  }
  zo.onclick = () => {
    mind.scale(mind.scaleVal - mind.scaleSensitivity)
  }
  zi.onclick = () => {
    mind.scale(mind.scaleVal + mind.scaleSensitivity)
  }
  return toolBarRBContainer
}
function createToolBarLTContainer(mind: MindElixirInstance) {
  const toolBarLTContainer = document.createElement('div')
  const l = createButton('tbltl', 'left')
  const r = createButton('tbltr', 'right')
  const s = createButton('tblts', 'side')

  toolBarLTContainer.appendChild(l)
  toolBarLTContainer.appendChild(r)
  toolBarLTContainer.appendChild(s)
  toolBarLTContainer.className = 'mind-elixir-toolbar lt'
  l.onclick = () => {
    mind.initLeft()
  }
  r.onclick = () => {
    mind.initRight()
  }
  s.onclick = () => {
    mind.initSide()
  }
  return toolBarLTContainer
}

export default function (mind: MindElixirInstance) {
  mind.container.append(createToolBarRBContainer(mind))
  mind.container.append(createToolBarLTContainer(mind))
}
