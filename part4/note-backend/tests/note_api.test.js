const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Note = require('../models/note')

beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(helper.initialNotes)
  // const noteObjects = helper.initialNotes
  //   .map(note => new Note(note))
  // const promiseArray = noteObjects.map(note => note.save())
  // await Promise.all(promiseArray)
})
describe('when there is initially some notes saved', () => {

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)
    expect(contents).toContain(
      'Browser can execute only Javascript'
    )
  })
})
describe('viewing a specific note', () => {
  test('succeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToView = notesAtStart[0]
    // console.log(typeof (noteToView))
    // console.log(`noteToView:${noteToView}`)
    // console.log(`JSON.stringify(noteToView):${JSON.stringify(noteToView)}`)
    // console.log(`JSON.parse(JSON.stringify(noteToView)):${JSON.parse(JSON.stringify(noteToView))}`)
    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    // console.log(typeof (noteToView))
    // console.log(typeof (resultNote.body))
    // console.log(`resultNote.body:${resultNote.body}`)
    //这个处理过程将把笔记对象的date属性值的类型从Date对象变成一个字符串
    const processNoteToView = JSON.parse(JSON.stringify(noteToView))
    expect(resultNote.body).toEqual(processNoteToView)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()
    // console.log(validNonexistingId)
    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const id = '8a5213'
    await api
      .get(`/api/notes/${id}`)
      .expect(400)
  })

})

describe('addtion of a new note', () => {
  test('succeeds with valid data', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    const contents = notesAtEnd.map(note => note.content)
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('fail with status code 400 if data invalid', async () => {
    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)
    const noteAtEnd = await helper.notesInDb()
    expect(noteAtEnd).toHaveLength(helper.initialNotes.length)
  })


})

describe('deletion of a note', () => {

  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(
      helper.initialNotes.length - 1
    )
    const contents = notesAtEnd.map(r => r.content)

    expect(contents).not.toContain(noteToDelete.content)
  })
})





test('a note can be update', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls update',
    important: true,
  }
  const notesAtStart = await helper.notesInDb()
  const noteToUpdate = notesAtStart[0]
  await api
    .put(`/api/notes/${noteToUpdate.id}`)
    .send(newNote)
    .expect(200)
  const notesAtEnd = await helper.notesInDb()
  expect(notesAtEnd).toHaveLength(
    helper.initialNotes.length
  )
  const contents = notesAtEnd.map(r => r.content)
  expect(contents).toContain('async/await simplifies making async calls update')

})

afterAll(() => {
  mongoose.connection.close()
})