// import _ from 'lodash-es'

// 必须包含数字、英文、下划线 6-20位
export function valid_9(str) {
  const reg =
    /^(?=.*\d)(?=.*?[a-zA-Z])(?=.*[~`!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~@#%&*])[\da-zA-Z~`!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~@#%&*]{6,20}$/
  return reg.test(str)
}

/**
 * 检查给定值是否为null或空。
 * @param {any} val - 要检查的值。
 * @return {boolean} - 如果值为null或空，则返回true，否则返回false。
 * @author ShowPenZ
 */
export function validatenull(val) {
  if (val instanceof Date || typeof val === 'boolean' || typeof val === 'number') {
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
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') {
      return true
    }
    return false
  }

  return false
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
  return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(str)
}

/**
 * 生成一个随机密码。
 *
 * @return {string} - 生成的随机密码。
 * @author ShowPenZ
 */
export function randomPassword() {
  const firstCharts = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzr'
  const code = [firstCharts.charAt(Math.floor(Math.random() * firstCharts.length))]

  code.push(getCodeChart(code, 0))
  code.push(getCodeChart(code, 1))
  code.push(getCodeChart(code, 1))
  code.push(getCodeChart(code, 2))
  code.push(getCodeChart(code, 2))

  return code.join('')
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
  const charts = ['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzr', '0123456789', '~`!@#$%^&*()_-+=<>?:"{}|,./;\'[]·~@#%&*']

  const randomNum = Math.floor(Math.random() * charts[type].length)
  let chart = charts[type].charAt(randomNum)

  if (code.includes(chart)) {
    chart = getCodeChart(code)
  }
  return chart
}
