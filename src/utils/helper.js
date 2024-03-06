import _ from 'lodash'
import copy from 'copy-to-clipboard'
import Moment from 'moment'

/**
 * 将像素(px)转换为rem单位。
 * @param {number} px - 要转换的像素值。
 * @return {number} - 转换后的rem值。
 */
export function px2Rem(px) {
  return px / 100
}

/**
 * 将时间戳转换为指定格式的时间字符串。
 * @param {number} timestamp - 要转换的时间戳。
 * @return {string} - 格式化后的时间字符串。
 */
export function timestampToTime(timestamp) {
  return Moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 将像素(px)转换为带有'rem'单位的字符串。
 * @param {number} px - 要转换的像素值。
 * @return {string} - 带有'rem'单位的字符串。
 */
export function px2RemStr(px) {
  return `${px2Rem(px)}rem`
}

/**
 * 检查值是否为非空字符串。
 * @param {any} value - 要检查的值。
 * @return {boolean} - 如果值是非空字符串，则返回true，否则返回false。
 */
export function hasString(value) {
  return _.isString(value) && !_.isEmpty(value)
}

/**
 * 检查值是否为纯对象且非空。
 * @param {any} value - 要检查的值。
 * @return {boolean} - 如果值是纯对象且非空，则返回true，否则返回false。
 */
export function hasPlainObject(value) {
  return _.isPlainObject(value) && !_.isEmpty(value)
}

/**
 * 检查字符串是否为JSON格式。
 * @param {string} str - 要检查的字符串。
 * @return {boolean} - 如果字符串是JSON格式，则返回true，否则返回false。
 */
export function isJSON(str) {
  if (typeof str !== 'string') {
    return
  }
  try {
    const obj = JSON.parse(str)
    if (typeof obj === 'object' && obj) {
      return true
    } else {
      return false
    }
  } catch (e) {
    console.log(`错误: ${str}!!! ${e}`)
    return false
  }
}

/**
 * 检查值是否存在（非null和非undefined）。
 * @param {any} value - 要检查的值。
 * @return {boolean} - 如果值存在，则返回true，否则返回false。
 */
export function hasValue(value) {
  return !_.isNil(value)
}

/**
 * 检查值是否为数组且非空。
 * @param {any} value - 要检查的值。
 * @return {boolean} - 如果值是数组且非空，则返回true，否则返回false。
 */
export function hasArray(value) {
  return _.isArray(value) && !_.isEmpty(value)
}

/**
 * 将一个对象扁平化为单层对象。
 * @param {object} obj - 要扁平化的对象。
 * @param {number} depth - 扁平化的深度限制。
 * @param {string} prefix - 添加到扁平化对象键的前缀。
 * @return {object} - 扁平化后的对象。
 * @author ShowPenZ
 */
export function flattenObject(obj, depth, prefix = '') {
  const limit = _.isInteger(depth)
  return _.reduce(
    _.keys(obj),
    (acc, k) => {
      const pre = prefix.length ? prefix + '.' : ''
      if ((limit ? depth > 1 : true) && hasPlainObject(obj[k])) {
        _.assign(acc, flattenObject(obj[k], limit ? depth - 1 : depth, pre + k))
      } else {
        acc[pre + k] = obj[k]
      }
      return acc
    },
    {},
  )
}

/**
 * 生成一个包装给定函数并延迟执行的Promise的函数。
 * @param {function} fn - 要执行的函数。
 * @param {number} timeout - 延迟执行的毫秒数，默认为0。
 * @return {function} - 返回一个函数，该函数返回一个Promise，该Promise在包装函数调用后解析为结果。
 * @author ShowPenZ
 */
export function asyncCall(fn, timeout = 0) {
  return (...args) =>
    new Promise((resolve, reject) =>
      window.setTimeout(() => {
        try {
          resolve(fn(...args))
        } catch (error) {
          reject(error)
        }
      }, timeout),
    )
}

/**
 * 检查给定值是否为null或空。
 * @param {any} val - 要检查的值。
 * @return {boolean} - 如果值为null或空，则返回true，否则返回false。
 * @author ShowPenZ
 */
export function validatenull(val) {
  if (
    val instanceof Date ||
    typeof val === 'boolean' ||
    typeof val === 'number'
  ) {
    return false
  }

  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    for (let o in val) {
      return false
    }
    return true
  } else {
    if (
      val === 'null' ||
      val == null ||
      val === 'undefined' ||
      val === undefined ||
      val === ''
    ) {
      return true
    }
    return false
  }

  return false
}

