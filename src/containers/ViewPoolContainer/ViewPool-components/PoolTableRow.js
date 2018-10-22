import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react';
import { withRouter } from 'react-router';

class PoolTableRow extends Component {

  state = {
    user: null,
    pick: null,
    stock: null,
    currStockPrice: null,
    updated: false,
    entriesLeft: this.props.aliveEntries.length
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
      currStockPrice: currPrice,
      entriesLeft: this.props.aliveEntries.length
    })
    if(!!currPrice){
      this.createInterval()
    }
  }

  async updateRow(){
    const user = await this.getUserFromEntry()
    const pick = await this.getPickFromEntry()
    const stock = await this.getStockFromPick(pick)
    const currPrice = await this.getCurrStockPrice(stock)
    this.setState({
      user: user,
      pick: pick,
      stock: stock,
      currStockPrice: currPrice,
      entriesLeft: this.props.aliveEntries.length
    })
  }

  componentDidUpdate(prevProps){
    if(this.state.entriesLeft !== this.props.aliveEntries.length){
      this.updateRow()
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
      this.setState((prevstate) => {
        return {currStockPrice: stockQuote.quote.extendedPrice,
                updated: true}
      }, () => {setTimeout(() => this.setState({ updated: false }), 150)
      })
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
          <Table.Row>
            <Table.Cell> <Link to="/Profile" onClick={() => this.props.changeProfile(this.state.user)}>{this.state.user.name}</Link></Table.Cell>
            <Table.Cell> <Link to="/View-Stock" onClick={() => this.props.changeStockToView(this.state.stock.ticker)}>{this.state.stock.name}</Link></Table.Cell>
            <Table.Cell> {this.state.stock.ticker} </Table.Cell>
            <Table.Cell> {this.state.pick.initial_price} </Table.Cell>
            <Table.Cell active={this.state.updated}> {this.state.currStockPrice} </Table.Cell>
            <Table.Cell positive={this.calculateChange()[0] === '+'} negative={this.calculateChange()[0] !== '+'}> {this.calculateChange()} </Table.Cell>
          </Table.Row>
          :
          !!this.state.user &&
          <Table.Row>
            <Table.Cell> {this.state.user.name} </Table.Cell>
            <Table.Cell> TBD </Table.Cell>
            <Table.Cell> TBD </Table.Cell>
            <Table.Cell> TBD </Table.Cell>
            <Table.Cell> TBD </Table.Cell>
            <Table.Cell> TBD </Table.Cell>
          </Table.Row>
        }
        </React.Fragment>
    )
  }

}

function mapStateToProps(state){
  return {
    currDay: state.currDay,
    aliveEntries: state.aliveEntries
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeStockToView: (ticker) => {
      dispatch({type: 'CHANGE_STOCK_TO_VIEW', payload: ticker})
    },
    changeProfile: (user) => {
      dispatch({type: 'CHANGE_PROFILE', payload: user})
    }    
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PoolTableRow))
