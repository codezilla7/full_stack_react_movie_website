const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categoryModel = new Schema({
    Name:{
        type: String,
        required: true
    }
} , {timestamps:true})

module.exports = mongoose.model("categories" , categoryModel)