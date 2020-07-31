const express = require('express')
const pool = require('../pool')
const path = require('path')
const formidable = require('formidable')
const fs = require('fs')

const router = new express.Router()

router.get('/selectAll', (req, res) => {
    let count = req.query.count // 请求记录数
    let part = req.query.part // 所属篇章
    let rows = []
    let sql = 'select * from article '
    if (part !== undefined) {
        sql += 'where part = ?'
    }
    pool.query(sql, [part], (err, result) => {
        if (err) {
            throw err
        }
        else {
            result.forEach((item, index) => {
                if (count !== undefined) {
                    if (index < count) {
                        rows.push(item)
                    }
                    return
                }

            })
            res.send({
                code: 200,
                msg: '',
                data: count === undefined ? result : rows
            })
        }
    })
})
/* 根据id查找 */
router.get('/selectById', (req, res) => {
    // let count = req.query.count // 请求记录数
    let id = req.query.id   //文章id
    let rows = []
    let sql = 'select * from article where id = ?'
    pool.query(sql, [id], (err, result) => {
        if (err) {
            throw err
        }
        else {
            res.send({
                code: 200,
                msg: '',
                data: result[0]
            })
        }
    })
})

/* 最新文章 */
router.get('/selectNew', (req, res) => {
    let count = req.query.count
    let rows = []   //真正返回的条数
    let sql = 'select * from article order by publish_date desc'
    pool.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else {
            if (count !== undefined) {
                result.forEach((item, index) => {
                    if (index < count) {
                        rows.push(item)
                    }
                    return
                })
            }


            res.send({
                code: 200,
                msg: '',
                data: count === undefined ? result : rows
            })
        }
    })
})
/* 最受欢迎文章 */
router.get('/selectPopular', (req, res) => {
    let count = req.query.count
    let rows = []   //真正返回的条数
    let sql = 'select * from article order by zan desc'
    pool.query(sql, (err, result) => {
        if (err) {
            throw err
        }
        else {
            if (count !== undefined) {
                result.forEach((item, index) => {
                    if (index < count) {
                        rows.push(item)
                    }
                    return
                })
            }


            res.send({
                code: 200,
                msg: '',
                data: count === undefined ? result : rows
            })
        }
    })
})


// console.log(__dirname.substring(0,__dirname.length-6))
/* 下载文件 */
router.post('/uploads/:id',(req,res) => {
    let id = req.params.id;
    
    // 创建表单解析对象
    let form = new formidable.IncomingForm();
    // 创建目录
    let filePath = path.join(__dirname,'../../','riliaoya/public/uploads',id)
    fs.exists(filePath, function(exists) {
        if(!exists){
            fs.mkdir(filePath, { recursive: true }, (err) => {
                if (err) throw err;
            })
        }
    })
    form.uploadDir = filePath;
    form.keepExtensions = true;
    // 解析
    form.parse(req,(err,fileds,files) => {
        // console.log(files.file.path.split('public')[1])
        res.json({
            picname:files.file.path.split('public')[1]
        })
    })
})

module.exports = router