import React, { Component } from 'react';
import { connect } from 'react-redux'

class ViewPickInfo extends Component {

  state = {
    currStockPrice: null
  }

  componentDidMount(){
    this.getCurrStockPrice()
    this.interval = setInterval(() => this.getCurrStockPrice(), 1000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  async getCurrStockPrice(){
    const stockQuote = await fetch(`https://api.iextrading.com/1.0/stock/${this.props.currPickedStock.ticker}/book`).then(res => res.json())
    this.setState({
      currStockPrice: stockQuote.quote.extendedPrice
    })
  }

  calculateChange(){
    const percentChange = ((this.state.currStockPrice - this.props.currPick.initial_price)/this.props.currPick.initial_price) * 100
    const rounded = Math.round(percentChange * 100) / 100
    return rounded > 0 ? `+${rounded}` : rounded
  }

  render(){
    return(
      <tr>
        <th> {this.props.currPickedStock.name} </th>
        <th> {this.props.currPickedStock.ticker} </th>
        <th> {this.props.currPickedStock.industry} </th>
        <th> {this.props.currPick.initial_price} </th>
        <th> {this.state.currStockPrice} </th>
        <th> {this.calculateChange()} </th>
      </tr>
    )
  }

}

function mapStateToProps(state){
  return {
    currPick: state.currPick,
    currPickedStock: state.currPickedStock
  }
}

export default connect(mapStateToProps)(ViewPickInfo)
