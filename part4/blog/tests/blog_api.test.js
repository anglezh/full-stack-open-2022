const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const blog = require('../models/blog')
const { application } = require('express')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  // const blogObjects = helper.initialBlogs
  //   .map(blog => new Blog(blog))
  // const promiseArray = blogObjects.map(blog => blog.save())
  // await Promise.all(promiseArray)
})
describe('when there is initially some blog saved', () => {
  test('blog are return as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)

  })
})
describe('verity property name', () => {
  test('verity id property name', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })

  test('miss likes, default 0 value', async () => {
    const newBlog = {
      title: "JEST",
      url: "https://jestjs.io/docs/expect#tobedefined",
      author: "Facebook"
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
    expect(response.body['likes']).toBe(0)
  })

  test('miss title and url properties', async () => {
    const newBlog = {
      author: "Facebook"
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id valid', async () => {
    const blogAtStart = await helper.blogsInDB()
    const deleteToBlog = blogAtStart[0]
    console.log(`deleteToBlog:${deleteToBlog.id}`)
    await api
      .delete(`/api/blogs/${deleteToBlog.id}`)
      .expect(204)

    const blogAtEnd = await helper.blogsInDB()
    const urlArray = blogAtEnd.map(r => r.url)

    expect(urlArray).not.toContain(deleteToBlog.url)
  })
})

describe('a viald blog add and update', () => {
  test('a viald blog can be added', async () => {
    const newBlog = {
      title: "JEST",
      url: "https://jestjs.io/docs/expect#tobedefined",
      author: "Facebook",
      likes: 12
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogAtEnd = await helper.blogsInDB()
    const contents = blogAtEnd.map(blog => blog.title)
    expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(contents).toContain(
      'JEST'
    )
  })
  test('a viald blog can be updated', async () => {
    const blogAtStart = await helper.blogsInDB()
    const blogToUpdate = blogAtStart[0]
    const newBlog = {
      likes: 20,
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
    const blogAtEnd = await helper.blogsInDB()
    const updatedBlog = blogAtEnd.find(r => r.id === blogToUpdate.id)
    expect(updatedBlog.likes).toBe(newBlog.likes)
  })
})

describe('blogs not exist', () => {
  test('fails with status code 404 if blogs does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    // console.log(validNonexistingId)
    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404)
  })
})


