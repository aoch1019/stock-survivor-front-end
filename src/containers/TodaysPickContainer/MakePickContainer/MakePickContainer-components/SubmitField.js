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

  async createEntryAndPick(){
    const entryObj = await fetch(`http://localhost:3000/entries`, {
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                              method: 'POST',
                              body: JSON.stringify({
                                alive: true,
                                pool_id: this.props.currPoolId,
                                user_id: this.props.currUser.id
                              })
                            }).then(res => res.json())
      this.props.changeEntry(entryObj)
      this.createPick()
  }

  render(){
    return(
      <div>
        Would you like to submit {this.props.currStockSelection.name}?
        <button onClick={() => this.createEntryAndPick()}>Yes</button>
        <button onClick={this.props.handleNoClick}>No</button>
      </div>
    )
  }

} /* End of class */

function mapStateToProps(state){
  return {
    currEntry: state.currEntry,
    currDay: state.currDay,
    currPoolId: state.currPoolId,
    currUser: state.currUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    makeStockPick: (pick) => {
      dispatch({type: 'MAKE_STOCK_PICK', payload: pick})
    },
    changeStock: (stock) => {
      dispatch({type: 'CHANGE_STOCK', payload: stock})
    },
    changeEntry: (entry) => {
      dispatch({type: 'CHANGE_ENTRY', payload: entry})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitField)
