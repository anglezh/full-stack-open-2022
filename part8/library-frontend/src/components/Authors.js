import { useMutation } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries"
import Select from 'react-select';


const Authors = (props) => {
  const [born, setBorn] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [editAuthor] = useMutation(UPDATE_AUTHOR, { refetchQueries: [{ query: ALL_AUTHORS }] })

  const options = []
  props.authors.forEach(element => {
    options.push({ value: element.name, label: element.name })
  });
  if (!props.show) {
    return null
  }
  const authors = props.authors

  const updateBorn = (event) => {
    event.preventDefault()
    const bornInt = parseInt(born)
    editAuthor({ variables: { name: selectedOption.value, setBornTo: bornInt } })

  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={updateBorn}>
        name
        <div>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
        </div>
        <div>
          born
          <input value={born} onChange={({ target }) => { setBorn(target.value) }} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>

  )
}

export default Authors
