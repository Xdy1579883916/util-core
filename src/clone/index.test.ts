import { clone as _clone, cloneDeep } from 'es-toolkit'
import { expect, it } from 'vitest'
import { clone } from './index'

it('clone', () => {
  const person = {
    isHuman: false,
    name: 'abc',
    printIntroduction() {
      console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`)
    },
  }
  const me = Object.create(person)

  expect(_clone(me).__proto__).toEqual(me.__proto__)
  expect(cloneDeep(me).__proto__).toEqual(me.__proto__)
  expect(clone(me).__proto__).not.toEqual(me.__proto__)
})
