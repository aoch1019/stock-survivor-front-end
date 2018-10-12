import React, { Component } from 'react';
import { connect } from 'react-redux'

class SubmitField extends Component{

  async createPick(){
    const pickObj = await fetch(`http://localhost:3000/picks`, {
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                              method: 'POST',
                              body: JSON.stringify({
                                initial_price: this.props.currStockSelection.closing_price,
                                day: this.props.currDay,
                                entry_id: this.props.currEntry.id,
                                stock_id: this.props.currStockSelection.id
                              })
                            }).then(res => res.json())
      this.props.changeStock(this.props.currStockSelection)
      this.props.makeStockPick(pickObj)
  }

  render(){
    return(
      <div>
        Would you like to submit {this.props.currStockSelection.name}?
        <button onClick={() => this.createPick()}>Yes</button>
        <button onClick={this.props.handleNoClick}>No</button>
      </div>
    )
  }

} /* End of class */

function mapStateToProps(state){
  return {
    currEntry: state.currEntry,
    currDay: state.currDay
  }
}

function mapDispatchToProps(dispatch){
  return {
    makeStockPick: (pick) => {
      dispatch({type: 'MAKE_STOCK_PICK', payload: pick})
    },
    changeStock: (stock) => {
      dispatch({type: 'CHANGE_STOCK', payload: stock})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitField)
