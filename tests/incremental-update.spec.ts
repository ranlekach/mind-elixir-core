import { test, expect } from './mind-elixir-test'

const initial = {
  nodeData: {
    id: 'root',
    topic: 'Root',
    children: [],
  },
}

test.beforeEach(async ({ me }) => {
  await me.init(initial)
})

test('add/update/remove node without re-init', async ({ page, me }) => {
  const instanceHandle = await me.getInstance()

  // Add a node under root
  const newId = await page.evaluate(async instance => {
    return instance.addNode('root', { topic: 'New Child', id: 'child-1' })
  }, instanceHandle)

  expect(newId).toBe('child-1')

  // Verify DOM element exists
  await expect(page.locator('me-tpc[data-nodeid="mechild-1"]')).toBeVisible()

  // Update node topic
  await page.evaluate(async instance => {
    instance.updateNode('child-1', { topic: 'Updated Child' })
  }, instanceHandle)

  await expect(page.locator('me-tpc[data-nodeid="mechild-1"]')).toHaveText('Updated Child')

  // Remove node
  await page.evaluate(async instance => {
    instance.removeNode('child-1')
  }, instanceHandle)

  await expect(page.locator('me-tpc[data-nodeid="mechild-1"]')).not.toBeVisible()

  // And getData must reflect removal
  const data = await me.getData()
  expect(data.nodeData.children.length).toBe(0)
})

test('add/update/remove arrow without re-init', async ({ page, me }) => {
  const instanceHandle = await me.getInstance()

  // Add two nodes first
  await page.evaluate(async instance => {
    instance.addNode('root', { topic: 'A', id: 'a' })
    instance.addNode('root', { topic: 'B', id: 'b' })
  }, instanceHandle)

  // Add arrow
  await page.evaluate(async instance => {
    instance.addArrow({ from: 'a', to: 'b', label: 'link1' })
  }, instanceHandle)

  const arrowData = await page.evaluate(async instance => instance.arrows[0], instanceHandle)
  expect(arrowData.label).toBe('link1')

  // Update arrow
  await page.evaluate(async instance => {
    const id = instance.arrows[0].id
    instance.updateArrow(id, { label: 'updated' })
  }, instanceHandle)

  const updated = await page.evaluate(async instance => instance.arrows[0], instanceHandle)
  expect(updated.label).toBe('updated')

  // Remove arrow
  await page.evaluate(async instance => {
    const id = instance.arrows[0].id
    instance.removeArrow(id)
  }, instanceHandle)

  const count = await page.evaluate(async instance => instance.arrows.length, instanceHandle)
  expect(count).toBe(0)
})

test('beginBatch + multiple ops + endBatch triggers single refresh', async ({ page, me }) => {
  const instanceHandle = await me.getInstance()

  // override layout to count calls
  // Spy on layout on the instance object (window['#map'])
  await page.evaluate(async () => {
    ;(window as any).__layoutCount = 0
    const inst = (window as any)['#map']
    const orig = inst.layout
    inst.layout = function () {
      ;(window as any).__layoutCount++
      orig && orig.call(this)
    }
  })

  // perform batched ops
  await page.evaluate(async instance => {
    instance.beginBatch()
    instance.addNode('root', { topic: 'x', id: 'n1' })
    instance.addNode('root', { topic: 'y', id: 'n2' })
    instance.updateNode('n1', { topic: 'x-updated' })
    instance.endBatch()
  }, instanceHandle)

  // wait a bit for debounced refresh
  await page.waitForTimeout(200)

  const layoutCount = await page.evaluate(() => (window as any).__layoutCount)
  expect(layoutCount).toBe(1)

  // ensure nodes exist
  await expect(page.locator('me-tpc[data-nodeid="men1"]')).toBeVisible()
  await expect(page.locator('me-tpc[data-nodeid="men2"]')).toBeVisible()
})
