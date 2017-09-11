import * as db from './db'

export default class Comment {
  constructor(Comment) {
    this.message = Comment.message
    this.create_time = Comment.create_time || Date.now()
    this.update_time = Comment.update_time || Date.now()
    this.author_id = db.ObjectID(Comment.author_id)
    this.article_id = db.ObjectID(Comment.article_id)
  }

  save(callback) {
    db.insertOne('comments', this, callback)
  }
  static findAll(conditionDoc, callback) {
    db.find('comments', conditionDoc, callback)
  }
  static findAllByArticleId(articleId, callback) {
    db.find1('comments', {
      article_id: db.ObjectID(articleId)
    }, callback)

  }
}