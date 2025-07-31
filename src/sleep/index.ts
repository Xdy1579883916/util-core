/**
 * 模拟睡眠
 * @param time 睡眠时间（毫秒）
 * @returns {Promise<void>}
 */
export function sleep(time: number): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, time))
}
