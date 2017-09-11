import User from '../models/user'

export function showRegister(req, res, next) {
  res.render('register.html', {
    username: req.cookies.username
  })
}

export function showLogin(req, res, next) {
  res.render('login.html', {
    username: req.cookies.username
  })
}

export function doRegister(req, res, next) {
  // 以下所有代码，一定要遵循错误优先的规则
  // 1. 接收客户端 post 请求体数据
  // 2. 对表单提交数据做基本校验
  // 3. 拿着经过 sanitize 过的数据，操作数据库
  //    3.1 校验用户民是否存在
  //        如果已存在，告诉用户
  //        如果不存在，将数据插入到数据库
  const body = req.body
  User.findOne({
    username: body.username
  }, function(err, doc) {
    if (err) {
      throw err
    }
    if (doc) {
      return res.json({
        status: 'Error',
        error_code: 1001,
        error_message: '用户名已存在，请更新重试'
      })
    }
    if (req.body.code.toUpperCase() != req.body.userCode.toUpperCase()) {
      return res.json({
        status: 'Error',
        error_code: 1002,
        error_message: '验证码不正确，请重新输入'
      })
    }
    res.cookie('username', req.body.username)
    var user = new User({
      username: body.username,
      password: body.password,
      email: body.email
    })
    user.save((err, result) => {
      if (err) {
        throw err
      }
      // 代码执行到这里，表示用户注册成功，同时咱们也让用户变为登陆状态
      req.session.user = result.ops[0]
      console.log(result)
      res.json({
        status: 'OK',
        result: ''
      })
    })
  })
}

export function doLogin(req, res, next) {
  const body = req.body
  console.log(req.body.username);
  User.findOne({
    username: body.username
  }, (err, user) => {
    if (err) {
      throw err
    }
    // 这里表示用户不存在
    if (!user) {
      return res.json({
        status: 'Error',
        error_code: 2001,
        error_message: '登陆失败，用户名或密码不存在'
      })
    }
    if (user.password !== body.password) {
      return res.json({
        status: 'Error',
        error_code: 2001,
        error_message: '登陆失败，用户名或密码不存在'
      })
    }
    res.cookie('username', req.body.username)
    req.session.user = user
    res.json({
      status: 'OK',
      result: ''
    })
  })
}
export function doLogout(req, res, next) {
  // 用户退出，直接把 Session 中的 isLogin 干掉即可
  req.session.user = null
    // 为了友好体验，所以给用户渲染了一个退出页面，让用户知道自己退出了
  res.render('logout.html')
}
export function user(req, res, next) {
  // 为了友好体验，所以给用户渲染了一个退出页面，让用户知道自己退出了
  res.render('user.html')
}