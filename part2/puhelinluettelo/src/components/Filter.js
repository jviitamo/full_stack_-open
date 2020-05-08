import React from 'react'

const Filter = ( {filterPerson, handleFilterName} ) => {
    return (
      <div>filter shown with <input value={filterPerson} onChange={handleFilterName}/></div>
    )
  }

  export default Filter