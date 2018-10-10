import React from 'react';

const SubmitField = (props) => {

  return(
    <div>
      Would you like to submit {props.currSelection.name}?
      <button onClick={props.handleYesClick}>Yes</button>
      <button onClick={props.handleNoClick}>No</button>
    </div>
  )

}

export default SubmitField
