const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('./app')

const api = supertest(app)
const Blog = require('./models/blog')
const blog = require('./models/blog')

const main = async () => {
  const response = await api.get('/api/blogs')

  console.log(response.body[0])
}
main()