import express from 'express'

const { Router } = require('express')

const router = Router()

router.use(express.json())

const db = require('../db/init.js')

// TODO

module.exports = router