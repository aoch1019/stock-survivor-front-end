import React from 'react';
import StockRow from './StockRow'

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

}

export default StockTable
