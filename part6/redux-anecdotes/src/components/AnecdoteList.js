import { voteToggleOf } from "../reducers/anecdoteReducer"
import { useSelector, useDispatch } from "react-redux"
import { notificationChange, notificationHidden } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteToggleOf(id))
    dispatch(notificationChange(`you has voted ${content}`))
    setTimeout(() => {
      dispatch(notificationHidden())
    }, 2000)
  }

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === 'ALL') {
      const anecdotesSort = [...anecdotes].sort((a, b) => b.votes - a.votes)
      return anecdotesSort
    } else {
      const anecdotesSort = [...anecdotes].sort((a, b) => b.votes - a.votes)
      const filterAnecdotes = anecdotesSort.filter(anecdote => anecdote.content.includes(filter))
      return filterAnecdotes
    }
  })

  return (
    <div>
      {
        anecdotes.map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => vote(anecdote.id, anecdote.content)} />
        )
      }
    </div>
  )
}

export default AnecdoteList