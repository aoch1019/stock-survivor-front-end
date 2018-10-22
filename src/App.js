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
import StockViewContainer from './containers/StockViewContainer/StockViewContainer'
import Profile from './containers/Profile/Profile'

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
    this.locateOrCreatePool()
    this.createInterval()
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  createInterval(){
    this.interval = setInterval(() => this.checkForMarketClose(), 1000)
  }

  async locateOrCreatePool(){
    const poolList = await fetch('http://localhost:3000/pools').then(res => res.json())
    const locatePool = poolList.find(pool => (pool.id === this.props.currPoolId))
    if(!locatePool){
      const start = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`
      fetch(`http://localhost:3000/pools`, {
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json'
                                },
                                method: 'POST',
                                body: JSON.stringify({
                                  start_date: start
                                })
                              })
    }
  }

  checkForMarketClose(){
    const marketClose = new Date(new Date().getFullYear(),
                           new Date().getMonth(),
                           new Date().getDate(),
                           16,
                           0,
                           0)
    if(new Date().getHours() === marketClose.getHours() &&
       new Date().getMinutes() === marketClose.getMinutes() &&
       new Date().getSeconds() === marketClose.getSeconds() &&
       new Date().getDay() !== 0 &&
       new Date().getDay() < 5){
      this.props.incrementDay(this.props.currDay + 1)
      this.updateEntryAliveStatus()
    }
  }

  async updateEntryAliveStatus(){
    const aliveEntriesForCurrPool = await fetch('http://localhost:3000/entries').then(res => res.json()).then(entries => entries.filter(entry => (!!entry.alive && entry.pool_id === this.props.currPoolId)))
    aliveEntriesForCurrPool.forEach(async (entry) => {
      const latestPickForEntry = await fetch('http://localhost:3000/picks').then(res => res.json()).then(picks => picks.filter(pick => pick.entry_id === entry.id))
                                       .then(entryPicks => {
                                         let currDayPick = entryPicks.find(pick => pick.day === this.props.currDay - 1)
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
          console.log(`${entry.user_id} is dead! ${getStockTicker} went down to ${getCurrPrice}`)
          this.updateEntryInAPI(entry)
        }
        else{
          console.log(`${entry.user_id} is still alive. ${getStockTicker} went up to ${getCurrPrice}`)
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
                            }).then(updatedEntry => {
                              let newList = this.props.aliveEntries.filter(currEntry => {
                                return currEntry.id !== entry.id
                                })
                              this.props.updateAliveEntries(newList)
                            })
  }

  // async updateEntryList(){
  //   // let entryArr = this.props.aliveEntries.slice()
  //   // let entryIndex = -1
  //   // entryArr.forEach((currEntry, idx) => {
  //   //   if(currEntry.id === entry.id){
  //   //     entryIndex = idx
  //   //   }
  //   // })
  //   // if(entryIndex > -1){
  //   //   entryArr.splice(entryIndex, 1)
  //   // }
  //   let allEntries = await fetch('http://localhost:3000/entries').then(res => res.json())
  //   let getAliveEntries = allEntries.filter(entry => entry.pool_id === this.props.currPoolId && !!entry.alive)
  //   this.props.updateAliveEntries(getAliveEntries)
  // }

  goToNextDay(){
    this.props.incrementDay(this.props.currDay + 1)
    this.updateEntryAliveStatus()
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
          <NavBar goToNextDay={() => this.goToNextDay()}/>
            {this.props.currUser !== null &&
              <h3>
                Hello {this.props.currUser.name}!
              </h3>
            }
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
              <Route
                exact path="/View-Stock"
                render={ (renderProps) => {
                  return (
                    < StockViewContainer />
                  )
                }}
              />
              <Route
                exact path="/Profile"
                render={ (renderProps) => {
                  return (
                    !!this.props.currProfile
                    ?
                    < Profile />
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
    currDay: state.currDay,
    currPoolId: state.currPoolId,
    currPoolEntries: state.currPoolEntries,
    aliveEntries: state.aliveEntries,
    currProfile: state.currProfile
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
    },
    incrementDay: (day) => {
      dispatch({type: 'CHANGE_DAY', payload: day})
    },
    updateAliveEntries: (entries) => {
      dispatch({type: 'UPDATE_ALIVE_ENTRIES', payload: entries})
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
