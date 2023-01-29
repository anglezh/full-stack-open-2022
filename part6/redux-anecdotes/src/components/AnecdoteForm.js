import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { appendAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.appendAnecdote(content)
    props.setNotification(`you has create ${content}`, 2)
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
const mapDispatchToProps = {
  appendAnecdote,
  setNotification,

}
export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)