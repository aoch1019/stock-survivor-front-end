import React, { Component } from 'react';
import MakePickContainer from './MakePickContainer'

export default class TodaysPickContainer extends Component{
  state = {
    pickMade: false
  }


render(){
  return(
    <div>
      {!this.state.pickMade
    ?
      < MakePickContainer stocks={this.props.stocks}/>
    :
    null}
    </div>
  )
}

}
