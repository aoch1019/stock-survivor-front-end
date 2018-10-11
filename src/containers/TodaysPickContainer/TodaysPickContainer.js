import React from 'react';
import MakePickContainer from './MakePickContainer/MakePickContainer'
import ViewPickContainer from './ViewPickContainer/ViewPickContainer'
import { connect } from 'react-redux'

const TodaysPickContainer = (props) => {

  return(
    <div>
      {props.currPick === null
      ?
      < MakePickContainer />
      :
      < ViewPickContainer />
      }
    </div>
  )

} /* End of class */


function mapStateToProps(state){
  return {
    currPick: state.currPick
  }
}

export default connect(mapStateToProps)(TodaysPickContainer)
