import { useEffect, useState } from 'react'

import {
  Routes,
  Route,
  Link,
  // Navigate,
  useNavigate,
  useMatch
} from 'react-router-dom'
import { useField } from './hooks'

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)
const AnecdoteList = ({ anecdotes }) => {
  const navigate = useNavigate()
  const clickAnecdote = (id) => {
    navigate(`/anecdotes/${id}`)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => <li key={anecdote.id} onClick={() => clickAnecdote(anecdote.id)} ><a href=''>{anecdote.content}</a></li>)}
      </ul>
    </div >
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {

  const navigate = useNavigate()

  const content = useField('content')
  const author = useField('author')
  const info = useField('info')


  const handleSubmit = (e) => {
    e.preventDefault()

    props.addNew({
      'content': content.value,
      'author': author.value,
      'info': info.value,
      votes: 0
    })
    navigate('/')
  }
  const handleReset = (e) => {
    e.preventDefault()
    content.resetValue()
    author.resetValue()
    info.resetValue()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          content
          <input name={content.name} value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input name={author.name} value={author.value} onChange={author.onChange} />
          {/* <input {...author} /> */}
        </div>
        <div>
          url for more info
          <input name={info.name} value={info.value} onChange={info.onChange} />
          {/* <input {...info} /> */}
        </div>
        <button type='submit'>create</button> <button type='reset'>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))

    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000);
  }

  // const anecdoteById = (id) =>
  //   anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }
  const padding = {
    paddingRight: 5
  }
  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(anecdot => anecdot.id === Number(match.params.id)) : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <div>
        <div>
          <Link style={padding} to='/'>anecdotes</Link>
          <Link style={padding} to='/creat'>create new</Link>
          <Link style={padding} to='/about'>about</Link>
          {notification === '' ? null : <p>{notification}</p>}
        </div>
        <Routes>
          <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote} />} />
          <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='/creat' element={<CreateNew addNew={addNew} />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
