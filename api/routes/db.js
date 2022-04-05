import express from 'express'
import sqlite3 from 'sqlite3'

const { Router } = require('express')
const router = Router()
const db = new sqlite3.Database('database.sqlite')

db.serialize(function () {
    db.run('CREATE TABLE IF NOT EXISTS lorem (info TEXT)')
    var stmt = db.prepare('INSERT INTO lorem VALUES (?)')

    stmt.finalize()

    const router = Router()

    router.use(express.json())


    router.get('/db', function(req, res, next) {
        db.all('SELECT rowid AS id, info FROM lorem', function (err, rows) {
            if (err) {
                return next(err)
            }
            res.send({
                data: rows
            })
        })
    })

    router.get('/db/:id', function(req, res, next) {
        let id = req.params.id
        let sql = `SELECT rowid AS id, info FROM lorem where rowid = ${id}`
        db.get(sql, function (err, row) {
            if (row) {
                res.json(row)
            } else {
                res.status(404).json({ error: 'Not found' })
            }
        })
    })

    router.post('/db', function(req, res, next) {
        let info = req.body.info
        let sql = `INSERT INTO lorem (info) VALUES ('${info}')`
        db.run(sql, function (err, row) {
            if (err) {
                res.status(500).json({ error: err.message })
            } else {
                res.json({ id: this.lastID })
            }
        })
    })

    router.put('/db/:id', function(req, res, next) {
        let id = req.params.id
        let info = req.body.info
        let sql = `UPDATE lorem SET info = '${info}' WHERE rowid = ${id}`
        db.run(sql, function (err, row) {
            if (err) {
                res.status(500).json({
                    error: err.message
                })
            } else {
                res.json(row)
            }
        })
    })

    router.delete('/db/:id', function(req, res, next) {
        let id = req.params.id
        let sql = `DELETE FROM lorem WHERE rowid = ${id}`
        db.run(sql, function (err, row) {
            if (err) {
                res.status(500).json({
                    error: err.message
                })
            } else {
                res.json(row)
            }
        })
    })

  module.exports = router
})