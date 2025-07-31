import { describe, expect, it } from 'vitest'
import { sleep } from './index'

describe('sleep', () => {
  // 测试 Promise 的正确性
  it('should return a resolved promise', async () => {
    const promise = sleep(10)

    expect(promise).toBeInstanceOf(Promise)

    // 等待 Promise 解析
    await promise

    // 如果到达这里，说明 Promise 成功解析
    expect(true).toBe(true)
  })
})
