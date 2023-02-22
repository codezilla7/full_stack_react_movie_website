const allSliders = require('../models/sliderModel')
const Joi = require('joi')
const mongoose = require('mongoose')

function validateSchema(body) {
    const schema = Joi.object({
        Title: Joi.string().required(),
        Year: Joi.string().required(),
        Runtime: Joi.string().required(),
        Poster: Joi.string().required(),
        Category: Joi.string().required(),
        Description: Joi.string().min(25).required(),
      });
      return schema.validate(body);
}

const getSliders = async (req, res) => {
    const sliders = await allSliders
    .find({})
    .sort({ Title: 1 })
    if (!sliders) {
        return res.status(404).json({ msg: "no such movies" })
    }
    res.status(200).json(sliders)
}

const getSlider = async (req,res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: "no such movie" })
    }

    const slider = await allSliders.findById(id)

    if (!slider) {
        return res.status(404).json({ msg: "no such movie" })
    }

    res.status(200).json(slider)

}


const postSlider = async (req,res) => {
    const { Title, Year, Runtime, Poster, Description, Category } = req.body
    const {error} = validateSchema(req.body)
    if (error) {
        return res.status(400).json({ error: error && error.details[0].message })
    }
    try {
        const slider = await allSliders.create({ Title, Year, Runtime, Poster, Description, Category })
        res.status(200).json(slider)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteSlider = async (req,res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: "no such movie" })
    }

    const slider = await allSliders.findOneAndDelete({ _id: id })

    if (!slider) {
        return res.status(400).json({ msg: "no such movie" })
    }

    res.status(200).json(slider)
}

const updateSlider = async (req,res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: "no such movie" })
    }

    const slider = await allSliders.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!slider) {
        return res.status(400).json({ msg: "no such movie" })
    }

    res.status(200).json(slider)
}

module.exports = {
    getSliders,
    getSlider,
    postSlider,
    deleteSlider,
    updateSlider
}