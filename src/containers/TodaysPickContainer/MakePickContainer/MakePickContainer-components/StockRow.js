import React from 'react';

const StockRow = (props) => {

  return(
    <tr>
      <th> {props.stockInfo.name} </th>
      <th> {props.stockInfo.ticker} </th>
      <th> {props.stockInfo.industry} </th>
      <th> {props.stockInfo.closing_price} </th>
      <th> <button className="tiny ui button" onClick={() => props.selectStock(props.stockInfo)} >Make Pick</button></th>
    </tr>
  )

}

export default StockRow
