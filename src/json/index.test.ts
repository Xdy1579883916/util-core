import { expect, it } from 'vitest'
import { isJson, parseArr, parseJson } from './index'

it('parse to json', () => {
  const arr = parseJson(`{"a": "asd"}`)
  expect(arr).toBeTypeOf('object')
  expect(arr).toEqual({ a: 'asd' })
  expect(parseJson('')).toEqual({})
})
it('is json string', () => {
  expect(isJson('{"a":{},"b":{},"c":{}}')).toBe(true)
  expect(isJson('1')).toBe(true)
  expect(isJson('[1]')).toBe(true)
  expect(isJson('%[%1]%')).toBe(false)
})
it('parser to arr', () => {
  const arr = parseArr('[1,2,3,4,5,6,null,0,false]')
  const arr2 = parseArr([1, 2, 3, 4, 5, 6, null, 0, false])
  expect(arr).toBeTypeOf('object')
  expect(arr).toEqual(arr2)
  expect(parseArr('')).toEqual([])
})
