const express = require("express");

const {
    getMovies,
    getMovie,
    postMovie,
    deleteMovie,
    updateMovie,
} = require("../controllers/movieController")

const router = express.Router()

// GET movies 

router.get("/" , getMovies)

// GET a movie

router.get("/:id" , getMovie)

// POST a movie

router.post('/' , postMovie)

// DELETE a movie

router.delete('/:id' , deleteMovie)

// Update a movie

router.patch('/:id' , updateMovie)

module.exports = router