const mongoose = require("mongoose")

const Schema = mongoose.Schema

const movieSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Year: {
        type: String,
        required: true
    },
    Runtime: {
        type: String,
        required: true
    },
    Poster: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("movies", movieSchema)