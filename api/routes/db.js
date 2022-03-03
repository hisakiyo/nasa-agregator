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
      res.json(rows)
    })
  })

  router.get('/db/:id', function(req, res, next) {
    let id = req.params.id
    let sql = `SELECT rowid AS id, info FROM lorem where rowid = ${id}`
    db.get(sql, function (err, row) {
      res.json(row)
    })
  })

  router.post('/db', function(req, res, next) {
    let info = req.body.info
    let sql = `INSERT INTO lorem (info) VALUES ('${info}')`
    db.run(sql, function (err, row) {
        res.json(row)
        })
    })

  router.put('/db/:id', function(req, res, next) {
    let id = req.params.id
    let info = req.body.info
    let sql = `UPDATE lorem SET info = '${info}' WHERE rowid = ${id}`
    db.run(sql, function (err, row) {
        res.json(row)
        })
    })

  router.delete('/db/:id', function(req, res, next) {
    let id = req.params.id
    let sql = `DELETE FROM lorem WHERE rowid = ${id}`
    db.run(sql, function (err, row) {
        res.json(row)
        })
    })

  module.exports = router
})