import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import "./index.css"


const App = ({original}) => {
  const [selected, setSelected] = useState(0)
  const [anecdotes, setAnecdotes] = useState(original)


  const handleRandom = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  const handleVote = () => {
    const copied = [...anecdotes]
    copied[selected].value = copied[selected].value+1
    setAnecdotes(copied)
  }

  return (
    <div>
      <div id="d">
      <div>{anecdotes[selected].text}</div>
       {anecdotes[selected].value}
      </div>
      <div className="x">
      <button onClick={handleRandom}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const original = [
  {
    text: 'If it hurts, do it more often',
    value: 0
  },
  {
    text: 'Adding manpower to a late software project makes it later!',
    value: 0
  },
  {
    text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    value: 0
  },
  {
    text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    value: 0
  },
  {
    text: 'Premature optimization is the root of all evil.',
    value: 0
  },
  {
    text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    value: 0
}
]


ReactDOM.render(
  <App original={original} />,
  document.getElementById('root')
)