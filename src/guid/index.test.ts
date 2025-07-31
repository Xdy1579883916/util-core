import { expect, it } from 'vitest'
import { guid } from './index'

it('guid', () => {
  expect(guid().length).toBe(32)
  expect(guid(12).length).toBe(12)
  expect(guid(12)[0]).equal('u')
  expect(guid()[0]).equal('u')
})
