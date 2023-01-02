const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('./app')

const api = supertest(app)
const Blog = require('./models/blog')
const blog = require('./models/blog')

const main = async () => {
  const newBlog = {
    title: "Test no Authorization",
    url: "https://jestjs.io/docs/expect#tobedefined",
    author: "songhuajiang",
    likes: 121
  }
  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNvbmdodWFqaWFuZyIsImlkIjoiNjNhZTU0ZTlkMzViMDBhNDAzNDlkODMwIiwiaWF0IjoxNjcyMzc5MTE2fQ.wpHlxz8wEiUV9-4GcNR3hxyzlmpNmzpy9Iwynz7EYm0`)
    .send(newBlog)
    .expect(201)
  console.log(response.status)
}
main()