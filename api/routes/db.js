import express from 'express'

const router = express();

router.use(express.json())

router.use(require('./news.js'))

router.use(require('./auth.js'))

module.exports = router
