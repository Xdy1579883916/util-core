/**
 * 所有的值都第一位值相等(弱相等，会有隐试类型转换)
 * @param first 基准值
 * @param computed 待比较的值（此参数支持传入多个）
 * @example index(1, '1',1,2,3,4,5,6,'7') --> false
 * @example index(1, '1',1) --> true
 * @returns {boolean}
 */
export function equalsAll(first: any, ...computed: any[]): boolean {
  const argArray = Array.from(computed)
  if (argArray.length < 1) {
    return !!first
  }
  else {
    return !!argArray.every(v => first == v)
  }
}
