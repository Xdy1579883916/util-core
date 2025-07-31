export interface Deferred<T> {
  resolve: (value: T | PromiseLike<T>) => void
  reject: (reason?: unknown) => void
  promise: Promise<T>
}

// https://sorrycc.com/promise-with-resolvers/
// https://pawelgrzybek.com/deferred-javascript-promises-using-promise-withresolvers/

// 使用 Promise.withResolvers 延迟 Promise, Promise.withResolvers 在较新的浏览器中已经内置
function withResolvers<T = any>(): Deferred<T> {
  let resolve!: (value: T | PromiseLike<T>) => void
  let reject!: (reason: unknown) => void
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
  return { resolve, reject, promise }
}

export {
  withResolvers,
}
