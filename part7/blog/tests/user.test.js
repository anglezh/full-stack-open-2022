const bcrypt = require('bcrypt')
const { application } = require('express')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

describe('when there is initially one usr in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash: passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDB()
    const newUser = {
      username: "libai",
      name: "cikebai",
      password: "dazhao"
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain('libai')

  })
  //如果用户名已经被占用，则创建失败，并有适当的状态代码和消息。
  test('creation fails with proper status code and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDB()
    const user = usersAtStart[0]
    console.log(user)
    const newUser = {
      username: user.username,
      name: user.name,
      password: "sanqianwan"

    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)


    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDB()
    expect(usersAtEnd).toEqual(usersAtStart)

  })
})

describe('Test the validity of the username and password，No less than three characters', () => {
  test('the validity of username no less than three characters', async () => {
    const newUser = {
      username: "z",
      name: "name",
      password: "passsssssssword"
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-type', /application\/json/)

    expect(result.body.error).toContain('User validation failed')
  })
})