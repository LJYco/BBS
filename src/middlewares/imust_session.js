const sessionData = {}

// 闭包
// 自己封装中间件
// Session 原理
// 对象成员的 get 和 set 方法

export default function(options) {
  return function(req, res, next) {
    let sid = req.cookies['imust_sid']
      // 如果没有钥匙，我就给你发一把钥匙，这把钥匙一定不能重复
    if (!sid) {
      sid = Math.random().toString().substr(2) + options.secret + Math.random().toString().substr(2) + Date.now()
      res.cookie('imust_sid', sid, {
        maxAge: 1000 * 60 * 10
      })
    }
    Object.defineProperty(req, "session", {
      get: function() {
        let sid = req.cookies['imust_sid']
        if (!sessionData[sid]) {
          sessionData[sid] = {}
        }
        return sessionData[sid]
      }
    })
    next()
  }
}