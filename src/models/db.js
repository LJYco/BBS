import mongodb from 'mongodb'
import config from '../config'

export const ObjectID = mongodb.ObjectID

const MongoClient = mongodb.MongoClient

function _connect(callback) {
  MongoClient.connect(config.connStr, (err, db) => {
    if (err) {
      return callback(err)
    }
    callback(null, db)
  })
}

export function find(pageNumber, pageSize, collectionName, conditionDoc, callback) {
  _connect((err, db) => {
    if (err) {
      return callback(err)
    }
    db.collection(collectionName)
      .find(conditionDoc).skip(((pageNumber - 1) * pageSize)).limit(pageSize)
      .sort({
        create_time: -1
      })
      .toArray((err, docs) => {
        // 操作完数据库，尽早的关闭
        // 连接本身也是消耗资源的
        // 数据库连接如果使用完毕不关闭，可能会造成连接过多
        // 连接过多可能会导致连不上数据库
        db.close()
        if (err) {
          return callback(err)
        }

        // 只要代码执行到这里，说明一定没有错误
        // 所以第一个参数就可以传递一个 null
        callback(null, docs)
      })
  })
}
export function find1(collectionName, conditionDoc, callback) {
  _connect((err, db) => {
    if (err) {
      return callback(err)
    }
    db.collection(collectionName)
      .find(conditionDoc)
      .sort({
        create_time: -1
      })
      .toArray((err, docs) => {
        // 操作完数据库，尽早的关闭
        // 连接本身也是消耗资源的
        // 数据库连接如果使用完毕不关闭，可能会造成连接过多
        // 连接过多可能会导致连不上数据库
        db.close()
        if (err) {
          return callback(err)
        }

        // 只要代码执行到这里，说明一定没有错误
        // 所以第一个参数就可以传递一个 null
        callback(null, docs)
      })
  })
}
export function insertOne(collectionName, doc, callback) {
  _connect((err, db) => {
    if (err) {
      return callback(err)
    }
    db.collection(collectionName)
      .insertOne(doc, (err, result) => {
        db.close()
        if (err) {
          return callback(err)
        }
        callback(null, result)
      })
  })
}

export function deleteOne(collectionName, conditionDoc, callback) {
  _connect((err, db) => {
    if (err) {
      return callback(err)
    }
    db.collection(collectionName)
      .deleteOne(conditionDoc, (err, result) => {
        db.close()
        if (err) {
          return callback(err)
        }
        callback(null, result)
      })
  })
}

export function findOne(collectionName, conditionDoc, callback) {
  _connect((err, db) => {
    if (err) {
      return callback(err)
    }
    db.collection(collectionName)
      .findOne(conditionDoc, (err, doc) => {
        db.close()
        if (err) {
          return callback(err)
        }
        callback(null, doc)
      })
  })
}

export function updateOne(collectionName, conditionDoc, doc, callback) {
  _connect((err, db) => {
    if (err) {
      return callback(err)
    }
    db.collection(collectionName)
      .updateOne(conditionDoc, doc, (err, result) => {
        db.close()
        if (err) {
          return callback(err)
        }
        callback(null, result)
      })
  })
}

export function aggregate(collectionName, conditionDoc, callback) {
  _connect((err, db) => {
    if (err) {
      return callback(err)
    }
    db.collection(collectionName)
      .aggregate(conditionDoc, (err, result) => {
        db.close()
        if (err) {
          return callback(err)
        }
        callback(null, result)
      })
  })
}
export function count(collectionName, callback) {
  _connect((err, db) => {
    if (err) {
      return callback(err)
    }
    db.collection(collectionName)
      .count((err, count) => {
        db.close()
        if (err) {
          return callback(err)
        }
        callback(null, count)
      })
  })
}