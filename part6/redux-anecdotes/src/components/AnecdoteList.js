import { voteToggleUpdate } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

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

  const vote = (anecdote) => {
    const voteToAnecode = anecdotes.find(a => a.id === anecdote.id)
    const changeAnecdote = { ...voteToAnecode, votes: voteToAnecode.votes + 1 }
    dispatch(voteToggleUpdate(changeAnecdote))
    dispatch(setNotification(`you has voted ${anecdote.content}`, 2))
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
          <Anecdote key={anecdote.id} anecdote={anecdote} handleVote={() => vote(anecdote)} />
        )
      }
    </div>
  )
}

export default AnecdoteList