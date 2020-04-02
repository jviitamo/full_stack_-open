import React from 'react'
import Country from './Country'
import Details from './details'

const Infobox = ( {countries, filter} ) => {
    console.log(filter)


    const filtered = countries.filter(country => country.name.toUpperCase().indexOf(filter.toUpperCase()) >= 0)

  if (filtered.length>10) return "give a more specific filter"
  else if (filtered.length>1)
   return (
    filtered.map(country => <Country country={country}/>)
   )
   else return filtered.map(country => <Details country={country}/>)
  }

export default Infobox
