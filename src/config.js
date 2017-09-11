import {
    join
} from 'path'

export default {
    host: '127.0.0.1',
    port: 3000,
    viewPath: join(__dirname, '../views'),
    connStr: 'mongodb://localhost:27017/wenda',
    sessionSecret: 'ysyhljt_imust_wenda'
}