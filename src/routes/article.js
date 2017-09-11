import express from 'express'
import * as article from '../controllers/article'

const router = express.Router()

router.prefix = '/article'

router.get('/')
  .get('/publish', article.showPublish)
  .post('/publish', article.doPublish)
  .get('/show/:id', article.show)
  .get('/edit/:id', article.showEdit)
  .post('/edit/:id', article.doEdit)

export default router
