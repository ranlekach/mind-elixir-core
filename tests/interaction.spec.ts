import { test, expect } from './mind-elixir-test'

const id = 'root-id'
const topic = 'root-topic'
const childTopic = 'child-topic'
const data = {
  nodeData: {
    topic,
    id,
    children: [
      {
        id: 'middle',
        topic: 'middle',
        children: [
          {
            id: 'child',
            topic: childTopic,
          },
        ],
      },
    ],
  },
}

test.beforeEach(async ({ me }) => {
  await me.init(data)
})

test('Edit Node', async ({ page, me }) => {
  await me.dblclick(topic)
  await expect(page.locator('#input-box')).toBeVisible()
  await page.keyboard.insertText('update node')
  await page.keyboard.press('Enter')
  await expect(page.locator('#input-box')).toBeHidden()
  await expect(page.getByText('update node')).toBeVisible()
  await me.toHaveScreenshot()
})

test('Clear and reset', async ({ page, me }) => {
  await me.dblclick(topic)
  await expect(page.locator('#input-box')).toBeVisible()
  await page.keyboard.press('Backspace')
  await page.keyboard.press('Enter')
  await expect(page.locator('#input-box')).toBeHidden()
  await expect(page.getByText(topic)).toBeVisible()
  await me.toHaveScreenshot()
})

test('Remove Node', async ({ page, me }) => {
  await me.click(childTopic)
  await page.keyboard.press('Delete')
  await expect(page.getByText(childTopic)).toBeHidden()
  await me.toHaveScreenshot()
})

test('Add Sibling', async ({ page, me }) => {
  await me.click(childTopic)
  await page.keyboard.press('Enter')
  await page.keyboard.press('Enter')
  await expect(page.locator('#input-box')).toBeHidden()
  await expect(page.getByText('New Node')).toBeVisible()
  await me.toHaveScreenshot()
})

test('Add Before', async ({ page, me }) => {
  await me.click(childTopic)
  await page.keyboard.press('Shift+Enter')
  await page.keyboard.press('Enter')
  await expect(page.locator('#input-box')).toBeHidden()
  await expect(page.getByText('New Node')).toBeVisible()
  await me.toHaveScreenshot()
})

test('Add Parent', async ({ page, me }) => {
  await me.click(childTopic)
  await page.keyboard.press('Control+Enter')
  await page.keyboard.insertText('new node')
  await page.keyboard.press('Enter')
  await expect(page.locator('#input-box')).toBeHidden()
  await expect(page.getByText('new node')).toBeVisible()
  await me.toHaveScreenshot()
})

test('Add Child', async ({ page, me }) => {
  await me.click(childTopic)
  await page.keyboard.press('Tab')
  await page.keyboard.insertText('new node')
  await page.keyboard.press('Enter')
  await expect(page.locator('#input-box')).toBeHidden()
  await expect(page.getByText('new node')).toBeVisible()
  await me.toHaveScreenshot()
})

test('Copy and Paste', async ({ page, me }) => {
  await me.click('middle')
  await page.keyboard.press('Control+c')
  await me.click('child-topic')
  await page.keyboard.press('Control+v')
  // I guess Playwright will auto-scroll before taking screenshots
  // After changing the scrolling solution to transform, we can't get complete me-nodes screenshot through scrolling
  // This is indeed a very quirky "feature"
  await me.toHaveScreenshot(page.locator('.map-container'))
})

test('Zoomed-out view hides deep nodes', async ({ page }) => {
  await page.evaluate(() => {
    const instance = (window as any)['#map']
    instance.scaleMin = 0.05
    instance.scale(0.12)
  })
  await expect(page.locator('[data-nodeid="mechild"]')).toHaveClass(/lod-hidden/)
  await expect(page.locator('[data-nodeid="memiddle"]')).toHaveClass(/lod-promoted/)
})

test('Zoom indicator reflects current scale', async ({ page, me }) => {
  await me.init(data, '#map', { zoomIndicator: true })
  const indicator = page.locator('.mind-elixir-zoom-indicator__value')
  await expect(indicator).toHaveText('100%')
  await page.evaluate(() => {
    const instance = (window as any)['#map']
    instance.scale(0.4)
  })
  await expect(indicator).toHaveText('40%')
})

test('Zoomed-out view fades deep nodes before hiding', async ({ page }) => {
  await page.evaluate(() => {
    const instance = (window as any)['#map']
    instance.scale(0.27)
  })
  await expect(page.locator('[data-nodeid="mechild"]')).toHaveClass(/lod-fading/)
  await expect(page.locator('[data-nodeid="mechild"]')).not.toHaveClass(/lod-hidden/)
  await expect(page.locator('[data-nodeid="memiddle"]')).toHaveClass(/lod-promoted/)
})
