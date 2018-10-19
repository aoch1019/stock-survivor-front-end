import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react';

class ViewPickInfo extends Component {

  state = {
    currStockPrice: null,
    updated: false
  }

  componentDidMount(){
    this.getCurrStockPrice()
    this.interval = setInterval(() => this.getCurrStockPrice(), 2000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  async getCurrStockPrice(){
    const stockQuote = await fetch(`https://api.iextrading.com/1.0/stock/${this.props.currPickedStock.ticker}/book`).then(res => res.json())
    this.setState((prevstate) => {
      return {currStockPrice: stockQuote.quote.extendedPrice,
              updated: true}
    }, () => {setTimeout(() => this.setState({ updated: false }), 50)
    })
  }

  calculateChange(){
    const percentChange = ((this.state.currStockPrice - this.props.currPick.initial_price)/this.props.currPick.initial_price) * 100
    const rounded = Math.round(percentChange * 100) / 100
    return rounded > 0 ? `+${rounded}` : rounded
  }

  render(){
    return(
      <Table.Row>
        <Table.Cell> <Link to="/View-Stock" onClick={() => this.props.changeStockToView(this.props.currPickedStock.ticker)}>{this.props.currPickedStock.name}</Link></Table.Cell>
        <Table.Cell> {this.props.currPickedStock.ticker} </Table.Cell>
        <Table.Cell> {this.props.currPickedStock.industry} </Table.Cell>
        <Table.Cell> {this.props.currPick.initial_price} </Table.Cell>
        <Table.Cell active={this.state.updated}> {this.state.currStockPrice} </Table.Cell>
        <Table.Cell positive={this.calculateChange()[0] === '+'} negative={this.calculateChange()[0] !== '+'}> {this.calculateChange()} </Table.Cell>
      </Table.Row>
    )
  }

}

function mapStateToProps(state){
  return {
    currPick: state.currPick,
    currPickedStock: state.currPickedStock
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeStockToView: (ticker) => {
      dispatch({type: 'CHANGE_STOCK_TO_VIEW', payload: ticker})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPickInfo)
