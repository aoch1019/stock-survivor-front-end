import React, { Component } from 'react';
import { connect } from 'react-redux'

class Profile extends Component {

  state = {
    furthestDay: 1,
    poolsEntered: null,
    poolsWon: null,
    mostCommonStock: null
  }

  componentDidMount(){
    this.getFurthestDay()
    this.getPoolsEntered()
    this.getPoolsWon()
  }

  async getFurthestDay(){
    let allEntries = await fetch(`http://localhost:3000/entries/`).then(res => res.json())
    let allUserEntries = allEntries.filter(entry => entry.user_id === this.props.currProfile.id)
    allUserEntries.forEach(entry => {
      fetch(`http://localhost:3000/picks/`).then(res => res.json()).then(picks => picks.filter(
        pick => pick.entry_id === entry.id)).then(entryPicks => entryPicks.forEach(entryPick => {
          if(entryPick.day > this.state.furthestDay){
            this.setState({ furthestDay: entryPick.day })
          }
        })
        )
    })
  }

  async getPoolsEntered(){
    let allEntries = await fetch(`http://localhost:3000/entries/`).then(res => res.json())
    let poolCount = 0
    allEntries.forEach(entry => {
      if(entry.user_id === this.props.currProfile.id){
        poolCount++
      }
    })
    this.setState({ poolsEntered: poolCount })
  }

  async getPoolsWon(){
    let allPools = await fetch(`http://localhost:3000/pools/`).then(res => res.json())
    let allEntries = await fetch(`http://localhost:3000/entries/`).then(res => res.json())
    let poolsWon = 0
    allPools.forEach(currPool => {
      let winnerExists = true
      let currPoolWinner = null
      allEntries.forEach(entry => {
        if(!!winnerExists && !!entry.alive && entry.pool_id === currPool.id){
          if(!!currPoolWinner){
            winnerExists = false
          }
          else{
            currPoolWinner = entry
          }
        }
      })
      if(!!winnerExists && !!currPoolWinner && currPoolWinner.user_id === this.props.currProfile.id){
        poolsWon++
      }
    })
    this.setState({ poolsWon: poolsWon })
  }

  render(){
    return(
      <React.Fragment>
        <div>Yo from {this.props.currProfile.name} page</div>
        <div>Furthest Day: {this.state.furthestDay}</div>
        <div>Pools Entered: {this.state.poolsEntered}</div>
        <div>Pools Won: {this.state.poolsWon}</div>
      </React.Fragment>
    )
  }


}

function mapStateToProps(state){
  return {
    currProfile: state.currProfile,
    currUser: state.currUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeProfile: (user) => {
      dispatch({type: 'CHANGE_PROFILE', payload: user})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
