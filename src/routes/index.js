import express from 'express'
import * as index from '../controllers/index.js'

const router = express.Router()

router.prefix = '/'

router.get('/:pageNumber?', index.showIndex)

export default router