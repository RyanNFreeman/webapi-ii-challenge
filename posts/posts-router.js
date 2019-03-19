const express = require('express')

const Posts = require('../data/db')

const router = express.Router();

router.get('/', (req, res) => {
    //Returns an array of all the post objects contained in the database.
    Posts
    .find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
}) //WORKING NOW

router.post('/api/posts', (req, res) => {

})


router.get('/api/posts/:id', (req, res) => {
    
})

router.delete('/api/posts/:id', (req, res) => {
    
})

router.put('/api/posts/:id', (req, res) => {
    
})

module.exports = router