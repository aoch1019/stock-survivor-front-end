import React, { Component } from 'react';
import MakePickContainer from './MakePickContainer/MakePickContainer'
import ViewPickContainer from './ViewPickContainer/ViewPickContainer'
import EliminatedView from './EliminatedView/EliminatedView'
import { connect } from 'react-redux'

class TodaysPickContainer extends Component {

  componentDidMount(){
    this.locateEntry()
  }

  async locateEntry(){
    const entryList = await fetch('http://localhost:3000/entries').then(res => res.json())
    const locateEntry = entryList.find(entry => (entry.pool_id === this.props.currPoolId && entry.user_id === this.props.currUser.id))

    if(!!locateEntry){
      this.locatePick(locateEntry)
    }
  }

  async locatePick(entry){
    const pickList = await fetch('http://localhost:3000/picks').then(res => res.json())
    const locatePick = pickList.find(pick => (pick.day === this.props.currDay && pick.entry_id === entry.id))

    if(!!locatePick){
      this.locateCurrStockFromIdAndChangePickAndEntry(locatePick, entry)
    }
    else if(this.props.currDay > 1){
      this.props.changeEntry(entry)
    }
  }

  async locateCurrStockFromIdAndChangePickAndEntry(pick, entry){
    const currStock = await fetch(`http://localhost:3000/stocks/${pick.stock_id}`).then(res => res.json())
    this.props.changeStock(currStock)
    this.props.changePick(pick)
    this.props.changeEntry(entry)
  }

  render(){
    return(
      <div>
        {!!this.props.currEntry
          &&
        <React.Fragment>
          <p>Entry details -- user id: {this.props.currEntry.user_id} pool id: {this.props.currEntry.pool_id}</p>
          <p>{this.props.currEntry.alive && "Still alive!"}</p>
        </React.Fragment>}

        {!!this.props.currEntry
          ?
            !!this.props.currEntry.alive
            ?
              !!this.props.currPick && this.props.currPick.day === this.props.currDay
              ?
              < ViewPickContainer />
              :
              < MakePickContainer />
            :
            < EliminatedView />

          :
            this.props.currDay === 1
            ?
            < MakePickContainer />
            :
            <div>Pool already started!</div>
        }
      </div>
    )
  }
} /* End of class */


function mapStateToProps(state){
  return {
    currPick: state.currPick,
    currUser: state.currUser,
    currPoolId: state.currPoolId,
    currEntry: state.currEntry,
    currDay: state.currDay,
    currPickedStock: state.currPickedStock
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeEntry: (entry) => {
      dispatch({type: 'CHANGE_ENTRY', payload: entry})
    },
    changePick: (pick) => {
      dispatch({type: 'MAKE_STOCK_PICK', payload: pick})
    },
    changeStock: (stock) => {
      dispatch({type: 'CHANGE_STOCK', payload: stock})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodaysPickContainer)
