const express = require('express')
const Router = express.Router()
const {
    getSliders,
    getSlider,
    postSlider,
    deleteSlider,
    updateSlider
} = require('../controllers/sliderController')


Router.get('/' , getSliders)

Router.get('/:id' , getSlider)

Router.post('/' , postSlider)

Router.delete('/:id' , deleteSlider)

Router.patch('/:id' , updateSlider)


module.exports = Router

