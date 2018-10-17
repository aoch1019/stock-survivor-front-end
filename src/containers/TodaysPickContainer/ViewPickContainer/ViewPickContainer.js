import React, { Component } from 'react';
import { connect } from 'react-redux'
import ViewPickInfo from './ViewPick-components/ViewPickInfo'
import Timer from './ViewPick-components/Timer'
import StockChart from '../../../containers/StockViewContainer/StockView-components/StockChart'

class ViewPickContainer extends Component {

  componentDidMount(){
    this.props.changeStockToView(this.props.currPickedStock.ticker)
  }

  deleteAndChangePick(){
    fetch(`http://localhost:3000/picks/${this.props.currPick.id}`, {
      method: 'DELETE',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
     this.props.changePick(null);
  }

  deleteAndChangeEntry(){
    if(this.props.currDay === 1){
      debugger
      fetch(`http://localhost:3000/entries/${this.props.currEntry.id}`, {
        method: 'DELETE',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      this.props.changeEntry(null)
    }
  }

  validTimeToChangePick(){
    let marketOpen = new Date(new Date().getFullYear(),
                           new Date().getMonth(),
                           new Date().getDate(),
                           9,
                           30,
                           0)

    let marketClose = new Date(new Date().getFullYear(),
                           new Date().getMonth(),
                           new Date().getDate(),
                           16,
                           0,
                           0)

    if(new Date() - marketOpen < 0 || new Date() - marketClose > 0 || new Date().getDay() === 0 || new Date().getDay() >= 5){
      return true
    }
    else{
      return false
    }
  }

  render(){
    return(
      <React.Fragment>
        < Timer />
        <h1>Welcome to your pick!</h1>
        <table className="ui celled striped padded table">
            <tbody>
              <tr>
                <th>
                  <h3 className="ui center aligned header">
                    Name
                  </h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">
                    Ticker
                  </h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">
                    Industry
                  </h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">
                    Last Closing Price
                  </h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">
                    Current Price
                  </h3>
                </th>
                <th>
                  <h3 className="ui center aligned header">
                    % Change
                  </h3>
                </th>
              </tr>

              < ViewPickInfo />

            </tbody>
          </table>
          {!!this.validTimeToChangePick() &&
          <button className="ui button" onClick={() => {this.deleteAndChangePick(); this.deleteAndChangeEntry()}}>Change Pick</button>
          }

        < StockChart timeframe='1d'/>

        </React.Fragment>
    )
  }
}

function mapStateToProps(state){
  return {
    currPick: state.currPick,
    currPickedStock: state.currPickedStock,
    currDay: state.currDay,
    currEntry: state.currEntry
  }
}

function mapDispatchToProps(dispatch){
  return {
    changePick: (pick) => {
      dispatch({type: 'MAKE_STOCK_PICK', payload: pick})
    },
    changeEntry: (entry) => {
      dispatch({type: 'CHANGE_ENTRY', payload: entry})
    },
    changeStockToView: (ticker) => {
      dispatch({type: 'CHANGE_STOCK_TO_VIEW', payload: ticker})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPickContainer)
