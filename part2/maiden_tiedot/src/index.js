import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import Searchbox from './components/Searchbox'
import Infobox from './components/Infobox'



const App = () => {

const [countries, setCountries] = useState([])
const [filter, setFilter] = useState('')

useEffect(() => {
    
  const eventHandler = response => {
    console.log(response.data)
    setCountries(response.data)
  }
  const promise = axios.get('https://restcountries.eu/rest/v2/all')
  promise.then(eventHandler)
}, [])

const handleFilter = (event) => {
  setFilter(event.target.value)
}


  return (
    <div>
      <p>search for countries</p>
      <Searchbox filter={filter} handleFilter={handleFilter}/>
      <Infobox countries={countries} filter={filter} />
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


