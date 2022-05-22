import express from 'express'

const { Router } = require('express')
const router = Router()
const bcrypt = require('bcrypt')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const authUserSecret = 'bebou' // an arbitrary long string, you can ommit env of course
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

router.use(express.json())
router.use(passport.initialize())
router.use(cookieParser())

// Import sqlite3 db
const db = require('../db/init.js')

async function generatePasswordHash (plainPassword) {
    return await bcrypt.hash(plainPassword, 12)
}

async function comparePasswords (plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}  

const tokenExtractor = function (req) {
  let token = null
  if (req.req && req.req.cookies && req.req.cookies['auth._token.local']) {
    const rawToken = req.req.cookies['auth._token.local'].toString()
    token = rawToken.slice(rawToken.indexOf(' ') + 1, rawToken.length)
  }
  return token
}

function GetUser(username, callback) {
    db.get('SELECT * FROM USERS WHERE username = ?', username, (err, row) => {
        if (err) {
            callback(err)
        } else if (!row) {
            callback(null, false)
        } else {
            callback(null, row)
        }
    })
}

passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      },
      function (username, password, done) {
        GetUser(username, async function (err, user) {
          if (err) {
            return done(err)
          }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' })
          }
          if (!(await comparePasswords(password, user.password))) {
            return done(null, false, { message: 'Incorrect password.' })
          }
          return done(null, user)
        })
      }
    )
)

passport.use(new JwtStrategy({
  jwtFromRequest: tokenExtractor,
  secretOrKey: authUserSecret
},
function (jwtPayload, done) {
  console.log('JWT payload:', jwtPayload)
  GetUser(jwtPayload.username, function (err, user) {
    if (err) {
      return done(err)
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' })
    }
    return done(null, user)
  })
}))

function signUserToken (user) {
  return jwt.sign({
    id: user.id,
    username: user.username
  }, authUserSecret)
}

// login route bearer with nuxt auth
router.post('/auth/login', (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            })
        }
        if (!user) {
            return res.status(401).json({
                message: 'Authentication failed'
            })
        }
        const token = signUserToken(user)
        res.send({ token })
    })(req, res)
})

router.get('/auth/user', (req, res) => {
  // console.log(req.cookies['auth._token.local'])
  passport.authenticate('jwt', { session: false }, (err, user, message) => {
    if (err) {
      // you should log it
      return res.status(400).send(err)
    } else if (!user) {
      // you should log it
      return res.status(403).send({ message })
    } else {
      return res.send({ user })
    }
  })(res, req)
})


module.exports = router