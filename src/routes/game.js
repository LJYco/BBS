import express from 'express'
import * as game from '../controllers/game'

const router = express.Router()
router.prefix = '/'
router
    .get('/game', game.game)
    .get('/game/bird', game.bird)

export default router