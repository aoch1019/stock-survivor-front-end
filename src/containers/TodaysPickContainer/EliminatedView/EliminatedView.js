import React from 'react';
import { NavLink } from 'react-router-dom';

const EliminatedView = (props) => {

  return(
    <div>
      You dead!
      <NavLink className="ui button"
               to="/View-Pool">
               View Pool</NavLink>
    </div>
  )

}

export default EliminatedView
