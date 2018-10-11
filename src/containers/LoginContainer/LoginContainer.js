import React, { Component } from 'react';
import Login from './Login-Signup-components/Login'
import Signup from './Login-Signup-components/Signup'

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
        < Login changeToSignup={this.changeToSignup}/>
        :
        < Signup handleLoginSubmit={this.props.handleLoginSubmit} />}
      </div>
    )
  }

}
