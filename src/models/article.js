import * as db from './db'

export default class Article {
  constructor(article) {
    this.title = article.title
    this.username = article.username
    this.content = article.content
    this.create_time = article.create_time || Date.now()
    this.update_time = article.update_time || Date.now()
    this.user_id = db.ObjectID(article.user_id)
    this.fabulous = 0
  }

  save(callback) {
    db.insertOne('articles', this, callback)
  }
  static editById(article, callback) {
    db.updateOne({
      _id: db.ObjectID(article._id),
    }, {
      $set: {
        title: article.title,
        content: article.content,
        update_time: Date.now(),
      },
    }, callback)
  }

  static findById(id, callback) {
    db.findOne('articles', {
      _id: db.ObjectID(id)
    }, callback)
  }

  static findAll(pageNumber, pageSize, callback) {
    db.find(pageNumber, pageSize, 'articles', {}, callback)
  }
  static count(callback) {
    db.count('articles', callback);
  }
}