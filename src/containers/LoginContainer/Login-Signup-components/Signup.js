import React, { Component } from 'react';
import { connect } from 'react-redux'

class Signup extends Component{
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

  async addUserToAPI(){
    const userList = await fetch('http://localhost:3000/users').then(res => res.json())

    if(!!userList.find(user => user.name === this.state.currInput)){
      alert("Username already exists! Please choose another name")
    }
    else{
    const userObj = await fetch(`http://localhost:3000/users`, {
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                              },
                              method: 'POST',
                              body: JSON.stringify({
                                name: this.state.currInput
                              })
                            }).then(res => res.json())
      this.props.changeUser(userObj)
    }
  }

  render(){
    return(
        <form onSubmit={(event) => {event.preventDefault(); this.addUserToAPI()}} className="ui form">
          <div className="field">
            <label>Please create your username</label>
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

export default connect(null, mapDispatchToProps)(Signup)
