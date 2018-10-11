import React from 'react';
import { connect } from 'react-redux'

const ViewPickContainer = (props) => {

  return(
    <div>Welcome to your Pick!
         You Picked {props.currPick.stock_id}
         <h1>Previous Close: {props.currPick.initial_price} </h1>
    </div>
  )

}

function mapStateToProps(state){
  return {
    currPick: state.currPick
  }
}

export default connect(mapStateToProps)(ViewPickContainer)
