import { expect, it } from 'vitest'
import { curryGetDataByPath, curryGetRow, getDataByPath, getOne, getRow } from './index'

const a = {
  a: 'a',
  b: 'b',
  c: 1,
}
const person = {
  a: {
    b: 1,
    d: [
      {
        e: 3,
        b: 1,
      },
    ],
  },
}
it('getRow', () => {
  expect(getRow(person, 'a.b')).toEqual(1)

  expect(getRow(person, 'a.d.0.e')).toEqual(3)
  expect(getRow(person, 'a.d.0.e', undefined)).toEqual(3)
  expect(getRow(person, 'a.d.0.e', null)).toEqual(3)
  expect(getRow(person, 'a.d.0.e', 2)).toEqual(3)
  expect(getRow(person, 'a.d.0.e', 2, String)).toEqual('3')
  expect(getRow(person, 'a.d.0.e', 2, Boolean)).toEqual(true)
  expect(getRow(person, ['a', 'd', '0', 'e'], 2, Boolean)).toEqual(true)

  expect(getRow(person, 'a.d.0.f')).toEqual('--')
  expect(getRow(person, 'a.d.0.f', undefined)).toEqual('--')
  expect(getRow(person, 'a.d.0.f', null)).toEqual(null)
  expect(getRow(person, 'a.d.0.f', 2)).toEqual(2)
})
it('curryGetRow', () => {
  const $d = curryGetRow(a)
  expect($d('a')).equal('a')
  expect($d('b')).equal('b')
  expect($d('bb', 1)).equal(1)
  expect($d('c', 1, v => String(v))).equal('1')
})
it('getDataByPath', () => {
  expect(getDataByPath(person, [
    'a.b',
  ])).toEqual(1)
  expect(getDataByPath(person, [
    'a.d.0.b',
  ])).toEqual(1)
  expect(getDataByPath(person, [
    'a.a.a.a.a.a.a',
    'a.b',
    'a.0.b',
  ])).toEqual(1)
})
it('curryGetDataByPath', () => {
  const $dps = curryGetDataByPath(a)
  expect($dps([
    'c1',
    'd1',
    'e1',
  ])).equal(null)
  expect($dps([
    'c1',
    'd1',
    'e1',
  ], 'haha')).equal('haha')
  expect($dps([
    'c1',
    'd1',
    'e1',
  ], 'haha')).equal('haha')
  expect($dps([
    'c',
    'd',
    'e',
  ], null)).equal(1)
})
it('getOne', () => {
  expect(getOne([
    getRow(person, 'a.a.a.a.a.a.a', null),
    getRow(person, 'a.b', null),
    getRow(person, 'a.0.b', null),
  ])).toEqual(1)
})
