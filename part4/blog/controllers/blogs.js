const blogRouter = require('express').Router()
const { response, request } = require('../app')
const blog = require('../models/blog')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  if (!blog.title && !blog.url) {
    response.status(400).end()
    // return
  } else {
    if (!blog.likes) {
      blog['likes'] = 0
    }
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)

  }
})
blogRouter.delete('/:id', async (request, response, next) => {
  await blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  console.log(body)
  const newBlog = {
    title: body.title,
    url: body.url,
    author: body.author,
    likes: body.likes
  }
  const updateBlog = await blog.findByIdAndUpdate(request.params.id, newBlog, { new: true, runValidators: true, context: 'query' })

  response.json(updateBlog)
})
module.exports = blogRouter