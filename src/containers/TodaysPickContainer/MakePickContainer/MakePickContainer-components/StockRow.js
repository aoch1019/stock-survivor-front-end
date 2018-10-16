import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const StockRow = (props) => {

  return(
    <tr>
      <th> <Link to="/View-Stock" onClick={() => props.changeStockToView(props.stockInfo.ticker)}>{props.stockInfo.name}</Link></th>
      <th> {props.stockInfo.ticker} </th>
      <th> {props.stockInfo.industry} </th>
      <th> {props.stockInfo.closing_price} </th>
      <th> <button className="tiny ui button" onClick={() => props.selectStock(props.stockInfo)} >Make Pick</button></th>
    </tr>
  )

}

function mapDispatchToProps(dispatch){
  return {
    changeStockToView: (ticker) => {
      dispatch({type: 'CHANGE_STOCK_TO_VIEW', payload: ticker})
    }
  }
}

export default connect(null, mapDispatchToProps)(StockRow)
