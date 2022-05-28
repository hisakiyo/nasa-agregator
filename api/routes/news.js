import express from 'express'

const { Router } = require('express')

const router = Router()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

router.use(express.json())
router.use(cookieParser())

const db = require('../db/init.js')

const tokenExtractor = function (req) {
    let token = null
    if (req && req.cookies && req.cookies['auth._token.local']) {
      const rawToken = req.cookies['auth._token.local'].toString()
      token = rawToken.slice(rawToken.indexOf(' ') + 1, rawToken.length)
    }
    return token
  }

// GET /news

router.get('/news', (req, res) => {
    db.all('SELECT * FROM NEWS', (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else if (rows.length === 0) {
            res.status(404).send('No news found')
        } else {
            res.status(200).send(rows)
        }
    })
})

// Get news by id
router.get('/news/:id', (req, res) => {
    db.get('SELECT * FROM NEWS WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err)
        } else if (row.length === 0) {
            res.status(404).send('No news found')
        } else {
            res.status(200).send(row)
        }
    })
})

// Insert news
router.post('/news', (req, res) => {
    // Date is like 2022-04-01
    const date = new Date().toISOString().slice(0, 10)
    // Get user id with JWT token
    const token = tokenExtractor(req)
    if (token) {
      const userId = jwt.verify(token, "bebou").id
    } else {
      const userId = 1
    }
  
    db.run('INSERT INTO NEWS (author_id, date, description, image, title) VALUES (?, ?, ?, ?, ?)', userId, date, req.body.description, req.body.image, req.body.title, (err) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send('News added')
        }
    })
})

// Delete news
router.delete('/news/:id', (req, res) => {
    db.run('DELETE FROM NEWS WHERE id = ?', req.params.id, (err) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send('News deleted')
        }
    })
})

// Update news
router.put('/news/:id', (req, res) => {
    db.run('UPDATE NEWS SET title = ?, description = ?, date = ?, author_id = ?, image = ? WHERE id = ?', req.body.title, req.body.description, req.body.date, req.body.author_id, req.body.image, req.params.id, (err) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send('News updated')
        }
    })
})

module.exports = router; 
