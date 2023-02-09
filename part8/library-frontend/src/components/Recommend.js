import { ME, FILTER_BOOKS } from '../queries'

import { useQuery } from "@apollo/client"
import { useEffect, useState } from 'react'

const Recommend = (props) => {
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState([])
  const result = useQuery(ME, {
    skip: !props.show
  })
  console.log(`props.show:${props.show}`)
  const filterBooks = useQuery(FILTER_BOOKS, {
    variables: { genre },
    skip: !genre
  })
  useEffect(() => {
    if (result.data) {
      if (result.data.me) {
        setGenre(result.data.me.favouriteGenre)
      }
    }
  }, [result.data])

  useEffect(() => {
    if (filterBooks.data) {
      setBooks(filterBooks.data.allBooks)
    }
  }, [filterBooks.data])

  if (!props.show) {
    return null
  }
  if (result.loading) {
    return (<div>loding...</div>)
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>book in your favorite genre <b>{genre}</b></p>
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
    </div>
  )
}
export default Recommend