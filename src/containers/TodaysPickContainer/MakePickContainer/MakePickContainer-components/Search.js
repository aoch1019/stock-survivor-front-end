import React from 'react'

const Search = (props) => {

   return (
     <form className="ui huge fluid icon input">
       <input
         type="text"
         placeholder="Search for..."
         onChange={props.handleSearchInputChange}
       />
        <i className="circular search link icon"></i>
     </form>
   )

}

export default Search
