const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const express = require('express')
const app = express()
const userExtractor = middleware.userExtractor
app.use(userExtractor)

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', userExtractor, async (request, response, next) => {
  const body = request.body
  const user = request.user
  const blog = new Blog({
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes,
    user: user._id
  })

  if (!blog.title && !blog.url) {
    response.status(400).end()
  } else {
    if (!blog.likes) {
      blog['likes'] = 0
    }

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    response.status(404).json({
      error: 'nont fount blog'
    })
    return
  }

  const user = request.user
  if (blog.user.toString() === user.id) {

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({
      error: 'No permission'
    })
  }

})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  console.log(body)
  const newBlog = {
    likes: body.likes
  }
  const updateBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true, runValidators: true, context: 'query' })

  response.json(updateBlog)
})
module.exports = blogRouter