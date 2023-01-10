import { createSlice } from '@reduxjs/toolkit'
const anecdotesAtStart = [
  // anecdotes: [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  // ]
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// export const voteToggleOf = (id) => {
//   return {
//     type: 'VOTE_TOGGLE',
//     data: { id }
//   }
// }

// export const createAnecdot = (anecdote) => {
//   return {
//     type: 'ADD_ANECDOTE',
//     data: {
//       content: anecdote,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)
//   switch (action.type) {
//     case 'VOTE_TOGGLE':
//       const id = action.data.id
//       const voteToAnecode = state.find(a => a.id === id)
//       const changeAnecdote = { ...voteToAnecode, votes: voteToAnecode.votes + 1 }
//       return state.map(anecdote => anecdote.id === id ? changeAnecdote : anecdote)
//     case 'ADD_ANECDOTE':
//       return [...state, action.data]
//     default:
//       break;
//   }
//   return state
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdot(state, action) {
      // state = [...state, action.payload]
      // return state
      const content = action.payload
      state.push(
        {
          content,
          id: getId(),
          votes: 0
        }
      )
    },
    voteToggleOf(state, action) {
      const id = action.payload
      const voteToAnecode = state.find(a => a.id === id)
      const changeAnecdote = { ...voteToAnecode, votes: voteToAnecode.votes + 1 }
      return state.map(anecdote => anecdote.id === id ? changeAnecdote : anecdote)
    }
  }
})

export const { createAnecdot, voteToggleOf } = anecdoteSlice.actions
export default anecdoteSlice.reducer