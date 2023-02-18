const contacts = require('../models/contactModel')
const Joi = require('joi')

function validateSchema(body) {
    const schema = Joi.object({
        fullname: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }),
        message: Joi.string().min(25).required()
    })
    return schema.validate(body)
}

const contactus = async (req,res) => {
    const {fullname , email , message} = req.body
    try{
        const {error} = validateSchema(req.body)
        if(!error){
            const contact = await contacts.create({fullname,email,message})
            res.status(200).json(contact)
        } else {
            res.status(400).json({error: error && error.details[0].message})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {contactus}