import express from 'express'

const router = express();

router.use(express.json())

router.use(require('./news.js'))

router.use(require('./auth.js'))

router.use(require('./comments.js'))

router.use(require('./iss.js'))

module.exports = router
