import React, { Component } from 'react';
import MakePickContainer from './MakePickContainer'
import { connect } from 'react-redux'

export default class TodaysPickContainer extends Component{
  state = {
    pickMade: false
  }


render(){
  return(
    <div>
      {!this.state.pickMade
    ?
      < MakePickContainer />
    :
    null}
    </div>
  )
}

}
