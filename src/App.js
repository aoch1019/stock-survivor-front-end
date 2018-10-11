import React, { Component } from 'react';
import './App.css';
import TodaysPickContainer from './containers/TodaysPickContainer/TodaysPickContainer'
import LoginContainer from './containers/LoginContainer/LoginContainer'
import { connect } from 'react-redux'

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

render() {
  return (
    <React.Fragment>
      {this.props.currUser !== null &&
        <div>
          Logged in as {this.props.currUser.name} <button onClick={() => this.props.changeUser(null)}>Logout</button>
        </div>
      }
      <div className="App">
        {this.props.currUser === null
        ?
        < LoginContainer handleLoginSubmit={this.handleLoginSubmit} />
        :
        < TodaysPickContainer />}
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
