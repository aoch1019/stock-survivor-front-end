import React, { Component } from 'react';
import Login from '../components/Login-Signup-components/Login'
import Signup from '../components/Login-Signup-components/Signup'

export default class LoginContainer extends Component{
  constructor(props){
    super(props)

    this.state = {
      currForm: "login"
    }

    this.changeToSignup = this.changeToSignup.bind(this)
  }

  changeToSignup(){
    this.setState({
      currForm: "signup"
    })
  }

  render(){
    return(
      <div>
        {this.state.currForm === "login"
        ?
        < Login handleLoginSubmit={this.props.handleLoginSubmit} changeToSignup={this.changeToSignup}/>
        :
        < Signup handleLoginSubmit={this.props.handleLoginSubmit} />}
      </div>
    )
  }

}
