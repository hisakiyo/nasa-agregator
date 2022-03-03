// api/index.js

const express = require('express')
// Import of API Routes
const articles = require('./routes/articles.js')
const db = require('./routes/db.js')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(articles)
app.use(db)


export default {
  path: '/api',
  handler: app
}