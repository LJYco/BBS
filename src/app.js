import express from 'express'
import config from './config'
import nunjucks from 'nunjucks'
import {
  join
} from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import imust_session from './middlewares/imust_session'
import glob from 'glob'

const app = express()

// 配置静态资源
app.use('/static', express.static(join(__dirname, '../static')))
app.use('/node_modules', express.static(join(__dirname, '../node_modules')))

// 配置视图路径
// 第一个参数：当你通过 res.render 的时候，它会从你配置好的目录中去找模板文件
// express: app 将 app 配置给 nunjucks，这样的话在后续代码中就可以使用 res.render 函数了
// watch 表示监视文件的改动，如果文件发生变化，则模板引擎会帮你渲染新的内容
//       在开发环境，配置 watch 为 true，到生产环境，将 watch 变为 false
nunjucks.configure(config.viewPath, {
  autoescape: true,
  express: app,
  watch: true,
  noCache: false
})

// 配置 body-parser 中间件
// 作用：解析表单 post 请求体
//       将解析到的 post 请求体作为一个对象挂载给 req.body
//       在后续的处理过程中，就可以直接通过 req.body 来访问表单 post 请求体数据
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// 配置解析 Cookie 中间件
app.use(cookieParser())

// 配置 Session 中间件
// 只要你配置了这个中间件，则在 req 对象上就多出了一个成员：session
// Session 中存储的就是一个对象
// 可以通过 req.session['键名'] 获取 Session 中指定的数据
// 可以通过 req.session['键名'] = 值 给 Session 添加成员
// 任何请求进来都会进入 Session 中间件
// 这个中间件内部做的事情：
//    1. 检查客户端有没有钥匙，不管你是谁，只要你来我就提前给你发一把钥匙
//       如果你已经有这把钥匙了，则我就不处理了
//       如果你没有，就给你发一把
//    2. 当你想要往 Session 中存储数据的时候，就可以通过 req.session 对象添加成员的形式处理
//       req.session 会通过客户端 Cookie 中的 connect_sid 中的钥匙给它添加一个对象
//        req.session {
//          's%3AyKy1NHy0xBK4fpBNR_p04_IJ0yF0aPuq.OugeegusQe%2F8s4CYi0ATdgE6%2Fxj1TwlXndrWWb8Wxeg': {
//            isLogin: true
//          }
//        }
//
//        如果想要获取，req.session.字段名来获取这个数据
app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true
}))

// 自己写的一个 Session 中间件，仅供学习参考
// app.use(itcast_session({
//   secret: config.sessionSecret
// }))

// 挂载路由
// app.use(indexRouter)
// app.use('/account', accountRouter)
// app.use('/article', articleRouter)

// 自动挂载路由
// 读取 routes 中所有的 .js 文件
// 通过 require 加载该文件模块
// 然后通过 app.use(加载路由模块)

// app.use((req, res, next) => {

// })

// 自动挂载路由
// 注意：一定要使用 es6 模块化语法暴露接口
glob(join(__dirname, 'routes/**/*.js'), (err, files) => {
  if (err) {
    throw err
  }
  files.forEach(function(filePath) {
    const router = require(filePath).default
    typeof router === 'function' && app.use(router.prefix, router)
  })
})

// 启动监听
app.listen(config.port, config.host, () => {
  console.log(`Server is running at port ${config.port}})`)
  console.log(`Please visit http://${config.host}:${config.port}/`)
})