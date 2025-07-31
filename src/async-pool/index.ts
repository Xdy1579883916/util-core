/**
 * 并发池
 * @param poolLimit 预期的最大并发数量
 * @param array 迭代数组
 * @param iteratorFun 每次迭代需要执行的函数
 * @param trick 是否捕获异常;  开启捕获异常时，请求过程中出现异常不会停止,最终返回全部数据。
 *                           若未开启，一旦出现异常就会结束执行，并返回错误结果
 * @returns {Promise<any[]>}
 */
export async function asyncPool(poolLimit: number, array: any[], iteratorFun: IteratorFun, trick = true): Promise<any[]> {
  return await asyncPoolProcess(poolLimit, array, iteratorFun, { trick })
}

interface TAsyncPoolProcessOpt {
  // 是否捕获异常; 开启捕获异常时，请求过程中出现异常不会停止,最终返回全部数据。 若未开启，一旦出现异常就会结束执行，并返回错误结果
  trick?: boolean
  // 进度 total: 总任务 executing:正在执行
  processCall?: (total: number, executing: number) => unknown
  // 用于执行任意函数
  nextLoop?: IteratorFun
}

type IteratorFun = (item: any, len: number, arr: any) => PromiseLike<any>

export async function asyncPoolProcess(
  poolLimit: number,
  array: any[],
  iteratorFun: IteratorFun,
  opt: TAsyncPoolProcessOpt = {},
) {
  const { trick, processCall, nextLoop } = opt
  // 存储所有的任务
  const ret = []
  // 存储正在执行的异步任务
  const executing: Promise<any>[] = []

  for (const item of array) {
    // 调用iteratorFun创建函数异步任务
    const p = Promise.resolve().then(() => iteratorFun(item, ret.length, array))
    // 保存新的异步任务
    ret.push(p)
    // 执行进度
    processCall && processCall(array.length, ret.length)
    // 总任务数量 达到我们的 poolLimit限制时， 进行并发控制
    if (array.length >= poolLimit) {
      // 当任务完成之后，从正在执行的任务数组中移除已经完成的任务
      const e: any = p.then(() => executing.splice(executing.indexOf(e), 1))
      // 保存正在 执行的异步任务
      executing.push(e)

      if (executing.length >= poolLimit) {
        if (trick) {
          // 加 trick
          await Promise.race(executing.map(value => value.catch(err => err)))
        }
        else {
          await Promise.race(executing)
        }
      }
    }
    if (nextLoop) {
      await nextLoop(item, ret.length, array)
    }
  }

  if (trick) {
    // trick, 对错误进行处理
    return Promise.all(ret.map(value => value.catch(err => err)))
  }
  else {
    return Promise.all(ret)
  }
}
