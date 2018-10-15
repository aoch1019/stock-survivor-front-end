import React, { Component } from 'react';
import { connect } from 'react-redux'
import ViewPickInfo from './ViewPick-components/ViewPickInfo'
import Timer from './ViewPick-components/Timer'

class ViewPickContainer extends Component {

  deletePickFromAPI(){
    fetch(`http://localhost:3000/picks/${this.props.currPick.id}`, {
      method: 'DELETE',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  validTimeToChangePick(){
    let marketClose = new Date(new Date().getFullYear(),
                           new Date().getMonth(),
                           new Date().getDate(),
                           16,
                           0,
                           0)

    let marketOpen = new Date(new Date().getFullYear(),
                           new Date().getMonth(),
                           new Date().getDate(),
                           9,
                           30,
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
          <button className="ui button" onClick={() => {this.deletePickFromAPI(); this.props.changePick(null)}}>Change Pick</button>
          }
        </React.Fragment>
    )
  }
}

function mapStateToProps(state){
  return {
    currPick: state.currPick,
    currPickedStock: state.currPickedStock
  }
}

function mapDispatchToProps(dispatch){
  return {
    changePick: (pick) => {
      dispatch({type: 'MAKE_STOCK_PICK', payload: pick})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPickContainer)
