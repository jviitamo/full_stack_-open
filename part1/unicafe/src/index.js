import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if (all === 0) {
    return (
      <div>
      <p>No feedback given</p>
      </div>
    )
  }
  
  return (
  <tbody>
    <table>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive" value={100*positive}/> 
    </table>
  </tbody>
  )
}

const StatisticLine = ({text, value}) => {
  return (
   
      <tr>
      <th>{text}</th> 
      <th>{value}</th>
      </tr>
    
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    setGood(good+1)
    setAll(all+1)
    setAverage((good+1-bad)/(all+1))
    setPositive((good+1)/(all+1))
  }
  
  const handleNeutral = () => {
    setNeutral(neutral+1)
    setAll(all+1)
    setPositive((good)/(all+1))
  }
  
  const handleBad = () => {
    setBad(bad+1)
    setAll(all+1)
    setAverage((good-1-bad)/(all+1))
    setPositive((good)/(all+1))
  }



  return (
    <div>
      <p>give feeback</p>
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>
      <p>stastistics</p>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));


