import { useDispatch } from "react-redux"
import { createAnecdot } from "../reducers/anecdoteReducer"
import { notificationChange } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    dispatch(createAnecdot(event.target.anecdote.value))

    dispatch(notificationChange(`you has create ${event.target.anecdote.value}`))
    setTimeout(() => {
      dispatch(notificationChange(null))
    }, 2000)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )

}
export default AnecdoteForm