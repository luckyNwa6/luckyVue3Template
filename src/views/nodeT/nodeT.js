const http = require('http')
const server = http.createServer()

server.on('request', (req) => {
  // req是请求对象，它包含了与客户端相关的数据和属性，例如:3 ll req.url是客户端请求的URL地址
  // req.method是客户端的 method请求类型
  const str = `Your request url is ${req.url}，and request method is ${req.method}`
  console.log(str)
})

server.listen(8080, () => {
  console.log('http server running at http://127.0.0.1:8080')
})
