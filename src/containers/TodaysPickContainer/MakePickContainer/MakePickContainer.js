import React, { Component } from 'react';
import StockTable from './MakePickContainer-components/StockTable'
import Search from './MakePickContainer-components/Search'
import SubmitField from './MakePickContainer-components/SubmitField'

export default class MakePickContainer extends Component{
  constructor(props){
    super(props)

    this.state = {
      currSearch: "",
      currStockSelection: null
    }

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this)
    this.selectStock = this.selectStock.bind(this)
    this.handleNoClick = this.handleNoClick.bind(this)
  }

  selectStock(stockInfo){
    this.setState({
      currStockSelection: stockInfo
    })
  }

  handleSearchInputChange(event){
    this.setState({
      currSearch: event.target.value
    })
  }

  handleNoClick(){
    this.setState({
      currStockSelection: null
    })
  }

  render(){
    return(
      <React.Fragment>
        < Search handleSearchInputChange={this.handleSearchInputChange} />
      {
        this.state.currStockSelection !== null
        &&
        < SubmitField currStockSelection={this.state.currStockSelection} handleNoClick={this.handleNoClick}/>
      }
        < StockTable currSearch={this.state.currSearch} selectStock={this.selectStock} />
      </React.Fragment>
    )
  }

}
