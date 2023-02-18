const allCategories = require("../models/categoryModel")
const mongoose = require('mongoose')

// GET all categories

const getCategories = async (req,res) => {
    const categories = await allCategories.find({}).sort({Name: 1});
    res.status(200).json(categories)
}

// GET a single category

const getCategory = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({msg: "no such category"})
    }

    const category = await allCategories.findById(id);

    if(!category){
        return res.status(404).json({msg:"no such category"})
    }

    res.status(200).json(category)
}

// POST a category

const postCategory = async(req,res) => {
    const { Name } = req.body;

    try{
        const category = await allCategories.create({Name})
        res.status(200).json(category)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a category

const deleteCategory = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({msg:"not a valid id"})
    }

    const category = await allCategories.findOneAndDelete({_id:id})

    if(!category) {
        return res.status(404).json({msg:"no such category"})
    }

    res.status(200).json(category)
}

// UPDATE a category

const updateCategory = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).json({msg: "not a valid id"})
    }

    const category = await allCategories.findOneAndUpdate({_id:id},{...req.body})

    if(!category) {
       return res.status(404).json({msg:"no such category"})
    }

    res.status(200).json(category)
}

module.exports = {
    getCategories,
    getCategory,
    postCategory,
    deleteCategory,
    updateCategory
}