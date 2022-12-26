const blogRouter = require('express').Router()
const Blog = require('../models/note')

blogRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => response.json(blogs))
})

blogRouter.post('/', (require, response) => {
  const blog = new Blog(require.body)

  blog.save().then(savedBlog => {
    response.status(201).json(savedBlog)
  })
    .catch(error => next(error))
})
module.exports = blogRouter