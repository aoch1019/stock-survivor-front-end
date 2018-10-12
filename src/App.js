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
                    !!this.props.currUser
                    ?
                    < ViewPoolContainer />
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
    stocks: state.stocks
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
