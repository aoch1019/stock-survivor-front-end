import React, { Component } from 'react';
import MakePickContainer from './MakePickContainer/MakePickContainer'
import ViewPickContainer from './ViewPickContainer/ViewPickContainer'
import { connect } from 'react-redux'

class TodaysPickContainer extends Component {

  componentDidMount(){
    this.locateOrCreateEntry()
  }

  async locateOrCreateEntry(){
    const entryList = await fetch('http://localhost:3000/entries').then(res => res.json())
    const locateEntry = entryList.find(entry => (entry.pool_id === this.props.currPoolId && entry.user_id === this.props.currUser.id))

    if(!!locateEntry){
      this.props.changeEntry(locateEntry)
    }
    else{
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
    }
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

        {this.props.currPick === null
        ?
        < MakePickContainer />
        :
        < ViewPickContainer />
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
    currEntry: state.currEntry
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeEntry: (entry) => {
      dispatch({type: 'CHANGE_ENTRY', payload: entry})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodaysPickContainer)
