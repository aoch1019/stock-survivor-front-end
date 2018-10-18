import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class PoolTableRow extends Component {

  state = {
    user: null,
    pick: null,
    stock: null,
    currStockPrice: null
  }

  async componentDidMount(){
    const user = await this.getUserFromEntry()
    const pick = await this.getPickFromEntry()
    const stock = await this.getStockFromPick(pick)
    const currPrice = await this.getCurrStockPrice(stock)
    this.setState({
      user: user,
      pick: pick,
      stock: stock,
      currStockPrice: currPrice
    })
    if(!!currPrice){
      this.createInterval()
    }
  }

  createInterval(){
    this.interval = setInterval(() => this.updateStockPrice(this.state.stock), 2000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  async getUserFromEntry(){
    const getUser = await fetch(`http://localhost:3000/users/${this.props.entry.user_id}`).then(res => res.json())
    return getUser
  }

  async getPickFromEntry(){
    const allPicks = await fetch(`http://localhost:3000/picks/`).then(res => res.json())
    const getPick = allPicks.find(pick => {
      return this.props.entry.id === pick.entry_id && pick.day === this.props.currDay
    })
    return getPick
  }

  async getStockFromPick(pick){
    if(!!pick){
      const getStock = await fetch(`http://localhost:3000/stocks/${pick.stock_id}`).then(res => res.json())
      return getStock
    }
    return null
  }

  async getCurrStockPrice(stock){
    if(!!stock){
      const stockQuote = await fetch(`https://api.iextrading.com/1.0/stock/${stock.ticker}/book`).then(res => res.json())
      return stockQuote.quote.extendedPrice
    }
    return null
  }

  async updateStockPrice(stock){
    if(!!stock){
      const stockQuote = await fetch(`https://api.iextrading.com/1.0/stock/${stock.ticker}/book`).then(res => res.json())
      this.setState({
        currStockPrice: stockQuote.quote.extendedPrice
      }, () => console.log(`Updated ${this.state.stock.name}!`))
    }
    return null
  }

  calculateChange(){
    const percentChange = ((this.state.currStockPrice - this.state.pick.initial_price)/this.state.pick.initial_price) * 100
    const rounded = Math.round(percentChange * 100) / 100
    return rounded > 0 ? `+${rounded}` : rounded
  }

  render(){
    return(
      <React.Fragment>
        {!!this.state.pick && !!this.state.user && !!this.state.stock
          ?
          <tr class="center aligned">
            <th> {this.state.user.name} </th>
            <th> <Link to="/View-Stock" onClick={() => this.props.changeStockToView(this.state.stock.ticker)}>{this.state.stock.name}</Link></th>
            <th> {this.state.stock.ticker} </th>
            <th> {this.state.pick.initial_price} </th>
            <th> {this.state.currStockPrice} </th>
            <td class={this.calculateChange()[0] === '+' ? 'positive' : 'negative'} > {this.calculateChange()} </td>
          </tr>
          :
          !!this.state.user &&
          <tr class="center aligned">
            <td> {this.state.user.name} </td>
            <td> TBD </td>
            <td> TBD </td>
            <td> TBD </td>
            <td> TBD </td>
            <td> TBD </td>
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

function mapDispatchToProps(dispatch){
  return {
    changeStockToView: (ticker) => {
      dispatch({type: 'CHANGE_STOCK_TO_VIEW', payload: ticker})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoolTableRow)
