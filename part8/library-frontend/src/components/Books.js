
import { FILTER_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState(null)
  const result = useQuery(FILTER_BOOKS, {
    variables: { genre }
  })
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {genre ? <p>in genre <b>{genre}</b></p> : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={({ target }) => setGenre('refactoring')}>refactoring</button>
      <button onClick={({ target }) => setGenre('agile')}>agile</button>
      <button onClick={({ target }) => setGenre('patterns')}>patterns</button>
      <button onClick={({ target }) => setGenre('design')}>design</button>
      <button onClick={({ target }) => setGenre('crime')}>crime</button>
      <button onClick={({ target }) => setGenre('classic')}>classic</button>
      <button onClick={({ target }) => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
