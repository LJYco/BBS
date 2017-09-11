import Article from '../models/article'
import marked from 'marked'
export function showPublish(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/account/login')
  }
  res.render('publish.html', {
    user: req.session.user
  })
}

export function doPublish(req, res, next) {
  // 接收数据
  // 保存到数据库
  // 发送响应
  const body = req.body
  console.log(body);
  const cookie = req.headers.cookie.split(';')
  const cookie_username = cookie[1].split('=')[1]
  const article = new Article({
    title: body.title,
    content: body.content,
    // user_id 就是当前登陆用户的id，当用户登陆或者注册的时候，已经将用户信息保存到 Session 中了，所以这里可以直接获取
    user_id: req.session.user._id,
    username: cookie_username
  })
  article.save((err, result) => {
    if (err) {
      throw err
    }
    res.json({
      status: 'OK',
      result: {
        redirect_url: `/article/show/${result.insertedId}`
      }
    })
  })
}

export function show(req, res, next) {
  const id = req.params.id
  Article.findById(id, (err, article) => {
    if (err) {
      throw err
    }
    article.content = marked(article.content);
    res.render('article_detail.html', {
      article: article,
      user: req.session.user,
      // 1. 必须是登陆状态
      // 2. 当前文章必须属于当前登陆用户
      // 符合上面两个条件，才可以有 “编辑” 按钮
      isCurrentUser: req.session.user && article.user_id.toString() === req.session.user._id.toString()
    })
  })
}

export function showEdit(req, res, next) {

}

export function doEdit(req, res, next) {

}