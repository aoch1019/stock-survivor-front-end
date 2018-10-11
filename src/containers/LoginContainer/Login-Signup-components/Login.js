import React, { Component } from 'react';
import { connect } from 'react-redux'

class Login extends Component{
  constructor(props){
    super(props)

    this.state = {
      currInput: ""
    }

    this.handleChange = this.handleChange.bind(this)
  }


  handleChange(event){
    this.setState({
      currInput: event.target.value
    })
  }

  async getUserFromAPI(){
    const userList = await fetch('http://localhost:3000/users').then(res => res.json())
    const userObj = userList.find(user => user.name === this.state.currInput)
    !!userObj ? this.props.changeUser(userObj) : alert("User not found, please try again!")
  }

  render(){
    return(
      <React.Fragment>
        <form onSubmit={(event) => {event.preventDefault(); this.getUserFromAPI()}} className="ui form">
          <div className="field">
            <label>Please Login</label>
            <input
              placeholder="Username"
              type="text"
              value={this.state.currInput}
              onChange={this.handleChange}
            />
          </div>
            <input  type='submit'
                    className="ui submit button" />
        </form>
        <br></br>
        <div>
          Don't have an account?
          <br></br>
          <button className="tiny ui button" onClick={this.props.changeToSignup}>Sign up here!</button>
        </div>
      </React.Fragment>
    )
  }

} /* End of class */

function mapDispatchToProps(dispatch){
  return {
    changeUser: (username) => {
      dispatch({type: 'CHANGE_USER', payload: username})
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)
