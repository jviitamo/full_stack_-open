import React, { useState, useEffect } from 'react'
import peopleService from './services/people'


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


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filterPerson, setFilterPerson ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')

  useEffect(() => {
    peopleService
      .getAll()
        .then(initialPeople => {
          setPersons(initialPeople)
        })
      }, [])

  const addName = (event) => {

    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).includes(newName)) {
      let value = false
      value = window.confirm(`${newName} is already added in the phonebook, do you want to change the number?`)
      if (value) {
        const person = persons.find(x => x.name === newName)
        const changedPerson = { ...person, number: newNumber }
        peopleService
          .update(person.id, changedPerson)
          .then(returned => {
            setPersons(persons.map(person => person.name !== newName ? person : returned))
            setNewName('')
            setNewNumber('')
          })
        setErrorMessage(`A person called ${person.name} was updated`)
        setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
 }
} else {
     
    const x = persons.map(z => z.name)
    if (x.includes(newName)) {window.alert("name is already added to phonebook")}
    else if (newName === "" || newNumber === '') {window.alert('Fill the input')}
    else {

    peopleService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      setErrorMessage(`A person called ${person.name} was added`)
      setTimeout(() => {
      setErrorMessage(null)
      }, 5000)
    }
  }
} 

  const deleteName = id => {
    const person = persons.find(n => n.id === id)
    console.log(person)
    let result = window.confirm(`Delete ${person.name}?`)
    if (result) {
    peopleService
      .Delete(id)
      .then(() => {
        const excluded = persons.filter(person => person.id !== id)
        setPersons(excluded)
      })
      setErrorMessage(`A person called ${person.name} was deleted`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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

  const RenderPeople = () => {
    const filteredPersons = persons.filter(person => person.name.toUpperCase().indexOf(filterPerson.toUpperCase()) >= 0)
    const people = filteredPersons.map(person => 
                    <li>
                     {person.name} {person.number}
                     <button onClick={() => deleteName(person.id)}>delete</button>
                    </li>
                   )
    return (
      <ul>
      {people}   
      </ul>
    )
  }

  const errorStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 30,
    background: 'lightgray',
    width: '60%'
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div style={errorStyle}>{errorMessage}</div>
      <Filter handleFilterName={handleFilterName} filterPerson={filterPerson}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange}  newNumber={newNumber} handleNewNumber={handleNewNumber} deleteName={deleteName}/>
      <h2>Numbers</h2>
      <RenderPeople persons={persons} filterPerson={filterPerson}/>
    </div>
  )

}

export default App