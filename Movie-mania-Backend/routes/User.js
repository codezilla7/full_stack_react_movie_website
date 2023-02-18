const express = require('express')
const {
    userLogin,
    userSignup
} = require('../controllers/userController')

const Router = express.Router()

Router.post('/login' , userLogin)

Router.post('/signup', userSignup)

module.exports = Router