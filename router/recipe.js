const express = require('express')
const router = express.Router()

const pool = require('../pool')

router.get('/selectAll', (req, res) => {
    // 请求记录数
    let count = req.query.count 
    let sort = req.query.sort // 所属类型
    // 需返回的数据
    let rows = []

    let sql = 'select * from recipe '
    if (sort !== undefined) {
        sql += 'where sort = ?'
    }
    pool.query(sql,[sort],(err, result) => {
        if (err) {
            throw err
        }
        else {
            let mainMatirals = []
            let subsidiarys = []
            let counter = 0
            // let sqlStep = "select no,description from recipe_steps,recipe where recipe_steps.recipe_id = ?"
            for (let item of result) {
                // mainMatirals = item.main_matiral.split(',')
                // subsidiarys = item.subsidiary.split(',')
                // item.main_matiral = mainMatirals
                // item.subsidiary = subsidiarys
                // 添加真实记录
                rows.push(item)
                counter++
                if(count!== undefined && counter == count){
                    break
                }
            }

            res.send({
                code: 200,
                msg: '',
                data: count === undefined ? result : rows
            })
        }
    })
})

router.get('/selectById', (req, res) => {
   
    let id = req.query.id;
    let sql = 'select * from recipe where id = ?' ;
    pool.query(sql,[id],(err, result) => {
        if (err) {
            throw err
        }
        else {
            // let sqlStep = "select no,description from recipe_steps,recipe where recipe_steps.recipe_id = ?"

            res.send({
                code: 200,
                msg: '',
                data: result[0] 
            })
        }
    })
})

module.exports = router