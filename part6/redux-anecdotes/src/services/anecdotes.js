import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const getId = () => (100000 * Math.random()).toFixed(0)

const createAnecdotes = async (content) => {
  const newAnecdote = { content, votes: 0, id: getId() }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const updateVoteOf = (newAnecdoteOfVote) => {
  //1.根据id找到anecdote

  axios.put(`${baseUrl}/${newAnecdoteOfVote.id}`, newAnecdoteOfVote)
}

export default { getAll, createAnecdotes, updateVoteOf }