/**
 * 根据给定的权重混合两种颜色。
 *
 * @param {Object} color1 - 要混合的第一种颜色对象。
 * @param {Object} color2 - 要混合的第二种颜色对象。
 * @param {number} weight - color2在混合中的权重。应为百分比值。
 * @return {Object} - 混合color1和color2后的结果颜色对象。
 * @author ShowPenZ
 */
export function mixColors(color1, color2, weight) {
  if (weight === 0) {
    return color1
  }
  // 检查权重参数以确保它是百分比值
  const weightScale = weight / 100

  // 将权重标准化为[-1, 1]
  const normalizedWeight = weightScale * 2 - 1

  // 计算两种颜色之间的alpha差异
  const alphaDistance = color1.alpha - color2.alpha

  // 计算color1的合并权重
  const combinedWeight1 =
    normalizedWeight * alphaDistance === -1
      ? normalizedWeight
      : (normalizedWeight + alphaDistance) /
        (1 + normalizedWeight * alphaDistance)
  const weight1 = (combinedWeight1 + 1) / 2
  const weight2 = 1 - weight1

  // 计算新的RGB值
  const red = Math.round(color1.red * weight1 + color2.red * weight2)
  const green = Math.round(color1.green * weight1 + color2.green * weight2)
  const blue = Math.round(color1.blue * weight1 + color2.blue * weight2)

  // 计算新的alpha值
  const alpha = color1.alpha * weightScale + color2.alpha * (1 - weightScale)

  // 以SassColor对象的形式返回新的颜色
  return { red, green, blue, alpha }
}

/**
 * 根据环境判断是否修改文本。
 *
 * @param {string} value - 要检查和修改的文本。
 * @return {string} - 如果环境为生产环境且文本包含'Four Faith Cloud Platform'、'Four Faith Cloud'或'Four Faith'，则替换为'IOT Platform'，否则返回原始文本。
 * @author ShowPenZ
 */
export function changeFourFaithText(value) {
  return import.meta.env.VITE_APP_NODE_ENV === 'production'
    ? value.replace(
        /Four( Faith Cloud Platform| Faith Cloud| Faith)?/g,
        'IOT Platform',
      )
    : value
}

/**
 * 检查给定字符串是否是有效的电话号码。
 * 正则表达式：/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
 *
 * @param {string} str - 要检查的字符串。
 * @return {boolean} - 如果字符串是有效的电话号码，则返回true，否则返回false。
 * @author ShowPenZ
 */
export function validPhone(str) {
  return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
    str,
  )
}

/**
 * 复制给定文本到剪贴板。
 *
 * @param {string} text - 要复制的文本。
 * @return {undefined} - 无返回值。
 * @author ShowPenZ
 */
export function copyClipboard(text) {
  return copy(text)
}

/**
 * 根据给定类型，从指定字符集中生成一个随机字符。
 *
 * @param {string} code - 要检查的代码字符串。
 * @param {number} [type=0] - 生成字符的字符集类型，默认为0。
 * @return {string} - 从字符集中生成的随机字符。
 * @author ShowPenZ
 */
export function getCodeChart(code, type = 0) {
  const charts = [
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzr',
    '0123456789',
    '~`!@#$%^&*()_-+=<>?:"{}|,./;\'[]·~@#%&*',
  ]

  const randomNum = Math.floor(Math.random() * charts[type].length)
  let chart = charts[type].charAt(randomNum)

  if (code.includes(chart)) {
    chart = getCodeChart(code)
  }
  return chart
}

/**
 * 生成一个随机密码。
 *
 * @return {string} - 生成的随机密码。
 * @author ShowPenZ
 */
export function randomPassword() {
  const firstCharts = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzr'
  const code = [
    firstCharts.charAt(Math.floor(Math.random() * firstCharts.length)),
  ]

  code.push(getCodeChart(code, 0))
  code.push(getCodeChart(code, 1))
  code.push(getCodeChart(code, 1))
  code.push(getCodeChart(code, 2))
  code.push(getCodeChart(code, 2))

  return code.join('')
}

/**
 * 从指定URL下载文件并使用指定文件名保存。
 *
 * @param {string|Blob} url - 要下载的文件的URL或Blob对象。
 * @param {string} [saveName] - 要保存的文件名。如果未提供，则文件名将为空。
 * @author ShowPenZ
 */
export function downFile(url, saveName) {
  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url)
  }
  const aLink = document.createElement('a')
  aLink.href = url
  aLink.download = saveName || ''

  const event = new MouseEvent('click')
  aLink.dispatchEvent(event)
}

