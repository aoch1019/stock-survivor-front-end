import React from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'

const NavBar = (props) => {
  return(
    props.currUser ?
      <div className="ui two item menu" >
        <NavLink className="item" to="/Todays-Pick" >Today's Pick</NavLink>
        <NavLink className="active item" to="/View-Pool" >View Pool</NavLink>
      </div>
      :
      <div className="ui three item menu" >
        <NavLink className="active item" to="/Login" >Login</NavLink>
        <NavLink className="item" to="/Signup" >Signup</NavLink>
        <NavLink className="item" to="/View-Pool" >View Pool</NavLink>
      </div>
    )

}

function mapStateToProps(state){
  return {
    currUser: state.currUser
  }
}

export default connect(mapStateToProps)(NavBar)
