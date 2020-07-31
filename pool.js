const mysql = require('mysql')

// 创建连接池
const pool = mysql.createPool({
    // host:'localhost',
    // port:3306,
    // user:'root',
    // password:'m1998829',
    // database:'riliaoya',
    // connectionLimit:5
    host:process.env.MYSQL_HOST,
    port:process.env.MYSQL_PORT,
    user:process.env.ACCESSKEY,
    password:process.env.SECRETKEY,
    database:'app_' + process.env.APPNAME,
    connectionLimit:5
})

module.exports = pool