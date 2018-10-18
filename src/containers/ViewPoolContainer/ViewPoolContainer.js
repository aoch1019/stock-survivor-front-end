import React, { Component } from 'react';
import PoolTable from './ViewPool-components/PoolTable'
import { connect } from 'react-redux'
import Timer from '../TodaysPickContainer/ViewPickContainer/ViewPick-components/Timer'
import { Message, Grid } from 'semantic-ui-react'

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
        <br></br>
        <Grid divided='vertically'>
          <Grid.Row columns={3}>
            <Grid.Column>
                <h3>{!!this.props.currDay && `Day ${this.props.currDay}`}</h3>
            </Grid.Column>
            <Grid.Column>
                < Timer />
            </Grid.Column>
            <Grid.Column>
                <h3>{!!this.props.currPoolEntries && `${this.entriesStillAlive()} of ${this.props.currPoolEntries.length} entries left`}</h3>
            </Grid.Column>
          </Grid.Row>
        </Grid>

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
    currPoolEntries: state.currPoolEntries,
    currDay: state.currDay
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
