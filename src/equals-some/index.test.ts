import { expect, it } from 'vitest'
import { equalsSome } from './index'

it('equalsSome', () => {
  expect(equalsSome(1, '1', 1)).toEqual(true)
  expect(equalsSome(1, '1', 1, 2, 3, 4, 5, 6, '7')).toEqual(true)
})
