import React, { Component } from 'react';
import { connect } from 'react-redux'

class SubmitField extends Component{

  render(){
    return(
      <div>
        Would you like to submit {this.props.currSelection.name}?
        <button onClick={() => this.props.makeStockPick(this.props.currSelection)}>Yes</button>
        <button onClick={this.props.handleNoClick}>No</button>
      </div>
    )
  }

} /* End of class */

function mapDispatchToProps(dispatch){
  return {
    makeStockPick: (stock) => {
      dispatch({type: 'MAKE_STOCK_PICK', payload: stock})
    }
  }
}

export default connect(null, mapDispatchToProps)(SubmitField)
