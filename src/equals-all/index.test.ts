import { expect, it } from 'vitest'
import { equalsAll } from './index'

it('equalsAll', () => {
  expect(equalsAll(1, '1', 1)).toEqual(true)
  expect(equalsAll(1, '1', 1, 2, 3, 4, 5, 6, '7')).toEqual(false)
})
