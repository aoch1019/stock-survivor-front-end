import React, { Component } from 'react';
import StockTable from '../components/StockTable'
import Search from '../components/Search'

export default class MakePickContainer extends Component{
  constructor(props){
    super(props)

    this.state = {
      currSearch: "",
      currSelection: null
    }

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
    this.selectStock = this.selectStock.bind(this)
  }

  selectStock(stockInfo){
    this.setState({
      currSelection: stockInfo
    }, () => console.log(this.state.currSelection))
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
        < StockTable stocks={this.props.stocks} currSearch={this.state.currSearch} selectStock={this.selectStock}/>
      </React.Fragment>
    )
  }

}
