import React from 'react'


const details = ( {country} ) => {
    console.log(country.languages.map(country => country.name))

    return (
        <div>
         <b>{country.name}</b>
         <p>capital {country.capital}</p>
         <p>population: {country.population}</p>
         <p>languages</p>
        <ul>{country.languages.map(language => <li>{language.name}</li>)}</ul>
        <img src={country.flag} width="20%"/>
        </div>
    )
}

export default details
