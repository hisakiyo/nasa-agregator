import express from 'express'

const { Router } = require('express')

const router = Router()

router.use(express.json())

const db = require('../db/init.js')

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
    db.run('INSERT INTO NEWS (title, description, date, author_id, image) VALUES (?, ?, ?, ?, ?)', req.body.title, req.body.description, req.body.date, req.body.author_id, req.body.image, (err) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send('News inserted')
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
