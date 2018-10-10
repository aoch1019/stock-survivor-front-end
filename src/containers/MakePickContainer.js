import React, { Component } from 'react';
import StockTable from '../components/StockTable'
import Search from '../components/Search'

export default class MakePickContainer extends Component{
  constructor(props){
    super(props)

    this.state = {
      currSearch: ""
    }

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
  }


handleSearchInputChange(event){
  this.setState({
    currSearch: event.target.value
  })
}

render(){
  return(
    <React.Fragment>
      < Search handleSearchInputChange={this.handleSearchInputChange}/>
      < StockTable stocks={this.props.stocks} currSearch={this.state.currSearch}/>
    </React.Fragment>
  )
}

}
