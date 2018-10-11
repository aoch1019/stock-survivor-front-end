import React, { Component } from 'react';

export default class Signup extends Component{
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
        <form onSubmit={(event) => this.props.handleLoginSubmit(this.state.currInput, event)} className="ui form">
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

}
