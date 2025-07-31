import { curry, filter, first, get, isBoolean, isNil, isNumber } from 'es-toolkit/compat'

type TParseFun = (...arg: any) => unknown

/**
 * 根据路径获取数据,另外支持格式化函数
 * @param data
 * @param path
 * @param defaultValue
 * @param parseFun
 */
export function getRow(
  data: any,
  path: string | string[],
  defaultValue: any = '--',
  parseFun?: TParseFun,
) {
  const value: any = get(data, path)
  if (!isNil(value) && parseFun)
    return fmt(parseFun(value), defaultValue)

  return fmt(value, defaultValue)
}

function fmt(v: any, defaultValue: any) {
  if (isNumber(v) || isBoolean(v))
    return v
  return v || defaultValue
}

type TGetRow = (
  path: string | string[],
  defaultValue?: any,
  parseFun?: TParseFun
) => any

/**
 * 生成柯里化的getRow函数
 * @param data
 */
export function curryGetRow(data: any): TGetRow {
  return curry(getRow)(data)
}

/**
 * 根据多个路径获取数据
 * @param data
 * @param pathArr
 * @param def
 */
export function getDataByPath(data: any, pathArr: string[] = [], def: any = null) {
  try {
    for (const path of pathArr) {
      const v = getRow(data, path, null)
      if (isNumber(v) || isBoolean(v) || v)
        return v
    }
    return def
  }
  catch (e: any) {
    return def
  }
}

type TGetDataByPath = (pathArr: string[], def?: any) => any

/**
 * 生成柯里化的getDataByPath函数
 * @param data
 */
export function curryGetDataByPath(data: any): TGetDataByPath {
  return function (pathArr: string[] = [], def: any = null) {
    return getDataByPath(data, pathArr, def)
  }
}

/**
 * 若水三千只取一瓢
 * 从多个数据源中取一个不为空的
 * @param arr
 * @param def
 */
export function getOne(arr: any, def?: any) {
  if (!Array.isArray(arr))
    return def
  if (!arr.length)
    return def
  const val = first(filter(arr, Boolean))
  return isNil(val) ? def : val
}
