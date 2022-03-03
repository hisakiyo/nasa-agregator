// api/index.js

const express = require('express')
// Import of API Routes
const articles = require('./routes/articles.js')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(articles)


export default {
  path: '/api',
  handler: app
}