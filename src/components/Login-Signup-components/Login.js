import React, { Component } from 'react';

export default class Login extends Component{
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

  render(){
    return(
      <React.Fragment>
        <form onSubmit={(event) => this.props.handleLoginSubmit(this.state.currInput, event)} className="ui form">
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

}
