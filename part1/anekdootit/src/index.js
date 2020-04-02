import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import "./index.css"


const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [anec, setAnec] = useState(anecdotes)


  const handleRandom = () => {
    setSelected(Math.floor(Math.random() * 6))
  }

  const handleVote = () => {
    const copy = [...anec]
    copy[selected].value = copy[selected].value+1
    setAnec(copy)
  }

  return (
    <div>
      <div id="d">
      <div>{anec[selected].text}</div>
       {anec[selected].value}
      </div>
      <div className="x">
      <button onClick={handleRandom}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const anecdotes = [
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
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)