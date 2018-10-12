import React from 'react';
import PoolTableRow from './PoolTableRow'
import { connect } from 'react-redux'

const PoolTable = (props) => {

    return(
      <table className="ui celled striped padded table">
          <tbody>
            <tr>
              <th>
                <h3 className="ui center aligned header">
                  User
                </h3>
              </th>
              <th>
                <h3 className="ui center aligned header">
                  Stock
                </h3>
              </th>
              <th>
                <h3 className="ui center aligned header">
                  Ticker
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

          {!!props.currPoolEntries && props.currPoolEntries.map((entry, idx) => {
            return < PoolTableRow key={idx} entry={entry} />
          })}

          </tbody>
        </table>
    )

} /* End of class */

function mapStateToProps(state){
  return {
    currPoolEntries: state.currPoolEntries
  }
}

export default connect(mapStateToProps)(PoolTable)
