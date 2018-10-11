import React, { Component } from 'react';
import './App.css';
import TodaysPickContainer from './containers/TodaysPickContainer'
import LoginContainer from './containers/LoginContainer'

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      stocks: [],
      currUser: null
    }

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
  }


  async getStocks(){
    const stockList = await fetch('http://localhost:3000/stocks').then(res => res.json())
    this.setState({
      stocks: stockList
    })
  }

  componentDidMount(){
    this.getStocks()
  }

  handleLoginSubmit(value, event){
    event.preventDefault()
    this.setState({
      currUser: value
    }, () => console.log(this.state.currUser))
  }


render() {
  return (
    <React.Fragment>
      {this.state.currUser !== null &&
        <div>
          Logged in as {this.state.currUser} <button onClick={() => this.setState({ currUser: null })}>Logout</button>
        </div>
      }
      <div className="App">
        {this.state.currUser === null
        ?
        < LoginContainer handleLoginSubmit={this.handleLoginSubmit} />
        :
        < TodaysPickContainer stocks={this.state.stocks} />}
      </div>
    </React.Fragment>
  );
}


} /* End of class */

export default App;
