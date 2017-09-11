import express from 'express'
import * as comment from '../controllers/comment'

const router = express.Router();

router.prefix = '/comment'

router.post('/create/:articleId', comment.create)
router.get('/list/:articleId', comment.list)

export default router;