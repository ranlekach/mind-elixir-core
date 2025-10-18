Incremental API
===============

This document describes the new incremental update API added to MindElixir. It allows external apps to modify nodes, arrows, and subtrees without calling `init()` or rebuilding the whole instance.

Key concepts
------------
- Batching: `beginBatch()` / `endBatch()` — group multiple updates so layout/link/arrow recalculation runs once when the outer-most batch ends.
- Node operations: `addNode(parentId, nodeData)`, `updateNode(nodeId, updates)`, `removeNode(nodeId)`
- Arrow operations: `addArrow(arrowData)`, `updateArrow(arrowId, updates)`, `removeArrow(arrowId?)`
- Helpers: `refreshLayout()`, `getNodeElementById(nodeId)`, `getNodeDataById(nodeId)`, `applyOperations(ops)`
- Performance helper: `replaceSubtree(nodeId, newSubtree)` — swap a subtree faster when you have a fully-computed replacement.

Simple examples
---------------
1) Add a node under a parent and update it:

```js
const id = instance.addNode(parentId, { text: 'New topic' })
instance.updateNode(id, { text: 'Updated' })
// either call refreshLayout() or rely on endBatch() if inside a batch
```

2) Create two nodes and a link inside a batch:

```js
instance.beginBatch()
const a = instance.addNode(rootId, { text: 'A' })
const b = instance.addNode(rootId, { text: 'B' })
instance.addArrow({ from: a, to: b, label: 'A→B' })
instance.endBatch()
```

3) Replace a subtree (recommended inside a batch for multiple changes):

```js
instance.beginBatch()
instance.replaceSubtree(nodeId, {
  id: nodeId,
  text: 'New root',
  children: [ { id: 'c1', text: 'child 1' }, { id: 'c2', text: 'child 2' } ]
})
instance.endBatch()
```

Error modes & compatibility
---------------------------
- Methods will throw for clearly invalid inputs (missing node ids, missing from/to for arrows).
- `removeArrow()` with no argument preserves original behavior and removes the currently selected arrow.
- Methods attempt safe fallbacks: for example, when DOM elements are absent, methods mutate the internal data model and callers can call `refreshLayout()` to materialize DOM changes.
- Prefer `beginBatch()`/`endBatch()` when running many updates.

Testing
-------
There are Playwright smoke tests added under `tests/incremental-update.spec.ts` validating node/arrow ops and batching behavior.

Notes
-----
- `getNodeDataById` returns a direct reference to internal data; clone it if you will mutate it outside API calls.
- `replaceSubtree` attempts a DOM replacement first and falls back to data-only replacement and a `refreshLayout()`.

Migration tips
--------------
- If your app previously used `init()` to rebuild the whole instance on changes, incremental API calls will generally be faster and preserve state (selection, undo history, etc.).

