import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'


class Profile extends Component {

  state = {
    furthestDay: 1,
    poolsEntered: null,
    poolsWon: null,
    mostCommonStock: null,
    mostCommonStockCount: null
  }

  componentDidMount(){
    this.getFurthestDay()
    this.getPoolsEntered()
    this.getPoolsWon()
    this.getMostCommonStock()
  }

  componentDidUpdate(prevProps){
    if(this.props.currProfile !== prevProps.currProfile){
      this.getFurthestDay()
      this.getPoolsEntered()
      this.getPoolsWon()
      this.getMostCommonStock()
    }
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

  async getMostCommonStock(){
    let allEntries = await fetch(`http://localhost:3000/entries/`).then(res => res.json())
    let allUserEntries = allEntries.filter(entry => entry.user_id === this.props.currProfile.id)
    let allUserEntryIds = allUserEntries.map(entry => entry.id)

    let allPicks = await fetch(`http://localhost:3000/picks/`).then(res => res.json())
    let allUserPicks = allPicks.filter(pick => allUserEntryIds.includes(pick.entry_id))

    let sortedByStockId = allUserPicks.sort((a, b) => a.stock_id - b.stock_id)

    let mostCommonCount = 0
    let mostCommonStockId = null
    let currCount = 1

    sortedByStockId.forEach((pick, idx) => {
      while(idx + currCount < sortedByStockId.length && sortedByStockId[idx + currCount].stock_id === pick.stock_id){
        currCount++
      }
      if(currCount > mostCommonCount){
        mostCommonStockId = pick.stock_id
        mostCommonCount = currCount
      }
      currCount = 1
    })

    let mostCommonStock = await fetch(`http://localhost:3000/stocks/${mostCommonStockId}`).then(res => res.json())

    this.setState({ mostCommonStock: mostCommonStock, mostCommonStockCount: mostCommonCount })
  }

  transformDate(date){
    const monthNames = {1: "January", 2:  "February", 3: "March", 4: "April", 5: "May", 6: "June",
      7: "July", 8: "August", 9: "September", 10: "October", 11: "November", 12: "December"}

    return monthNames[date.slice(5,7)] + " " + date.slice(0,4)
  }

  render(){
    return(
      <React.Fragment>
        <Segment.Group raised padded='very' size='big'>
          <Segment><Header as='h1'> Welcome to {this.props.currProfile.name + `'s`} profile</Header></Segment>
          <Segment.Group>
            <Segment><Header as='h4'> Member Since: {this.transformDate(this.props.currProfile.created_at.toString().slice(0,10))}</Header></Segment>
          </Segment.Group>
          <Segment.Group horizontal>
            <Segment><Header as='h2'> Furthest Day: {this.state.furthestDay}</Header></Segment>
            <Segment><Header as='h2'> Pools Entered: {this.state.poolsEntered}</Header></Segment>
            <Segment><Header as='h2'> Pools Won: {this.state.poolsWon}</Header></Segment>
          </Segment.Group>
        </Segment.Group>
        <Segment.Group raised padded='very'>
            {!!this.state.mostCommonStock
                ?
              <Segment>
                <Header as='h3'> Most Common Stock:</Header>
                <h3><Link to="/View-Stock" onClick={() => this.props.changeStockToView(this.state.mostCommonStock.ticker)}>{this.state.mostCommonStock.name}</Link> -- {this.state.mostCommonStockCount} time(s)</h3>
              </Segment>
                :
              <React.Fragment>
                <Header as='h3'> Most Common Stock:</Header>
                <Segment loading/>
              </React.Fragment>
            }
        </Segment.Group>
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
    },
    changeStockToView: (ticker) => {
      dispatch({type: 'CHANGE_STOCK_TO_VIEW', payload: ticker})
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))
