import React from 'react'

const RenderPeople = ({persons, filterPerson, deleteName}) => {
    const filteredPersons = persons.filter(person => person.name.toUpperCase().indexOf(filterPerson.toUpperCase()) >= 0)
    const people = filteredPersons.map(person => 
                    <li>
                     {person.name} {person.number}
                     <button onClick={() => deleteName(person.id)}>delete</button>
                    </li>
                   )
    return (
      <React.Fragment>  
      <ul>
      {people}   
      </ul>
      </React.Fragment>
    )
  }

  export default RenderPeople