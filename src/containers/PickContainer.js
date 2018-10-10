import React, { Component } from 'react';

export default class PickContainer extends Component{



render(){
  return(
    <div>
      {this.props.stocks.map(stock => stock.name)}
    </div>
  )
}

}
