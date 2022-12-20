const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const moment = require('moment-timezone')
const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('[:date[Asia/Taipei]] :method :url :status :res[content-length] - :response-time ms'))
morgan.token('date', (req, res, tz) => {
    return moment().tz(tz).format();
})
morgan.format('myformat', '[:date[Asia/Taipei]] ":method :url" :status :res[content-length] - :response-time ms');
app.use(morgan('myformat'));
let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2022-05-30T17:30:31.098Z",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2022-05-30T18:39:34.091Z",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2022-05-30T19:20:14.298Z",
        important: true
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello, World!<h1>')
})
const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}
app.get('/api/notes', (request, response) => {
    console.log(response)
    response.json(notes)
})
app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})
app.post('/api/notes', (require, response) => {
    const body = require.body
    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const note = {
        id: generateId(),
        content: body.content,
        date: new Date(),
        important: body.important || false
    }
    notes = notes.concat(note)
    console.log(notes)
    response.json(note)
})
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`)
})