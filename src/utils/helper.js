import _ from 'lodash'

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
    for (var o in val) {
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
