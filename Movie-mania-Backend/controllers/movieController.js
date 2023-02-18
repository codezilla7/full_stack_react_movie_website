const allMovies = require('../models/movieModel')
const mongoose = require("mongoose")
const Joi = require("joi");


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

// GET all movies

const getMovies = async (req, res) => {
    const movies = await allMovies
    .find({})
    .sort({ Title: 1 })
    if (!movies) {
        return res.status(404).json({ msg: "no such movies" })
    }
    res.status(200).json(movies)
}

// GET a movie by ID

const getMovie = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: "no such movie" })
    }

    const movie = await allMovies.findById(id)

    if (!movie) {
        return res.status(404).json({ msg: "no such movie" })
    }

    res.status(200).json(movie)

}

// POST a movie

const postMovie = async (req, res) => {
    const { Title, Year, Runtime, Poster, Description, Category } = req.body
    const {error} = validateSchema(req.body)
    if (error) {
        return res.status(400).json({ error: error && error.details[0].message })
    }
    try {
        const movie = await allMovies.create({ Title, Year, Runtime, Poster, Description, Category })
        res.status(200).json(movie)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// DELETE a movie

const deleteMovie = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: "no such movie" })
    }

    const movie = await allMovies.findOneAndDelete({ _id: id })

    if (!movie) {
        return res.status(400).json({ msg: "no such movie" })
    }

    res.status(200).json(movie)
}

// UPDATE a movie

const updateMovie = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ msg: "no such movie" })
    }

    const movie = await allMovies.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!movie) {
        return res.status(400).json({ msg: "no such movie" })
    }

    res.status(200).json(movie)
}

module.exports = {
    getMovies,
    getMovie,
    postMovie,
    deleteMovie,
    updateMovie
}