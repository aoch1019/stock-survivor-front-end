import React from 'react';
import { connect } from 'react-redux'
import ViewPickInfo from './ViewPick-components/ViewPickInfo'

const ViewPickContainer = (props) => {

  return(
    <React.Fragment>
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
      </React.Fragment>
  )

}

function mapStateToProps(state){
  return {
    currPick: state.currPick,
    currPickedStock: state.currPickedStock
  }
}

export default connect(mapStateToProps)(ViewPickContainer)
