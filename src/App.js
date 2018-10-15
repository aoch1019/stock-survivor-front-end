import React, { Component } from 'react';
import './App.css';
import TodaysPickContainer from './containers/TodaysPickContainer/TodaysPickContainer'
import LoginContainer from './containers/LoginContainer/LoginContainer'
import ViewPoolContainer from './containers/ViewPoolContainer/ViewPoolContainer'
import { connect } from 'react-redux'
import NavBar from './NavBar'
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
import Signup from './containers/LoginContainer/Login-Signup-components/Signup'

class App extends Component {

  async getStocksFromAPI(){
    const stockList = await fetch('http://localhost:3000/stocks').then(res => res.json())
    const stocksWithPrices = await Promise.all(stockList.map(async (stock) => {
      const stockQuote = await fetch(`https://api.iextrading.com/1.0/stock/${stock.ticker}/book`).then(res => res.json())
      return {...stock, closing_price: stockQuote.quote.close}
    }))
    this.props.getStocks(stocksWithPrices)
  }

  componentDidMount(){
    this.getStocksFromAPI()
    if(this.checkForMarketClose()){
      this.updateEntryAliveStatus()
    }
  }

  checkForMarketClose(){
    let marketClose = new Date(new Date().getFullYear(),
                           new Date().getMonth(),
                           new Date().getDate(),
                           16,
                           0,
                           0)
    return (new Date() === marketClose && new Date().getDay() !== 0 && new Date().getDay() < 5)
  }

  async updateEntryAliveStatus(){
    const aliveEntries = await fetch('http://localhost:3000/entries').then(res => res.json()).then(entries => entries.filter(entry => !!entry.alive))
    aliveEntries.forEach(async (entry) => {
      const latestPickForEntry = await fetch('http://localhost:3000/picks').then(res => res.json()).then(picks => picks.filter(pick => pick.entry_id === entry.id))
                                       .then(entryPicks => {
                                         let currDayPick = entryPicks.find(pick => pick.day === this.props.currDay)
                                         return currDayPick
                                       })
      if(!latestPickForEntry){
        this.updateEntryInAPI(entry)
      }
      else{
        const getStockTicker = await fetch(`http://localhost:3000/stocks/${latestPickForEntry.stock_id}`).then(res => res.json()).then(stock => stock.ticker)
        const getCurrPrice = await fetch(`https://api.iextrading.com/1.0/stock/${getStockTicker}/book`).then(res => res.json()).then(stockQuote => {
                                                                                                                                return stockQuote.quote.extendedPrice
                                                                                                                              })
        if(getCurrPrice <= latestPickForEntry.initial_price){
          this.updateEntryInAPI(entry)
        }
      }
    })
  }

  updateEntryInAPI(entry){
    fetch(`http://localhost:3000/entries/${entry.id}`, {
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                              method: 'PATCH',
                              body: JSON.stringify({
                                ...entry, alive: false
                              })
                            })
  }

  logout(){
    this.props.changeUser(null)
    this.props.changeEntry(null)
    this.props.makeStockPick(null)
    this.props.changeStock(null)
  }

  render() {
    return (
      <React.Fragment>
        {this.props.currUser !== null &&
          <div>
            Logged in as {this.props.currUser.name} <button onClick={() => this.logout()}>Logout</button>
          </div>
        }
        <div className="App">
          <NavBar />
            <div className="App-body">
              <Route
                exact path="/Login"
                render={ (renderProps) => {
                  return (
                    < LoginContainer />
                  )
                }}
              />
              <Route
                exact path="/Signup"
                render={ (renderProps) => {
                  return (
                    < Signup />
                  )
                }}
              />
              <Route
                exact path="/Todays-Pick"
                render={ (renderProps) => {
                  return (
                    !!this.props.currUser
                    ?
                    < TodaysPickContainer />
                    :
                    <React.Fragment>
                      <p>Please Login</p>
                      <NavLink className="ui button"
                               to="/Login">
                               Login</NavLink>
                    </React.Fragment>

                  )
                }}
              />
              <Route
                exact path="/View-Pool"
                render={ (renderProps) => {
                  return (
                    < ViewPoolContainer />
                  )
                }}
              />
            </div>
        </div>
      </React.Fragment>
    );
  }


} /* End of class */

function mapStateToProps(state){
  return {
    currUser: state.currUser,
    stocks: state.stocks,
    currDay: state.currDay
  }
}

function mapDispatchToProps(dispatch){
  return {
    getStocks: (stocks) => {
      dispatch({type: 'GET_STOCKS', payload: stocks})
    },
    changeUser: (username) => {
      dispatch({type: 'CHANGE_USER', payload: username})
    },
    changeEntry: (entry) => {
      dispatch({type: 'CHANGE_ENTRY', payload: entry})
    },
    makeStockPick: (pick) => {
      dispatch({type: 'MAKE_STOCK_PICK', payload: pick})
    },
    changeStock: (stock) => {
      dispatch({type: 'CHANGE_PICKED_STOCK', payload: stock})
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
