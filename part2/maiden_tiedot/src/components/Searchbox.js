import React from 'react'

const Searchbox = ( {filter, handleFilter} ) => {
    return (
      <form>
        <input value={filter} onChange={handleFilter}/>
      </form>
    )
  }

  export default Searchbox