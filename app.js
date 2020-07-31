const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// 引入用户路由
const recipe = require('./router/recipe')
const article = require('./router/article')
const material = require('./router/material')


const app = express()
app.use(express.static('public'))

// 新浪云node服务器端口必须是5050
app.listen(5050,() => {
    console.log('server is running ...')
})

// 跨域
app.use(cors({
    // 允许哪些请求源
    origin : '*'
}))

// 配置bodyParser
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(bodyParser.json())


// 挂载,执行中间件函数
app.use('/recipe',recipe)
app.use('/article',article)
app.use('/material',material)
