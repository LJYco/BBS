import express from 'express'
import * as account from '../controllers/account'

const router = express.Router()

router.prefix = '/account'

router
    .get('/register', account.showRegister)
    .post('/register', account.doRegister)
    .get('/login', account.showLogin)
    .post('/login', account.doLogin)
    .get('/logout', account.doLogout)
    .get('/user', account.user)
export default router