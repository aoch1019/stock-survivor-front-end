import React, { Component } from 'react';
import PoolTable from './ViewPool-components/PoolTable'
import { connect } from 'react-redux'
import Timer from '../TodaysPickContainer/ViewPickContainer/ViewPick-components/Timer'

class ViewPoolContainer extends Component {

  componentDidMount(){
    this.getEntriesForPool()
  }

  async getEntriesForPool(){
    let allEntries = await fetch('http://localhost:3000/entries').then(res => res.json())
    let currPoolEntries = allEntries.filter(entry => entry.pool_id === this.props.currPoolId)
    this.props.setCurrPoolEntries(currPoolEntries)
  }

  entriesStillAlive(){
    return this.props.currPoolEntries.filter(entry => !!entry.alive).length
  }

  render(){
    return(
      <React.Fragment>
        {!!this.props.currPoolEntries && `${this.entriesStillAlive()} of ${this.props.currPoolEntries.length} entries left`}
        < Timer />
        <div>
          < PoolTable />
        </div>
      </React.Fragment>
    )
  }

}


function mapStateToProps(state){
  return {
    currPoolId: state.currPoolId,
    currPoolEntries: state.currPoolEntries
  }
}

function mapDispatchToProps(dispatch){
  return {
    setCurrPoolEntries: (entries) => {
      dispatch({type: 'CHANGE_POOL_ENTRIES', payload: entries})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPoolContainer)
