import type { MindElixirInstance, MindElixirData, NodeObj } from './index'
import type { Topic } from './types/dom'
import type { Arrow } from './arrow'
import linkDiv from './linkDiv'
import contextMenu from './plugin/contextMenu'
import keypressInit from './plugin/keypress'
import nodeDraggable from './plugin/nodeDraggable'
import operationHistory from './plugin/operationHistory'
import toolBar from './plugin/toolBar'
import selection from './plugin/selection'
import { editTopic, createWrapper, createParent, createChildren, createTopic, findEle } from './utils/dom'
import { getObjById, generateNewObj, fillParent, generateUUID } from './utils/index'
import { layout } from './utils/layout'
import { changeTheme } from './utils/theme'
import * as interact from './interact'
import * as nodeOperation from './nodeOperation'
import * as arrow from './arrow'
import * as summary from './summary'
import * as exportImage from './plugin/exportImage'
import * as levelOfDetail from './utils/levelOfDetail'

export type OperationMap = typeof nodeOperation
export type Operations = keyof OperationMap
type NodeOperation = {
  [K in Operations]: ReturnType<typeof beforeHook<K>>
}

function beforeHook<T extends Operations>(
  fn: OperationMap[T],
  fnName: T
): (this: MindElixirInstance, ...args: Parameters<OperationMap[T]>) => Promise<void> {
  return async function (this: MindElixirInstance, ...args: Parameters<OperationMap[T]>) {
    const hook = this.before[fnName]
    if (hook) {
      const res = await hook.apply(this, args)
      if (!res) return
    }
    ;(fn as (this: MindElixirInstance, ...args: Parameters<OperationMap[T]>) => void).apply(this, args)
  }
}

const operations = Object.keys(nodeOperation) as Array<Operations>
const nodeOperationHooked = {} as NodeOperation
if (import.meta.env.MODE !== 'lite') {
  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i]
    nodeOperationHooked[operation] = beforeHook(nodeOperation[operation], operation)
  }
}

export type MindElixirMethods = typeof methods

/**
 * Methods that mind-elixir instance can use
 *
 * @public
 */
