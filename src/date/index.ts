import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

export const DAET_FMT = 'YYYY-MM-DD HH:mm:ss'

/**
 * 日期格式化
 * @param date
 * @param fmt YYYY-MM-DD HH:mm:ss
 */
export function dateFormat(date: string | number | Date | Dayjs | null | undefined, fmt = DAET_FMT) {
  return dayjs(date).format(fmt)
}

/**
 * 时间戳格式化
 * @param timestamp
 * @param fmt
 */
export function timeFormat(timestamp?: number | string, fmt = DAET_FMT) {
  if (!timestamp)
    return ''
  if (typeof timestamp === 'string')
    timestamp = Number.parseInt(timestamp)

  // 如果为null,则格式化当前时间
  if (!timestamp)
    timestamp = Number(new Date())
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length === 10)
    timestamp *= 1000
  const date = new Date(timestamp)
  return dateFormat(date, fmt)
}

/**
 * 时间戳转为多久之前
 * @param start
 * @param end
 */
export function timeFromByDayjs(
  start: string | number | Date | dayjs.Dayjs | null | undefined,
  end?: string | number | Date | dayjs.Dayjs | null | undefined,
) {
  dayjs.extend(relativeTime)
  return dayjs(start || new Date()).from(dayjs(end || new Date()))
}

/**
 * 时间戳转为多久之前
 * @param start
 * @param end
 * @param suf
 * @param full_lv
 */
export function timeFrom(
  start: string | number | Date | dayjs.Dayjs | null | undefined,
  end?: string | number | Date | dayjs.Dayjs | null | undefined,
  suf: string = '',
  full_lv: boolean = true,
) {
  start = dayjs(start).valueOf()
  end = dayjs(end).valueOf()
  let timer = Math.abs(end - start)
  timer = timer / 1000

  function getTip() {
    switch (true) {
      case timer < 300:
        return '5分钟'
      case timer >= 300 && timer < 3600:
        return `${Number.parseInt(String(timer / 60))}分钟`
      case timer >= 3600 && timer < 86400:
        return `${Number.parseInt(String(timer / 3600))}小时`
      default: {
        const oneDay = 24 * 60 * 60
        const diffDays = Math.round(timer / oneDay)

        const years = Math.floor(diffDays / 365.25)
        const remainingDays = diffDays % 365.25

        const months = Math.floor(remainingDays / (365.25 / 12))
        const days = Math.round(remainingDays % (365.25 / 12))

        if (full_lv) {
          return [
            years && `${years}年`,
            months && `${months}个月`,
            days && `${days}天`,
          ].filter(Boolean).join('')
        }

        if (years) {
          return `${years}年`
        }
        if (months) {
          return `${months}个月`
        }
        if (days) {
          return `${days}天`
        }
      }
    }
  }

  const tips = getTip()
  return tips ? tips + suf : '--'
}
