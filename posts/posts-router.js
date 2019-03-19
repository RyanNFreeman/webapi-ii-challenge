const express = require('express')

const db = require('../data/db')

const router = express.Router();

//READ of CRUD operations

router.get('/', (req, res) => {
    //Returns an array of all the post objects contained in the database.
    db
    .find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
}) //WORKING NOW

//CREATE of CRUD operations

router.post('/', (req, res) => {
    const newPost = req.body;
    const { title, contents } = newPost
    title && contents ? 
    db
    .insert(newPost)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }) :
    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
}) //WORKING NOW


router.get('/api/posts/:id', (req, res) => {
    
})

router.delete('/api/posts/:id', (req, res) => {
    
})

router.put('/api/posts/:id', (req, res) => {
    
})

module.exports = router