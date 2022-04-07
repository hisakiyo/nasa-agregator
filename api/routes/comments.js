import express from 'express'

const { Router } = require('express')

const router = Router()

router.use(express.json())

const db = require('../db/init.js')

// GET /comments

router.get('/comments', (req, res) => {
    db.all('SELECT * FROM COMMENTS', (err, rows) => {
        if (err) {
            res.status(500).send(err)
        } else if(rows.length === 0) {
            res.status(404).send('No comments found')
        } else {
            res.status(200).send(rows)
        }
    })
})

// Get comments by id
router.get('/comments/:id', (req, res) => {
    db.get('SELECT * FROM COMMENTS WHERE id = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err)
        } else if (row.length === 0) {
            res.status(404).send('No comments found')
        } else {
            res.status(200).send(row)
        }
    })
})

// Insert comments
router.post('/comments', (req, res) => {
    db.run('INSERT INTO COMMENTS (news_id, text, date, author_username, author_email, isValidated) VALUES (?, ?, ?, ?, ?, ?)', req.body.news_id, req.body.text, req.body.date, req.body.author_username, req.body.author_email, req.body.isValidated, (err) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send('Comments inserted')
        }
    })
})

// Delete comments
router.delete('/comments/:id', (req, res) => {
    db.run('DELETE FROM COMMENTS WHERE id = ?', req.params.id, (err) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send('Comments deleted')
        }
    })
})

// Update comments
router.put('/comments/:id', (req, res) => {
    db.run('UPDATE COMMENTS SET news_id = ?, text = ?, date = ?, author_username = ?, author_email = ?, isValidated = ? WHERE id = ?', req.body.news_id, req.body.text, req.body.date, req.body.author_username, req.body.author_email, req.body.isValidated, req.params.id, (err) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send('Comments updated')
        }
    })
})


module.exports = router