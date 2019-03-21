const express = require('express')
const postsRouter = require('./posts/posts-router')
const server = express()

server.use(express.json())

server.get('/', (req, res) => {
    res.status(200).send('hello!')
})

server.use('/api/posts', postsRouter)

module.exports = server;