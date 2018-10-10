import React, { Component } from 'react';

export default class Stock extends Component{
  state = {
    currPrice: null
  }

  componentDidMount(){
    this.getPrice()
  }

  async getPrice(){
    const stockQuote = await fetch(`https://api.iextrading.com/1.0/stock/${this.props.stockInfo.ticker}/book`).then(res => res.json())
    this.setState({
      currPrice: stockQuote.quote.extendedPrice
    })
  }

  render(){
    return(
      <tr>
        <th> {this.props.stockInfo.name} </th>
        <th> {this.props.stockInfo.ticker} </th>
        <th> {this.props.stockInfo.industry} </th>
        <th> {this.state.currPrice} </th>
      </tr>
    )
  }

}
