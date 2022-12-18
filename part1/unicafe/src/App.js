import { useState } from 'react';
function Button({ onClick, text }) {
  return (
    <button onClick={onClick}>{text}</button>
  )
}
function Statistics(props) {
  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <table>
        <tbody>
          <tr>
            <td>good</td>
            <td>{props.good}</td>
          </tr>
          <tr>
            <td>neutral</td>
            <td>{props.neutral}</td>
          </tr>
          <tr>
            <td>bad</td>
            <td>{props.bad}</td>
          </tr>
          <tr>
            <td>all</td>
            <td>{props.all}</td>
          </tr>
          <tr>
            <td>average</td>
            <td>{props.average}</td>
          </tr>
          <tr>
            <td>positive</td>
            <td>{props.positive + '%'}</td>
          </tr>
        </tbody>
      </table>
      // {/* <StatisticLine text={'good'} value={props.good} />
      // <StatisticLine text={'neutral'} value={props.neutral} />
      // <StatisticLine text={'bad'} value={props.bad} /> */}
      // <StatisticLine text={'all'} value={props.all} />
      // <StatisticLine text={'average'} value={props.average} />
      // <StatisticLine text={'positive'} value={props.positive + '%'} />

    )
  }

}

function StatisticLine({ text, value }) {

  return (
    <div>{text}   {value}</div>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = ((good - bad) / all).toFixed(1)
  const positive = (good / all * 100).toFixed(1)
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => { setGood(good + 1) }} text='good' />
      <Button onClick={() => { setNeutral(neutral + 1) }} text='neutral' />
      <Button onClick={() => { setBad(bad + 1) }} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive} />
    </div>
  )
}

export default App;