/**
 * 导出文件。
 *
 * @param {Object} options - 导出文件的选项。
 * @param {string} options.fileName - 要导出的文件名。
 * @param {Blob} options.blob - 文件数据作为 Blob 对象。
 * @author ShowPenZ
 */
export function exportFile({ fileName, blob } = { fileName: '', blob: '' }) {
  if (!fileName) {
    // 提示消息：'文件名称有误'
    return
  }
  if (!blob) {
    // 提示消息：'未获取到文件'
    return
  }
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL对象
    document.body.removeChild(elink)
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}

/**
 * 从给定的URL下载文件并使用指定的文件名保存。
 *
 * @param {string} url - 要下载文件的URL。
 * @param {string} fileName - 用于下载文件的名称。
 * @return {string} - 如果文件成功下载，则返回'success'。
 * @author ShowPenZ
 */
export async function downLoadByUrl(url, fileName) {
  const response = await fetch(url)
  if (response.ok) {
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = fileName
    a.click()
    URL.revokeObjectURL(blobUrl)
    return 'success'
  }
}

/**
 * 生成一个用于验证合理经度和纬度值的正则表达式。
 *
 * @return {Object} - 包含用于验证经度和纬度的正则表达式的对象。
 * @author ShowPenZ
 */
export function reasonableLngandLatReg() {
  const lngReg =
    /^(-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/
  const latReg = /^(-?(?:90(?:\.0{0,6})?|[0-8]?\d(?:\.\d{0,6})?))$/

  return { lngReg, latReg }
}

/**
 * 将给定的日期对象或字符串格式化为指定的格式。
 *
 * @param {Date|string|number} date - 要格式化的日期对象或字符串。
 * @param {string} fmt - 指定日期格式的格式字符串。
 *    格式字符串可以包括以下占位符：
 *    - 'M+': 月份 (1-12)
 *    - 'd+': 日期 (1-31)
 *    - 'H+': 小时 (0-23)
 *    - 'm+': 分钟 (0-59)
 *    - 's+': 秒 (0-59)
 *    - 'S+': 毫秒 (0-999)
 *    - 'y+': 年份 (4位数字)
 * @return {string} - 格式化后的日期字符串。
 * @author ShowPenZ
 */
export function fmtTime(date, fmt) {
  if (!date) return ''

  const time =
    typeof date === 'string' || typeof date === 'number' ? new Date(date) : date

  const o = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'H+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'S+': time.getMilliseconds(),
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      String(time.getFullYear()).substr(4 - RegExp.$1.length),
    )
  }

  for (const key in o) {
    if (new RegExp(`(${key})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[key] : o[key].toString().padStart(2, '0'),
      )
    }
  }

  return fmt
}

/**
 * 检查给定对象除了'pageNum'和'pageSize'之外是否有值。
 *
 * @param {object} obj - 要检查的对象。
 * @return {boolean} - 如果对象除了'pageNum'和'pageSize'之外还有其他值，则返回true，否则返回false。
 * @author ShowPenZ
 */
export function hasValuesExceptPage(obj) {
  for (const key in obj) {
    if (
      key !== 'pageNum' &&
      key !== 'pageSize' &&
      obj[key] !== null &&
      obj[key] !== undefined &&
      obj[key] !== ''
    ) {
      return true
    }
  }
  return false
}

export function get7Date(dates) {
  const currentData = new Date()
  const n = dates || 0
  currentData.setDate(currentData.getDate() + n)

  const y = currentData.getFullYear()
  let m = currentData.getMonth() + 1
  let d = currentData.getDate()

  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  const day = y + '-' + m + '-' + d

  return day
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function (...args) {
    // context = this
    // timestamp = +new Date()
    // const callNow = immediate && !timeout
    // // 如果延时不存在，重新设定延时
    // if (!timeout) timeout = setTimeout(later, wait)
    // if (callNow) {
    //   result = func.apply(context, args)
    //   context = args = null
    // }
    // return result
  }
}

/**
 *  判断文件是否为图片
 *
 * @param {string} filePath - The path of the file.
 * @return {boolean} True if the file is an image, false otherwise.
 */
export function isImage(filePath) {
  // 获取最后一个.的位置
  const index = filePath.lastIndexOf('.')
  // 获取后缀
  const ext = filePath.substr(index + 1)
  // 输出结果
  return (
    ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].indexOf(
      ext.toLowerCase(),
    ) !== -1
  )
}

// 必须包含数字、英文、下划线 6-20位
export function valid_9(str) {
  const reg =
    /^(?=.*\d)(?=.*?[a-zA-Z])(?=.*[~`!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~@#%&*])[\da-zA-Z~`!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~@#%&*]{6,20}$/
  return reg.test(str)
}
