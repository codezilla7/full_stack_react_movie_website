const express = require('express')
const { 
    getContacts,
    getContact,
    contactus,
    deleteContact } = require('../controllers/contactsController')

const Router = express.Router();

Router.get('/', getContacts)

Router.get('/:id', getContact)

Router.post('/', contactus)

Router.delete('/:id', deleteContact)

module.exports = Router