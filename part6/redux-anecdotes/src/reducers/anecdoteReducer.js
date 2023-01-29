import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdot(state, action) {
      state.push(action.payload)
    },
    voteToggleOf(state, action) {
      const changeAnecdote = action.payload
      return state.map(anecdote => anecdote.id === changeAnecdote.id ? changeAnecdote : anecdote)
    },
    setAnecdots(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdote = await anecdoteService.getAll()
    dispatch(setAnecdots(anecdote))
  }
}

export const appendAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createAnecdotes(content)
    dispatch(createAnecdot(anecdote))
  }
}

export const voteToggleUpdate = (changeAnecdote) => {
  return async dispatch => {
    const anecdote = await anecdoteService.updateVoteOf(changeAnecdote)
    console.log(anecdote)
    dispatch(voteToggleOf(changeAnecdote))
  }
}
export const { createAnecdot, voteToggleOf, appendAnecdots, setAnecdots } = anecdoteSlice.actions
export default anecdoteSlice.reducer