import { describe, expect, it } from 'vitest'

import { withResolvers } from './index'

describe('withResolvers', () => {
  it('should return an object with promise, resolve, and reject properties', () => {
    const { promise, resolve, reject } = withResolvers()
    expect(promise).toBeInstanceOf(Promise)
    expect(typeof resolve).toBe('function')
    expect(typeof reject).toBe('function')
  })

  it('resolve should fulfill the promise with the provided value', async () => {
    const { promise, resolve } = withResolvers()
    const value = 'test value'
    resolve(value)
    const result = await promise
    expect(result).toBe(value)
  })

  it('reject should reject the promise with the provided reason', async () => {
    const { promise, reject } = withResolvers()
    const reason = new Error('test error')
    reject(reason)
    await expect(promise).rejects.toThrow(reason)
  })
})
