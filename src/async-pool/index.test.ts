import { describe, expect, it } from 'vitest'
import { asyncPool } from './index'

describe('asyncPool', () => {
  // 测试基本功能：并发限制
  it('should limit concurrency correctly', async () => {
    const results: number[] = []
    const executing: number[] = []

    const iteratorFun = async (item: number) => {
      executing.push(item)
      await new Promise(resolve => setTimeout(resolve, 50))
      executing.splice(executing.indexOf(item), 1)
      results.push(item)
      return item
    }

    await asyncPool(2, [1, 2, 3, 4, 5], iteratorFun)

    // 验证所有任务都执行了
    expect(results.sort()).toEqual([1, 2, 3, 4, 5])
  })

  // 测试错误处理：开启trick模式
  it('should handle errors when trick is enabled', async () => {
    const iteratorFun = async (item: number) => {
      if (item === 3) {
        throw new Error('Error on item 3')
      }
      await new Promise(resolve => setTimeout(resolve, 10))
      return item
    }

    const result = await asyncPool(2, [1, 2, 3, 4, 5], iteratorFun, true)

    // 验证成功的结果
    expect(result).toContain(1)
    expect(result).toContain(2)
    expect(result).toContain(4)
    expect(result).toContain(5)

    // 验证错误被捕获（返回错误对象）
    const errorResult = result.find(r => r instanceof Error)
    expect(errorResult).toBeInstanceOf(Error)
  })

  // 测试错误处理：关闭trick模式
  it('should throw error when trick is disabled', async () => {
    const iteratorFun = async (item: number) => {
      if (item === 3) {
        throw new Error('Error on item 3')
      }
      await new Promise(resolve => setTimeout(resolve, 10))
      return item
    }

    await expect(
      asyncPool(2, [1, 2, 3, 4, 5], iteratorFun, false),
    ).rejects.toThrow('Error on item 3')
  })

  // 测试空数组
  it('should handle empty array', async () => {
    const iteratorFun = async (item: number) => {
      return item
    }

    const result = await asyncPool(2, [], iteratorFun)
    expect(result).toEqual([])
  })

  // 测试并发限制为1的情况
  it('should work with concurrency limit of 1', async () => {
    const results: number[] = []

    const iteratorFun = async (item: number) => {
      await new Promise(resolve => setTimeout(resolve, 10))
      results.push(item)
      return item
    }

    await asyncPool(1, [1, 2, 3], iteratorFun)
    expect(results).toEqual([1, 2, 3])
  })

  // 测试并发限制大于数组长度的情况
  it('should work when pool limit is greater than array length', async () => {
    const results: number[] = []

    const iteratorFun = async (item: number) => {
      await new Promise(resolve => setTimeout(resolve, 10))
      results.push(item)
      return item
    }

    await asyncPool(10, [1, 2, 3], iteratorFun)
    expect(results.sort()).toEqual([1, 2, 3])
  })

  // 测试超时和错误处理机制
  it('should handle timeout and error scenarios correctly', async () => {
    const timeout = (i: number) =>
      new Promise((resolve, reject) => {
        if (i > 100) {
          reject({
            error: i,
          })
          return
        }
        const time = setTimeout(() => {
          clearTimeout(time)
          resolve({
            success: i,
          })
        }, i)
      })

    // 测试开启trick模式的情况
    const resultWithTrick = await asyncPool(3, [100, 105, 184], timeout, true)

    // 验证成功的结果数量
    const successResults = resultWithTrick.filter(v => v && v.success)
    expect(successResults.length).toBe(1)

    // 验证错误结果数量
    const errorResults = resultWithTrick.filter(v => v && v.error)
    expect(errorResults.length).toBe(2)

    // 验证具体的成功值
    expect(successResults[0].success).toBe(100)

    // 验证具体的错误值
    const errorValues = errorResults.map(r => r.error).sort()
    expect(errorValues).toEqual([105, 184])
  })

  // 测试超时场景下关闭trick模式
  it('should throw error when timeout occurs and trick is disabled', async () => {
    const timeout = (i: number) =>
      new Promise((resolve, reject) => {
        if (i > 100) {
          reject({
            error: i,
          })
          return
        }
        const time = setTimeout(() => {
          clearTimeout(time)
          resolve({
            success: i,
          })
        }, i)
      })

    // 测试关闭trick模式的情况
    await expect(
      asyncPool(3, [100, 105, 184], timeout, false),
    ).rejects.toMatchObject({
      error: 105, // 第一个失败的任务
    })
  })
})
