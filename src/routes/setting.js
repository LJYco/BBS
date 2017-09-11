import express from 'express'
const router = express.Router()

router.prefix = '/setting'

router.get('/', function (req, res) {
  res.send('setting')
})

export default router
