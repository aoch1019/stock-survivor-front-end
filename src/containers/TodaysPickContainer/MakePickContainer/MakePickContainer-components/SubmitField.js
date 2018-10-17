import React, { Component } from 'react';
import { connect } from 'react-redux'

class SubmitField extends Component{

  async createPick(entry, newEntry){
    const pickObj = await fetch(`http://localhost:3000/picks`, {
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                              method: 'POST',
                              body: JSON.stringify({
                                initial_price: this.props.currStockSelection.closing_price,
                                day: this.props.currDay,
                                entry_id: entry.id,
                                stock_id: this.props.currStockSelection.id
                              })
                            }).then(res => res.json())
      this.props.changeStock(this.props.currStockSelection)
      this.props.makeStockPick(pickObj)
      if(!!newEntry){
        this.props.changeEntry(entry)
      }
  }

  async createEntryAndPick(){
    if(this.props.currDay === 1){
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
        this.createPick(entryObj, true)
      }
      else{
        let isRepeat = await this.checkForRepeat()
        if(!!isRepeat){
          alert(`You already picked ${this.props.currStockSelection.name}! Please pick again.`)
        }
        else{
          this.createPick(this.props.currEntry, false)
        }
      }
  }

  async checkForRepeat(){
    let status = false
    const pickList = await fetch(`http://localhost:3000/picks`).then(res => res.json())
    pickList.forEach(pick => {
      console.log(this.props.currEntry.id)
      console.log(this.props.currStockSelection.id)
      if(pick.entry_id === this.props.currEntry.id && pick.stock_id === this.props.currStockSelection.id){
        status = true
      }
    })
    return status
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
