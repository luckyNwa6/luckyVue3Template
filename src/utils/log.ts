const isArray = function (obj: any): boolean {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

const log = () => {}

log.typeColor = function (type: string) {
  let color = ''
  switch (type) {
    case 'primary':
      color = '#2d8cf0'
      break
    case 'success':
      color = '#19be6b'
      break
    case 'info':
      color = '#909399'
      break
    case 'warn':
      color = '#ff9900'
      break
    case 'error':
      color = '#f03f14'
      break
    default:
      color = '#35495E'
      break
  }
  return color
}

log.print = function (type = 'default', text: any, back = false) {
  if (typeof text === 'object') {
    // 如果是對象則調用打印對象方式
    isArray(text) ? console.table(text) : console.dir(text)
    return
  }
  if (back) {
    // 如果是打印帶背景圖的
    console.log(`%c ${text} `, `background:${log.typeColor(type)}; padding: 2px; border-radius: 4px; color: #fff;`)
  } else {
    console.log(
      `%c ${text} `,
      `border: 1px solid ${log.typeColor(type)};
        padding: 2px; border-radius: 4px;
        color: ${log.typeColor(type)};`,
    )
  }
}

log.printBack = function (type = 'primary', text: any) {
  this.print(type, text, true)
}

log.pretty = function (type = 'primary', title: any, text: any) {
  if (typeof text === 'object') {
    console.group('Console Group', title)
    console.log(
      `%c ${title}`,
      `background:${log.typeColor(type)};border:1px solid ${log.typeColor(type)};
        padding: 1px; border-radius: 4px; color: #fff;`,
    )
    isArray(text) ? console.table(text) : console.dir(text)
    console.groupEnd()
    return
  }
  console.log(
    `%c ${title} %c ${text} %c`,
    `background:${log.typeColor(type)};border:1px solid ${log.typeColor(type)};
      padding: 1px; border-radius: 4px 0 0 4px; color: #fff;`,
    `border:1px solid ${log.typeColor(type)};
      padding: 1px; border-radius: 0 4px 4px 0; color: ${log.typeColor(type)};`,
    'background:transparent',
  )
}

log.blue = function (title: any, ...text: any) {
  text.forEach((t: any) => this.pretty('primary', title, t))
}

log.green = function (title: any, ...text: any) {
  text.forEach((t: any) => this.pretty('success', title, t))
}

log.yellow = function (title: any, ...text: any) {
  text.forEach((t: any) => this.pretty('warn', title, t))
}

log.red = function (title: any, ...text: any) {
  text.forEach((t: any) => this.pretty('error', title, t))
}

log.white = function (title: any, ...text: any) {
  text.forEach((t: any) => this.pretty('info', title, t))
}

export default log
