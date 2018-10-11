import React, { Component } from 'react';
import './App.css';
import TodaysPickContainer from './containers/TodaysPickContainer'
import LoginContainer from './containers/LoginContainer'
import { connect } from 'react-redux'

class App extends Component {

  async getStocksFromAPI(){
    const stockList = await fetch('http://localhost:3000/stocks').then(res => res.json())
    this.props.getStocks(stockList)
  }

  componentDidMount(){
    this.getStocksFromAPI()
  }

render() {
  return (
    <React.Fragment>
      {this.props.currUser !== null &&
        <div>
          Logged in as {this.props.currUser} <button onClick={() => this.props.changeUser(null)}>Logout</button>
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
