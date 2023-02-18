const express = require('express')
const {contactus} = require('../controllers/contactsController')

const Router = express.Router();

Router.post('/contactus' , contactus)

module.exports = Router