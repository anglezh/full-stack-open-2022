import { useMutation } from '@apollo/client'
import { useEffect, useState } from 'react'
import { ALL_AUTHORS, FILTER_BOOKS, CREATE_BOOK } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook, result] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      console.log(error)
    },
    refetchQueries: [{ query: ALL_AUTHORS }],
    update: (cache, response) => {
      cache.updateQuery({ query: FILTER_BOOKS, variables: { genre: null } }, (data) => {
        return {
          allBooks: data.allBooks.concat(response.data.addBook)
        }
      })
    },

  })

  useEffect(() => {
    console.log(`addBook:${result}`)
    if (result.data) {
      props.setPage('books')
    }
  }, [result.data])// eslint-disable-line
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    const publishedInt = parseInt(published)
    createBook({ variables: { title, author, published: publishedInt, genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook