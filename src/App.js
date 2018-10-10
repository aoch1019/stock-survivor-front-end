import React, { Component } from 'react';
import './App.css';
import PickContainer from './containers/PickContainer'

class App extends Component {
  state = {
    stocks: []
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


render() {
  return (
    <div className="App">
      < PickContainer stocks={this.state.stocks} />
    </div>
  );
}


} /* End of class */

export default App;
