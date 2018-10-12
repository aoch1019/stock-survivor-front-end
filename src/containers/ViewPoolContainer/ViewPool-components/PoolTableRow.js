import React, { Component } from 'react';
import { connect } from 'react-redux'

class PoolTableRow extends Component {

  state = {
    user: null,
    pick: null,
    stock: null,
    currStockPrice: null
  }

  componentDidMount(){
    this.getUserFromEntry()
    this.getPickFromEntry()
  }

  createInterval(){
    this.interval = setInterval(() => this.getCurrStockPrice(), 3000)
  }

  componentWillUnmount(){
    !!this.interval && clearInterval(this.interval)
  }

  async getUserFromEntry(){
    const getUser = await fetch(`http://localhost:3000/users/${this.props.entry.user_id}`).then(res => res.json())
    this.setState({
      user: getUser
    })
  }

  async getPickFromEntry(){
    const allPicks = await fetch(`http://localhost:3000/picks/`).then(res => res.json())
    const getPick = allPicks.find(pick => {
      return this.props.entry.id === pick.entry_id && pick.day === this.props.currDay
    })
    this.setState({
      pick: getPick
    }, () => {!!this.state.pick && this.getStockFromPick()})
  }

  async getStockFromPick(){
    const getStock = await fetch(`http://localhost:3000/stocks/${this.state.pick.stock_id}`).then(res => res.json())
    this.setState({
      stock: getStock
    }, () => this.getCurrStockPrice())
  }

  async getCurrStockPrice(){
    const stockQuote = await fetch(`https://api.iextrading.com/1.0/stock/${this.state.stock.ticker}/book`).then(res => res.json())
    this.setState({
      currStockPrice: stockQuote.quote.extendedPrice
    }, () => this.createInterval())
  }

  calculateChange(){
    const percentChange = ((this.state.currStockPrice - this.state.pick.initial_price)/this.state.pick.initial_price) * 100
    const rounded = Math.round(percentChange * 100) / 100
    return rounded > 0 ? `+${rounded}` : rounded
  }

  render(){
    return(
      <React.Fragment>
        {!!this.state.pick && !!this.state.user && !!this.state.stock &&
          <tr>
            <th> {this.state.user.name} </th>
            <th> {this.state.stock.name} </th>
            <th> {this.state.stock.ticker} </th>
            <th> {this.state.pick.initial_price} </th>
            <th> {this.state.currStockPrice} </th>
            <th> {this.calculateChange()} </th>
          </tr>
        }
        </React.Fragment>
    )
  }

}

function mapStateToProps(state){
  return {
    currDay: state.currDay
  }
}

export default connect(mapStateToProps)(PoolTableRow)
