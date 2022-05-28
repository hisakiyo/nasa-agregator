import express from 'express'
import axios from 'axios'

const { Router } = require('express')

const router = Router()

router.use(express.json())

router.get('/iss', (req, res) => {
  axios
    .get(`http://api.open-notify.org/astros.json`)
    .then((x) => {
      res.status(200).send(x.data)
    })
    .catch(() => {
      res.status(500)
    })
})

module.exports = router;