const methods = {
  getObjById,
  generateNewObj,
  layout,
  linkDiv,
  editTopic,
  createWrapper,
  createParent,
  createChildren,
  createTopic,
  findEle,
  changeTheme,
  // Batching primitives: allow callers to group multiple incremental updates
  // without triggering expensive layout/link recalculations on every change.
  // Usage: beginBatch(); ... multiple add/update/remove calls ...; endBatch();
  // Nested beginBatch/endBatch calls are supported via a counter.
  /**
   * Start a nested batch. Use when applying multiple operations to avoid
   * repeated expensive layout/link/arrow recalculations.
   *
   * Behavior notes:
   * - Supports nesting via a counter. Each call to `beginBatch()` must be
   *   paired with a corresponding `endBatch()` to allow the instance to
   *   perform the consolidated refresh.
   * - We intentionally do not throw on mismatched calls; unpaired calls may
   *   delay refreshes, so callers should ensure pairing.
   */
  beginBatch(this: MindElixirInstance) {
    // initialize counter if missing
    const inst = this as MindElixirInstance & { _batchCounter?: number }
    inst._batchCounter = (inst._batchCounter || 0) + 1
  },
  /**
   * End a previously opened batch. When the outer-most batch closes this
   * will trigger a single debounced refresh if operations occurred during
   * the batch.
   *
   * Compatibility notes:
   * - If called without a matching `beginBatch()` we do not throw; the
   *   counter is clamped to 0 and a refresh will run if _batchDirty was set.
   */
  endBatch(this: MindElixirInstance) {
    const inst = this as MindElixirInstance & { _batchCounter?: number; _batchDirty?: boolean; refreshLayout?: () => void }
    inst._batchCounter = Math.max(0, (inst._batchCounter || 0) - 1)
    // when outermost batch closes, perform a single refresh if needed
    if (inst._batchCounter === 0 && inst._batchDirty) {
      // clear dirty before refresh to avoid re-entrancy issues
      inst._batchDirty = false
      // call refresh/layout once
      if (typeof inst.refreshLayout === 'function') {
        inst.refreshLayout()
      } else {
        // fallback to layout + linkDiv for older internal API
        inst.layout && inst.layout()
        inst.linkDiv && inst.linkDiv()
      }
    }
  },
  // Internal helper: mark that an operation happened during a batch and
  // should trigger a layout when the batch completes.
  _markBatchDirty(this: MindElixirInstance) {
    const inst = this as MindElixirInstance & { _batchDirty?: boolean }
    inst._batchDirty = true
  },
  /**
   * Create a new node under `parentId`. Returns the created node id.
   *
   * Notes:
   * - If the instance has no `nodeData` a minimal root will be created.
   * - If the parent's DOM element is not present we attempt to `init()` the
   *   instance to build the DOM; if that fails an Error is thrown.
   * - This method updates both internal model and DOM (when available).
   *   If you only modify data and want to postpone layout/rendering, call
   *   `beginBatch()`/`endBatch()` around multiple ops or use `refreshLayout()`
   *   manually.
   */
  addNode(this: MindElixirInstance, parentId: string, nodeData: Partial<NodeObj>): string {
    const inst = this as MindElixirInstance & { _batchCounter?: number; _markBatchDirty?: () => void; init?: (data: MindElixirData) => void }
    // ensure nodeData root exists
    if (!this.nodeData) {
      // create a minimal root if none exists
      const root = Object.assign(this.generateNewObj(), { children: [] })
      this.nodeData = root as NodeObj
    }
    const parentObj = getObjById(parentId, this.nodeData)
    if (!parentObj) throw new Error(`addNode: parent id ${parentId} not found`)

    // Prepare new node object and ensure id
    const newNodeObj = Object.assign(this.generateNewObj(), nodeData || {})

    // If parent DOM element exists, use existing nodeOperation to create DOM.
    let parentTopic = this.findEle(parentId)

    // If no parentTopic in DOM, fallback to init to build DOM structure
    if (!parentTopic) {
      try {
        // init will layout and build DOM from this.nodeData
        this.init({ nodeData: this.nodeData, arrows: this.arrows || [], summaries: this.summaries || [] } as any)
      } catch (e) {
        // swallow and continue; we'll try again to find topic
      }
      parentTopic = this.findEle(parentId)
      if (!parentTopic) throw new Error(`addNode: parent DOM for ${parentId} not found`)
    }

    // Insert via underlying nodeOperation.addChild to reuse DOM helpers
    // When in batch, temporarily suppress linkDiv to avoid expensive recalcs
    const restoreLinkDiv = (inst._batchCounter || 0) > 0 && this.linkDiv ? this.linkDiv : null
    if (restoreLinkDiv)
      inst.linkDiv = () => {
        /* no-op during batch */
      }
    try {
      // use original implementation to avoid beforeHook wrapper
      ;(nodeOperation.addChild as (this: MindElixirInstance, parent: Topic, node: NodeObj) => void).apply(this, [parentTopic, newNodeObj])
    } finally {
      if (restoreLinkDiv) inst.linkDiv = restoreLinkDiv
    }

    // mark batch dirty if inside a batch
    if ((inst._batchCounter || 0) > 0) inst._markBatchDirty?.()

    return newNodeObj.id
  },
  /**
   * Update a node's data and DOM. Partial updates are allowed.
   *
   * Throws when the instance has no `nodeData` or when the nodeId does
   * not exist. If the node's DOM element is present the visual shape/text
   * will be updated immediately; otherwise only the internal model is
   * mutated and a later `refreshLayout()` will reconcile the DOM.
   */
  updateNode(this: MindElixirInstance, nodeId: string, updates: Partial<NodeObj>) {
    const inst = this as MindElixirInstance & { _batchCounter?: number; _markBatchDirty?: () => void }
    if (!this.nodeData) throw new Error('updateNode: instance has no nodeData')
    const nodeObj = getObjById(nodeId, this.nodeData)
    if (!nodeObj) throw new Error(`updateNode: node ${nodeId} not found`)

    const topicEl = this.findEle(nodeId)
    // If DOM exists, prefer reshapeNode which updates DOM/text accordingly
    if (topicEl) {
      const restoreLinkDiv = (inst._batchCounter || 0) > 0 && this.linkDiv ? this.linkDiv : null
      if (restoreLinkDiv)
        inst.linkDiv = () => {
          /* no-op during batch */
        }
      try {
        ;(nodeOperation.reshapeNode as (this: MindElixirInstance, topic: Topic, updates: Partial<NodeObj>) => void).apply(this, [topicEl, updates])
      } finally {
        if (restoreLinkDiv) inst.linkDiv = restoreLinkDiv
      }
    } else {
      // no DOM: update internal data only
      Object.assign(nodeObj, updates)
    }

    if ((inst._batchCounter || 0) > 0) inst._markBatchDirty?.()
  },

  /**
   * Remove node and its subtree by id.
   *
   * Behavior:
   * - Throws when the instance has no `nodeData` or the node is not found.
   * - Removal of the root node will clear `nodeData`.
   * - To preserve strict backward-compatibility we throw for not-found
   *   cases; callers that want idempotent removal should catch errors.
   */
  removeNode(this: MindElixirInstance, nodeId: string) {
    const inst = this as MindElixirInstance & { _batchCounter?: number; _markBatchDirty?: () => void; nodeData?: NodeObj }
    if (!this.nodeData) throw new Error('removeNode: instance has no nodeData')
    const nodeObj = getObjById(nodeId, this.nodeData)
    if (!nodeObj) throw new Error(`removeNode: node ${nodeId} not found`)

    const topicEl = this.findEle(nodeId)
    const restoreLinkDiv = (inst._batchCounter || 0) > 0 && this.linkDiv ? this.linkDiv : null
    if (restoreLinkDiv)
      inst.linkDiv = () => {
        /* no-op during batch */
      }
    try {
      if (topicEl) {
        ;(nodeOperation.removeNodes as (this: MindElixirInstance, topics: Topic[]) => void).apply(this, [[topicEl]])
      } else {
        // remove from internal data
        // try to find parent and remove child entry
        const parent = nodeObj.parent
        if (!parent) {
          // removing root
          ;(this as Partial<MindElixirInstance>).nodeData = undefined
        } else if (parent.children) {
          parent.children = parent.children.filter((c: NodeObj) => c.id !== nodeId)
          fillParent(this.nodeData)
        }
      }
    } finally {
      if (restoreLinkDiv) inst.linkDiv = restoreLinkDiv
    }

    if ((inst._batchCounter || 0) > 0) inst._markBatchDirty?.()
  },
  ...interact,
  ...(nodeOperationHooked as NodeOperation),
  ...arrow,
  // Incremental arrow API that respects batching. These override the defaults
  // provided by the arrow module so external apps can call them safely.
  /**
   * Add an arrow between two nodes.
   *
   * Requirements:
   * - `arrowData.from` and `arrowData.to` must be valid node ids.
   *
   * Returns the created arrow id. If the DOM elements for the endpoints
   * are not present an Error is thrown (the caller can create the nodes
   * first or call `init()`/`refreshLayout()` to materialize DOM before
   * creating arrows).
   */
  addArrow(this: MindElixirInstance, arrowData: { id?: string; from: string; to: string; label?: string; bidirectional?: boolean }) {
    const inst = this as MindElixirInstance & { _batchCounter?: number; _markBatchDirty?: () => void }
    if (!this.arrows) this.arrows = []
    const fromEl = this.findEle(arrowData.from)
    const toEl = this.findEle(arrowData.to)
    if (!fromEl || !toEl) throw new Error('addArrow: from/to node not found')
    const arrowObj = Object.assign({ id: arrowData.id }, arrowData)
    if ((inst._batchCounter || 0) > 0) {
      const created = Object.assign(
        {
          id: arrowObj.id || generateUUID(),
          label: arrowObj.label || 'Custom Link',
          delta1: { x: fromEl.offsetWidth / 2 + 100, y: 0 },
          delta2: { x: toEl.offsetWidth / 2 + 100, y: 0 },
        },
        arrowObj
      )
      this.arrows.push(created)
      inst._markBatchDirty?.()
      return created.id
    }
    // use createArrow which computes sensible default control points
    ;(arrow.createArrow as (this: MindElixirInstance, fromEl: Topic, toEl: Topic, arrowData: Partial<Arrow>) => void).apply(this, [
      fromEl,
      toEl,
      arrowObj,
    ])
    return this.arrows[this.arrows.length - 1].id
  },
  /**
   * Update an existing arrow's properties. Throws when arrows are absent
   * or the arrowId is not found.
   */
  updateArrow(this: MindElixirInstance, arrowId: string, updates: Partial<Arrow>) {
    const inst = this as MindElixirInstance & { _batchCounter?: number; _markBatchDirty?: () => void }
    if (!this.arrows) throw new Error('updateArrow: no arrows present')
    const idx = this.arrows.findIndex(a => a.id === arrowId)
    if (idx === -1) throw new Error(`updateArrow: arrow ${arrowId} not found`)
    const existing = this.arrows[idx]
    this.arrows[idx] = Object.assign({}, existing, updates)
    const rendered = this.linkSvgGroup && this.linkSvgGroup.querySelector(`[data-linkid="${arrowId}"]`)
    if (rendered) {
      // No fine-grained arrow update API; re-render arrows for correctness
      this.renderArrow && this.renderArrow()
    }
    if ((inst._batchCounter || 0) > 0) inst._markBatchDirty?.()
  },
  /**
   * Remove an arrow. When called with no argument retains original
   * behavior: it will remove the currently selected arrow (if any).
   * Calling with a non-existent id is a no-op.
   */
  removeArrow(this: MindElixirInstance, arrowId?: string) {
    const inst = this as MindElixirInstance & { _batchCounter?: number; _markBatchDirty?: () => void }
    // allow call with no args to remove currently selected arrow (existing behavior)
    if (!arrowId) {
      ;(arrow.removeArrow as (this: MindElixirInstance, svg?: SVGElement) => void).apply(this)
      return
    }
    if (!this.arrows) return
    const idx = this.arrows.findIndex(a => a.id === arrowId)
    if (idx === -1) return
    const svgEl = this.linkSvgGroup && this.linkSvgGroup.querySelector(`[data-linkid="${arrowId}"]`)
    if (svgEl && (inst._batchCounter || 0) === 0) {
      ;(arrow.removeArrow as (this: MindElixirInstance, svg?: SVGElement) => void).apply(this, [svgEl as SVGElement])
    } else {
      this.arrows = this.arrows.filter(a => a.id !== arrowId)
      if ((inst._batchCounter || 0) > 0) inst._markBatchDirty?.()
    }
  },
  ...summary,
  ...exportImage,
  ...levelOfDetail,
  /**
   * Force recompute of layout and links. Debounced to avoid thrash.
   * options?: { animate?: boolean }
   */
  refreshLayout(this: MindElixirInstance, _options?: { animate?: boolean }) {
    const inst = this as MindElixirInstance & { _refreshTimer?: NodeJS.Timeout }
    // debounce multiple calls within short period
    if (inst._refreshTimer) {
      clearTimeout(inst._refreshTimer)
    }
    inst._refreshTimer = setTimeout(() => {
      inst._refreshTimer = undefined
      // run layout first (layout may accept animate in future; preserve API)
      try {
        this.layout && this.layout()
      } catch (e) {
        // ignore layout errors to keep instance usable
        console.warn('refreshLayout: layout failed', e)
      }
      try {
        this.linkDiv && this.linkDiv()
      } catch (e) {
        console.warn('refreshLayout: linkDiv failed', e)
      }
      // ensure arrows are rendered
      if (this.renderArrow) this.renderArrow()
    }, 50)
  },
  /** Return DOM element for a node id. Null if not mounted. */
  getNodeElementById(this: MindElixirInstance, nodeId: string) {
    return this.findEle(nodeId) || null
  },
  /** Read-only view of node data. Returns a direct reference. */
  getNodeDataById(this: MindElixirInstance, nodeId: string) {
    if (!this.nodeData) return null
    return getObjById(nodeId, this.nodeData as any)
  },
  /**
   * Apply a batch of operations atomically. Each op is { type, payload }.
   * Supported types: addNode, updateNode, removeNode, addArrow, updateArrow, removeArrow
   * On error, endBatch() will clear pending dirty state and the error is rethrown.
   *
   * Returns an array of results corresponding to each op (ids or undefined).
   */
  applyOperations(this: MindElixirInstance, ops: Array<{ type: string; payload: Record<string, unknown> }>) {
    const inst = this as MindElixirInstance & { _batchDirty?: boolean }
    this.beginBatch()
    try {
      for (const op of ops) {
        switch (op.type) {
          case 'addNode':
            this.addNode(op.payload.parentId as string, op.payload.nodeData as Partial<NodeObj>)
            break
          case 'updateNode':
            this.updateNode(op.payload.nodeId as string, op.payload.updates as Partial<NodeObj>)
            break
          case 'removeNode':
            this.removeNode(op.payload.nodeId as string)
            break
          case 'addArrow':
            this.addArrow(op.payload as { from: string; to: string; id?: string; label?: string; bidirectional?: boolean })
            break
          case 'updateArrow':
            this.updateArrow(op.payload.id as string, op.payload.updates as Partial<Arrow>)
            break
          case 'removeArrow':
            this.removeArrow(op.payload.id as string)
            break
          default:
            throw new Error(`applyOperations: unsupported op type ${op.type}`)
        }
      }
    } catch (e) {
      // Ensure batch state is cleaned and rethrow
      try {
        // clear dirty to avoid leaving instance in inconsistent state
        inst._batchDirty = false
      } finally {
        this.endBatch()
      }
      throw e
    }
    this.endBatch()
  },
  /**
   * Replace a node's subtree in the internal model with `newSubtree`.
   * This offers a faster path when you have a fully-computed replacement
   * and want to avoid per-node add/remove calls.
   *
   * Behavior and safety:
   * - `newSubtree` must be a node object (with `id` and optional `children`).
   * - If the node's DOM is mounted, we will attempt to update the DOM by
   *   removing the previous subtree DOM and inserting a fresh subtree built
   *   from `newSubtree`. This uses existing `nodeOperation` helpers.
   * - If any step fails, we fall back to replacing only the internal data
   *   model and schedule a `refreshLayout()` so the visual state is
   *   reconciled at the next tick.
   *
   * This helper is intentionally conservative to avoid breaking existing
   * callers; it is recommended to call within a `beginBatch()`/`endBatch()`
   * block when doing multiple large updates.
   */
  replaceSubtree(this: MindElixirInstance, nodeId: string, newSubtree: NodeObj) {
    const inst = this as MindElixirInstance & { _batchCounter?: number; _markBatchDirty?: () => void; nodeData?: NodeObj }
    if (!nodeId) throw new Error('replaceSubtree: nodeId is required')
    if (!newSubtree || typeof newSubtree !== 'object') throw new Error('replaceSubtree: newSubtree must be an object')
    if (!this.nodeData) throw new Error('replaceSubtree: instance has no nodeData')

    const nodeObj = getObjById(nodeId, this.nodeData)
    if (!nodeObj) throw new Error(`replaceSubtree: node ${nodeId} not found`)

    // Attach parent references to new subtree for internal integrity
    const clone: NodeObj = JSON.parse(JSON.stringify(newSubtree))
    clone.parent = nodeObj.parent

    const topicEl = this.findEle(nodeId)
    if (topicEl) {
      // If DOM is mounted, try a DOM-level replacement using nodeOperation
      try {
        // remove current subtree DOM
        ;(nodeOperation.removeNodes as (this: MindElixirInstance, topics: Topic[]) => void).apply(this, [[topicEl]])
        // create wrapper for new subtree and insert
        // Find parent topic - the topic is inside parent > wrapper, so we need to go up
        const parentTopic = nodeObj.parent ? this.findEle(nodeObj.parent.id) : null
        if (parentTopic) {
          ;(nodeOperation.addChild as (this: MindElixirInstance, parent: Topic, node: NodeObj) => void).apply(this, [parentTopic, clone])
        }
        // sync internal model
        if (nodeObj.parent && nodeObj.parent.children) {
          nodeObj.parent.children = nodeObj.parent.children.map((c: NodeObj) => (c.id === nodeId ? clone : c))
          fillParent(this.nodeData)
        } else {
          // replacing root
          inst.nodeData = clone
          fillParent(inst.nodeData)
        }
        if ((inst._batchCounter || 0) > 0) inst._markBatchDirty?.()
        return clone.id
      } catch (e) {
        // fallback to data-only replacement below
        console.warn('replaceSubtree: DOM replacement failed, falling back to model-only', e)
      }
    }

    // Data-only replacement: swap in clone and schedule refresh
    if (nodeObj.parent && nodeObj.parent.children) {
      nodeObj.parent.children = nodeObj.parent.children.map((c: NodeObj) => (c.id === nodeId ? clone : c))
      fillParent(this.nodeData)
    } else {
      inst.nodeData = clone
      fillParent(inst.nodeData)
    }
    if ((inst._batchCounter || 0) > 0) inst._markBatchDirty?.()
    // ensure visual reconciliation
    if (!((inst._batchCounter || 0) > 0)) this.refreshLayout()
    return clone.id
  },
  init(this: MindElixirInstance, data: MindElixirData) {
    data = JSON.parse(JSON.stringify(data))
    if (!data || !data.nodeData) return new Error('MindElixir: `data` is required')
    if (data.direction !== undefined) {
      this.direction = data.direction
    }
    this.changeTheme(data.theme || this.theme, false)
    this.nodeData = data.nodeData
    fillParent(this.nodeData)
    this.arrows = data.arrows || []
    this.summaries = data.summaries || []
    this.tidyArrow()
    // plugins
    this.toolBar && toolBar(this)
    if (import.meta.env.MODE !== 'lite') {
      this.keypress && keypressInit(this, this.keypress)

      if (!this.selectionDisabled) {
        selection(this)
      }
      if (this.contextMenu) {
        this.disposable.push(contextMenu(this, this.contextMenu))
      }
      this.draggable && this.disposable.push(nodeDraggable(this))
      this.allowUndo && this.disposable.push(operationHistory(this))
    }
    this.layout()
    this.linkDiv()
    this.toCenter()
  },
  destroy(this: Partial<MindElixirInstance>) {
    this.disposable!.forEach(fn => fn())
    if (this.el) this.el.innerHTML = ''
    this.el = undefined
    this.nodeData = undefined
    this.arrows = undefined
    this.summaries = undefined
    this.currentArrow = undefined
    this.currentNodes = undefined
    this.currentSummary = undefined
    this.waitCopy = undefined
    this.theme = undefined
    this.direction = undefined
    this.bus = undefined
    this.container = undefined
    this.map = undefined
    this.lines = undefined
    this.linkController = undefined
    this.linkSvgGroup = undefined
    this.P2 = undefined
    this.P3 = undefined
    this.line1 = undefined
    this.line2 = undefined
    this.nodes = undefined
    this.selection?.destroy()
    this.selection = undefined
  },
}

export default methods
