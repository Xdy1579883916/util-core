import { expect, it } from 'vitest'
import { dateFormat, timeFormat, timeFrom, timeFromByDayjs } from './index'

it('dateFormat', () => {
  expect(dateFormat(new Date('2022-08-05 8:00:00'), 'YYYY:MM:DD HH-mm-ss')).toEqual('2022:08:05 08-00-00')
  expect(dateFormat('2022-08-05 16:00:00')).toEqual('2022-08-05 16:00:00')
  // 12小时制
  expect(dateFormat('2022-08-05 16:00:00', 'YYYY-MM-DD hh:mm:ss')).toEqual('2022-08-05 04:00:00')
})

it('timeFormat', () => {
  expect(timeFormat(new Date('2022-08-05 8:00:00').getTime())).toEqual(dateFormat(new Date('2022-08-05 08:00:00')))
  expect(timeFormat(new Date('2022-08-05 8:00:00').getTime(), 'YYYY-MM-DD-HH-mm-ss')).toEqual(
    dateFormat(new Date('2022-08-05 8:00:00'), 'YYYY-MM-DD-HH-mm-ss'),
  )
})

it('timeFrom', () => {
  expect(timeFrom('2023-02-25', 1713498960979)).equal('1年1个月23天')
  expect(timeFrom('2023-02-25', 1713498960979, '前')).equal('1年1个月23天前')
  expect(timeFrom('2023-02-25', 1713498960979, '前', false)).equal('1年前')
  expect(timeFrom(1713498960979, 1713498960979, '前')).equal('5分钟前')
  expect(timeFrom(1714064415000, 1713498960979, '前')).equal('7天前')
  expect(timeFrom(1714064415000, 1713498960979, '')).equal('7天')
  expect(timeFrom(1714102803289, 1714064415000, '')).equal('10小时')
})

it('timeFromByDayjs', () => {
  expect(timeFromByDayjs('2023-02-25', 1713498960979)).equal('a year ago')
  expect(timeFromByDayjs('2023-02-25', 1713498960979)).equal('a year ago')
  expect(timeFromByDayjs(1713498960979, 1713498960979)).equal('a few seconds ago')
  expect(timeFromByDayjs(1714064415000, 1713498960979)).equal('in 7 days')
  expect(timeFromByDayjs(1714102803289, 1714064415000)).equal('in 11 hours')
})
