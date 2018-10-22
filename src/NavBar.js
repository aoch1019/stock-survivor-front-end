import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { withRouter } from 'react-router';
import { Button } from 'semantic-ui-react'

class NavBar extends Component {

  state = {}

  handleItemClick = (e, { name }) => {this.setState({ activeItem: name }); this.props.history.push(`/${name}`)}

  logout(){
    this.props.changeUser(null)
    this.props.changeEntry(null)
    this.props.makeStockPick(null)
    this.props.changeStock(null)
  }

  componentDidUpdate(prevProps){
    if(prevProps.currUser !== this.props.currUser && !!this.props.currUser){
      this.setState({ activeItem: 'Todays-Pick' })
    }
  }

  render(){
    const { activeItem } = this.state
    return(
      this.props.currUser ?
        <Menu tabular>
          <Menu.Item name='Todays-Pick' onClick={this.handleItemClick} active={activeItem === 'Todays-Pick'} >Today's Pick</Menu.Item>
          <Menu.Item name='View-Pool' onClick={this.handleItemClick} active={activeItem === 'View-Pool'} >View Pool</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item name='Profile' onClick={(e, name) => {this.handleItemClick(e, name); this.props.changeProfile(this.props.currUser)}} active={activeItem === 'View-Pool'} >Profile</Menu.Item>
            <Menu.Item name='Login' onClick={(e, name) => {this.handleItemClick(e, name); this.logout()}}>Logout</Menu.Item>
            <Button fitted='true' floated='right' icon='hourglass end' data-tooltip='Go to next day' data-position='bottom right' onClick={() => this.props.goToNextDay()}/>
          </Menu.Menu>
        </Menu>
        :
        <Menu tabular>
          <Menu.Item name='Login' onClick={this.handleItemClick} active={activeItem === 'Login'} >Login</Menu.Item>
          <Menu.Item name='Signup' onClick={this.handleItemClick} active={activeItem === 'Signup'} >Signup</Menu.Item>
          <Menu.Item name='View-Pool' onClick={this.handleItemClick} active={activeItem === 'View-Pool'} >View Pool</Menu.Item>
        </Menu>
      )
    }

}

function mapStateToProps(state){
  return {
    currUser: state.currUser
  }
}

function mapDispatchToProps(dispatch){
  return {
    changeUser: (username) => {
      dispatch({type: 'CHANGE_USER', payload: username})
    },
    changeEntry: (entry) => {
      dispatch({type: 'CHANGE_ENTRY', payload: entry})
    },
    makeStockPick: (pick) => {
      dispatch({type: 'MAKE_STOCK_PICK', payload: pick})
    },
    changeStock: (stock) => {
      dispatch({type: 'CHANGE_PICKED_STOCK', payload: stock})
    },
    changeProfile: (user) => {
      dispatch({type: 'CHANGE_PROFILE', payload: user})
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar))
