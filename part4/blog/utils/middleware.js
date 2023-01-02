const morgan = require('morgan')
const moment = require('moment-timezone')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const morganFormat = morgan('[:date[Asia/Shanghai]] :method :url :status :res[content-length] - :response-time ms :body')


morgan.token('body', req => {
  return JSON.stringify(req.body)
})
morgan.token('date', (req, res, tz) => {
  return moment().tz(tz).format('YYYY-MM-Do dddd h:mm:ss a')
})

const unkonwnEndPoint = (request, response) => {
  response.status(404).end()
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({
      error: 'invalid token'
    })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}
const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      response.status(401).json({
        error: 'token missing or invalid'
      })
    }

    const user = await User.findById(decodedToken.id)
    if (user) {
      request.user = user
    }
  }
  next()

}

module.exports = {
  morganFormat,
  unkonwnEndPoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}