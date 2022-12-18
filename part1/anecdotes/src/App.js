
import { useState } from "react";
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  var [selected, setSelected] = useState(0)
  var [votes, setVotes] = useState([])
  const votesCount = votes[selected] === undefined ? 0 : votes[selected]

  const voteClick = (index) => {
    var points
    if (votes.length === 0) {
      points = [0, 0, 0, 0, 0, 0, 0]
    } else {
      points = votes
    }
    const copy = [...points]
    copy[index] += 1
    setVotes(votes = copy)
  }
  const nextSelected = () => {
    setSelected(selected = getRandomInt(7))
  }
  const mostVotes = () => {
    if (votes.length === 0) return
    const max = Math.max(...votes)
    const index = votes.indexOf(max)
    console.log(anecdotes[index])
    return anecdotes[index]
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votesCount} votes</p>
      <button onClick={() => voteClick(selected)}>vote</button>
      <button onClick={() => { nextSelected() }}>next anecdote</button>
      <h1>Anecodte with most votes</h1>
      <p>{mostVotes()}</p>
    </div>
  );
}

export default App;
