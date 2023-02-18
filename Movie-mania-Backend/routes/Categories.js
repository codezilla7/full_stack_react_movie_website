const express = require('express')
const {
    getCategories,
    getCategory,
    postCategory,
    deleteCategory,
    updateCategory
} = require('../controllers/categorycontroller')

const router = express.Router();

//GET all categories

router.get('/' , getCategories)

//GET a single category

router.get('/:id' , getCategory);

//POST a category

router.post('/' , postCategory);

// DELETE a category

router.delete('/:id' , deleteCategory);

// UPDATE a category

router.patch('/:id' , updateCategory);


module.exports = router