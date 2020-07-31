const express = require('express')
const pool = require('../pool')
const e = require('express')

const router = new express.Router()

router.get('/selectAll', (req, res) => {
    let count = req.query.count // 请求记录数
    let sort = req.query.sort // 所属类型
    let rows = []
    let sql = 'select * from material '
    if (sort !== undefined) {
        sql += 'where sort = ?'
    }
    pool.query(sql, [sort], (err, result) => {
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

module.exports =  router