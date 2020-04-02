import React, { useState, useEffect } from 'react'
import axios from 'axios'

const RenderPeople = ({persons, filterPerson}) => {
  const filteredPersons = persons.filter(person => person.name.toUpperCase().indexOf(filterPerson.toUpperCase()) >= 0)
  const people = filteredPersons.map(person => <Name key={person.name} name={person.name} number={person.number}/>)
  return (
    <ul>
    {people}
    </ul>
  )
}

const Filter = ( {filterPerson, handleFilterName} ) => {
  return (
    <div>filter shown with <input value={filterPerson} onChange={handleFilterName}/></div>
  )
}

const PersonForm = ( {addName, newName, handleNameChange, newNumber, handleNewNumber} ) => {
  return (
<form onSubmit={addName}>
        <div> name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNewNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Name = ({name, number}) => {
  return (
 <li>{name} {number}</li>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filterPerson, setFilterPerson ] = useState('')

  useEffect(() => {
    
    const eventHandler = response => {
      console.log(response.data)
      setPersons(response.data)
    }
    const promise = axios.get('http://localhost:3001/persons')
    promise.then(eventHandler)
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
     
    const x = persons.map(z => z.name)
    if (x.includes(newName)) {window.alert("name is already added to phonebook")}
    else if (newName === "" || newNumber === '') {window.alert('Fill the input')}
    else {
    const newPersons = persons.concat(person)
    setPersons(newPersons)
    setNewName('')
    setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    setFilterPerson(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterName={handleFilterName} filterPerson={filterPerson}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}  newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <RenderPeople persons={persons} filterPerson={filterPerson}/>
    </div>
  )

}

export default App