import React from 'react';
import StockRow from './StockRow'
import { connect } from 'react-redux'

const StockTable = (props) => {

    return(
      <table className="ui large celled striped padded table">
            <tbody>
              <tr className="center aligned">
                <th>
                  <h3 className="ui left aligned header">
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
                    Select
                  </h3>
                </th>
              </tr>

              {props.stocks.map(function(stockInfo, idx){
                return (stockInfo.name.toLowerCase().includes(props.currSearch.toLowerCase())
                      ||
                      stockInfo.ticker.toLowerCase().includes(props.currSearch.toLowerCase()))
                      &&
                      < StockRow key={idx} stockInfo={stockInfo} selectStock={props.selectStock}/>
              })}

            </tbody>
          </table>
    )

} /* End of class */

function mapStateToProps(state){
  return {
    currUser: state.currUser,
    stocks: state.stocks
  }
}

export default connect(mapStateToProps)(StockTable)
