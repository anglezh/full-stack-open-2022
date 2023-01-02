const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response, next) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body
  if (password.length < 3) {
    return response.status(400).send({ error: 'passwold is shorter than the minimum allowed length (3)' })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })

    return response.status(400).send({ error: 'username must be unique' })
  }

  const saltRounds = 10

  const passwordHash = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    passwordHash

  })
  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter