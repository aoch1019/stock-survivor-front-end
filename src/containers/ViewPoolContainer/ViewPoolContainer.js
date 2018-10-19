import React, { Component } from 'react';
import PoolTable from './ViewPool-components/PoolTable'
import { connect } from 'react-redux'
import Timer from '../TodaysPickContainer/ViewPickContainer/ViewPick-components/Timer'
import { Grid } from 'semantic-ui-react'

class ViewPoolContainer extends Component {

  state = {
    winner: null
  }

  componentDidMount(){
    this.getEntriesForPool()
  }

  async getEntriesForPool(){
    let allEntries = await fetch('http://localhost:3000/entries').then(res => res.json())
    let currPoolEntries = allEntries.filter(entry => entry.pool_id === this.props.currPoolId)
    this.props.setCurrPoolEntries(currPoolEntries)
    this.props.updateAliveEntries(this.entriesStillAlive(currPoolEntries))
    if(!!this.props.aliveEntries && this.props.aliveEntries.length === 1 && this.props.currDay > 1){
      this.getWinner()
    }
  }

  entriesStillAlive(currPoolEntries){
    return currPoolEntries.filter(entry => !!entry.alive)
  }

  getWinner(){
    fetch(`http://localhost:3000/users/${this.props.aliveEntries[0].user_id}`).then(res => res.json())
      .then(user => this.setState({ winner: user }))
  }

  render(){
    return(
      <React.Fragment>
      {!!this.state.winner
        ?
       <h2>{this.state.winner.id === this.props.currUser.id ? `Congratulations, you won!` : `We have a winner! Congratulations ${this.state.winner.name}!`}</h2>
       :
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
                <h3>{!!this.props.currPoolEntries && !!this.props.aliveEntries && `${this.props.aliveEntries.length} of ${this.props.currPoolEntries.length} entries left`}</h3>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <div>
          < PoolTable />
        </div>
      </React.Fragment>
    }
    </React.Fragment>
    )
  }

}


function mapStateToProps(state){
  return {
    currPoolId: state.currPoolId,
    currPoolEntries: state.currPoolEntries,
    currDay: state.currDay,
    aliveEntries: state.aliveEntries,
    currUser: state.currUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    setCurrPoolEntries: (entries) => {
      dispatch({type: 'CHANGE_POOL_ENTRIES', payload: entries})
    },
    updateAliveEntries: (count) => {
      dispatch({type: 'UPDATE_ALIVE_ENTRIES', payload: count})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewPoolContainer)
