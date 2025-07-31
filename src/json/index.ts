/**
 * 安全的解析json, 总是返回对象
 * @param data
 */
export function parseJson(data: any): any {
  if (typeof data === 'object')
    return data || {}
  try {
    return JSON.parse(data) || {}
  }
  catch (e) {
    return {}
  }
}

/**
 * 字符串 是否可以被 转为JSON
 * @param str
 * @returns {*}
 */
export function isJson(str: string): boolean {
  return !!toJson(str)
}

/**
 * 字符串 转为JSON, 如果转换失败, 返回null
 * @param str
 */
export function toJson(str: string): object | null {
  try {
    return JSON.parse(str)
  }
  catch (e) {
    return null
  }
}

/**
 * 字符串 转为数组
 * @param data
 * @param spec
 */
export function parseArr(data: string | Array<any> | any, spec = false): Array<any> {
  if (Array.isArray(data))
    return data as []

  if (!data) {
    return []
  }

  const arr = toJson(data)
  if (arr) {
    return arr as []
  }

  try {
    if (spec) {
      return data
        .replace(/^\[|\]$/g, '')
        .split(/,/)
        .map((v: string) => v.trim()) as []
    }
    return []
  }
  catch (e) {
    return []
  }
}
