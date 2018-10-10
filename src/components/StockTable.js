import React from 'react';
import Stock from './Stock'

const StockTable = (props) => {

    return(
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
                    Current Price
                  </h3>
                </th>
              </tr>

              {props.stocks.map(function(stockInfo, idx){
                return (stockInfo.name.toLowerCase().includes(props.currSearch.toLowerCase())
                      ||
                      stockInfo.ticker.toLowerCase().includes(props.currSearch.toLowerCase()))
                      &&
                      < Stock key={idx} stockInfo={stockInfo} />
              })}

            </tbody>
          </table>
    )

}

export default StockTable
