import React from 'react';
import PoolTableRow from './PoolTableRow'
import { connect } from 'react-redux'

const PoolTable = (props) => {

    return(
      <table className="ui large celled striped padded table">
          <tbody>
            <tr class="center aligned">
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
            if(!!entry.alive){
              return < PoolTableRow key={idx} entry={entry} />
            }
            else{
              return null
            }
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
