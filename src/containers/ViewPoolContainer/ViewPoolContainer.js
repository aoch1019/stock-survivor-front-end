import React, { Component } from 'react';
import PoolTable from './ViewPool-components/PoolTable'
import { connect } from 'react-redux'

class ViewPoolContainer extends Component {

  componentDidMount(){
    this.getEntriesForPool()
  }

  async getEntriesForPool(){
    let allEntries = await fetch('http://localhost:3000/entries').then(res => res.json())
    let currPoolEntries = allEntries.filter(entry => entry.pool_id === this.props.currPoolId)
    this.props.setCurrPoolEntries(currPoolEntries)
  }

  render(){
    return(
      <div>
        < PoolTable />
      </div>
    )
  }

}


function mapStateToProps(state){
  return {
    currPoolId: state.currPoolId
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
