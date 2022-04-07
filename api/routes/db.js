import express from 'express'

const router = express();

router.use(express.json())

router.use(require('./news.js'))

module.exports = router
