const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2
  if (t < 1) {
    return (c / 2) * t * t + b
  }
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

// requestAnimationFrame 用于智能动画 http://goo.gl/sx5sts
const requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()

/**
 * 由于检测滚动元素如此困难，只需移动它们全部
 * @param {number} amount - 滚动的距离。
 */
const move = (amount) => {
  document.documentElement.scrollTop = amount
  document.body.parentNode.scrollTop = amount
  document.body.scrollTop = amount
}

/**
 * 获取当前滚动位置
 * @returns {number} - 当前滚动位置.
 */
const position = () => {
  return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop
}

/**
 * 平滑滚动到指定位置
 * @param {number} to - 滚动到的目标位置.
 * @param {number} duration - 动画持续时间（毫秒）.
 * @param {Function} callback - 动画完成后的回调函数.
 */
export const scrollTo = (to, duration, callback) => {
  console.log('🚀 ~ position ~ document.body.scrollTop:', document.body.scrollTop)
  console.log('🚀 ~ position ~ document.body.parentNode.scrollTop :', window.scrollY)
  console.log('🚀 ~ position ~ document.documentElement.scrollTop :', window.pageYOffset)
  console.log('xxxxxxxxxxxxxxxxx')
  const start = position()
  console.log('🚀 ~ scrollTo ~ start:', start)
  const change = to - start
  console.log('🚀 ~ scrollTo ~ change:', change)
  const increment = 20
  let currentTime = 0
  duration = typeof duration === 'undefined' ? 500 : duration
  const animateScroll = function () {
    // 增加时间
    currentTime += increment
    // 使用二次进出缓动函数找到值
    const val = easeInOutQuad(currentTime, start, change, duration)
    // 移动文档主体
    move(val)
    // 除非动画结束，否则继续动画
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      if (callback && typeof callback === 'function') {
        console.log('xcccdxsfc')
        // 动画完成后执行回调函数
        callback()
      }
    }
  }
  console.log('66666666')
  animateScroll()
}
