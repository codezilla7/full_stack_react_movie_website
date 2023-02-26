const allcontacts = require('../models/contactModel')
const mongoose = require('mongoose')
const Joi = require('joi')

function validateSchema(body) {
    const schema = Joi.object({
        fullname: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }),
        socialmedia: Joi.string(),
        description: Joi.string().min(25).required()
    })
    return schema.validate(body)
}

const getContacts = async (req,res) => {
    const contacts = await allcontacts.find().sort({createdAt: -1})
    if(!contacts) {
        return res.status(400).json({error:'no contacts'})
    }
    res.status(200).json(contacts)
}

const getContact = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: "no such contact" })
    }

    const contact = await allcontacts.findById(id)

    if (!contact) {
        return res.status(404).json({ msg: "no such contact" })
    }

    res.status(200).json(contact)
}

const contactus = async (req,res) => {
    const {fullname , email , socialmedia , description} = req.body
    try{
        const {error} = validateSchema(req.body)
        if(!error){
            const contact = await allcontacts.create({fullname,email,socialmedia,description})
            res.status(200).json(contact)
        } else {
            res.status(400).json({error: error && error.details[0].message})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteContact = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: "no such contact" })
    }

    const contact = await allcontacts.findOneAndDelete({ _id: id })

    if (!contact) {
        return res.status(400).json({ msg: "no such contact" })
    }

    res.status(200).json(contact)
}

module.exports = {
    getContacts,
    getContact,
    contactus,
    deleteContact
                }