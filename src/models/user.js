import * as db from './db'

export default class User {
  constructor(user) {
    this.username = user.username
    this.password = user.password
    this.email = user.email
    this.gender = user.gender || ''
    this.introduce = user.introduce || ''
    this.create_time = user.create_time || Date.now()
    this.last_login_time = user.last_login_time || Date.now()
    this.isActivated = user.isActivated || true
    this.isAvailable = user.isAvailable || true
    this.qq = user.qq || ''
    this.phone = user.phone || ''
    this.avatar = user.avatar || 'avatar-max-img.png'
  }

  static findOne(conditionDoc, callback) {
    db.findOne('users', conditionDoc, callback)
  }

  save(callback) {
    db.insertOne('users', this, callback)
  }
}
