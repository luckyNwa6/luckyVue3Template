const easeInOutQuad = (t: number, b: number, c: number, d: number): number => {
  t /= d / 2
  if (t < 1) {
    return (c / 2) * t * t + b
  }
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

const requestAnimFrame = (() => {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback: FrameRequestCallback) {
      window.setTimeout(callback, 1000 / 60)
    }
  )
})()

const move = (amount: number): void => {
  document.documentElement.scrollTop = amount
  document.body.parentNode.scrollTop = amount
  document.body.scrollTop = amount
}

const position = (): number => {
  return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop
}

export const scrollTo = (to: number, duration: number = 500, callback?: () => void): void => {
  const start = position()
  const change = to - start
  const increment = 20
  let currentTime = 0
  const animateScroll = (): void => {
    currentTime += increment
    const val = easeInOutQuad(currentTime, start, change, duration)
    move(val)
    if (currentTime < duration) {
      requestAnimFrame(animateScroll)
    } else {
      if (callback && typeof callback === 'function') {
        callback()
      }
    }
  }
  animateScroll()
}
