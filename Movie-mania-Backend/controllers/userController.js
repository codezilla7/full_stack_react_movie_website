const User = require('../models/userModel')
const Joi = require('joi')
const Jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return Jwt.sign({_id}, process.env.SECRET , {expiresIn:"3d"})
}

function validateSchema(body) {
    const schema = Joi.object({
      email: Joi.string().email({ tlds: { allow: false } }),
      password: Joi.string().alphanum().min(8).max(30).required(),
    });
    return schema.validate(body);
}

const userLogin = async (req,res) => {
    const {email,password} = req.body

    try {
        const {error} = validateSchema(req.body)
        if(!error){
            const user = await User.login(email,password)
            const Token = createToken(user._id)
            res.status(200).json({email,Token})
        } else {
            res.status(400).json( {error: error && error.details[0].message })
        }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const userSignup = async (req,res) => {
    const {email,password} = req.body;

    try{
        const {error} = validateSchema(req.body)
        if(!error) {
            const user = await User.signup(email,password)
            const Token = createToken(user._id)
            res.status(200).json({email,user,Token})
        } else {
            res.status(400).json({ error: error && error.details[0].message })
        }
    } catch (error) {
        res.status(400).json({err:error.message})
    }   
}

module.exports = {
    userLogin,
    userSignup
}