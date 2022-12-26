const morgan = require('morgan')
const moment = require('moment-timezone')
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
  }
  next(error)
}

module.exports = {
  morganFormat,
  unkonwnEndPoint,
  errorHandler
}