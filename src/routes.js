const express = require('express')
const { query } = require('./database/blogs.js')
const db = require('./database/blogs.js')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('This is a Nodejs CRUD demo')
})

router.get('/get', async (req, res) => {
    var query_string = 'SELECT * FROM `blogs`;'
    db.query(
        query_string,
        function(err, results) {
            if (err) {
                res.send(err)
                return
            }
          res.send(JSON.stringify(results))
        }
    )
})

router.get('/get/:id', (req, res) => {
    const id = req.params.id
    var query_string = 'SELECT * FROM `blogs` where `id`=?;'
    db.query(
        query_string,
        [id],
        function(err, results) {
            if (err || results.length === 0) {
                res.send({error: "Invalid Id"})
                return
            }
          res.send(JSON.stringify(results[0]))
        }
    );
})

router.post('/create', (req, res) => {
    const { title, content} = req.body
    var query_string = 'INSERT into `blogs`(title, content) VALUES(?, ?)'
    db.query(
        query_string,
        [title, content],
        function(err, results) {
            if (err) {
                res.send(err)
            }
            return res.send({status:"SUCESS"})
        }
    )
})

router.put('/update', (req, res) => {
    const { id, title, content} = req.body
    var query_string = 'Update `blogs` set `title` = ?, `content` = ? where `id` = ?'
    db.query(
        query_string,
        [title, content, id],
        function(err, results) {
            if (err) {
                res.send(err)
            }
            return res.send({status:"SUCESS"})
        }
    )
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id
    var query_string = 'DELETE from blogs where id = ?;'
    db.query(
        query_string,
        [id],
        function(err, results) {
            if (err) {
                res.send({error: "Invalid Id"})
                return
            }
          res.send({status: 'Success'})
        }
    );
})

module.exports = router