import { useEffect, useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

import { ALL_AUTHORS } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  console.log('App.js -> App')
  const [token, setToken] = useState(null)
  const [error, setError] = useState(null)
  const [page, setPage] = useState('authors')
  const authors = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  const logout = (e) => {
    e.preventDefault()
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }
  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
    if (token !== null) {
      setPage('authors')
    }
  }, [token])

  if (authors.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Notify errorMessage={error} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token === null ? <button onClick={() => setPage('login')}>login</button> : <em><button onClick={() => setPage('add')}>add book</button> <button onClick={() => setPage('recommend')}>recommend</button> <button onClick={logout}>logout</button></em>
        }
      </div>
      <Authors show={page === 'authors'} authors={authors.data.allAuthors} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setPage={setPage} />

      <LoginForm show={page === 'login'} setToken={setToken} setError={setError} />

      <Recommend show={page === 'recommend'} />

    </div>
  )
}

export default App
