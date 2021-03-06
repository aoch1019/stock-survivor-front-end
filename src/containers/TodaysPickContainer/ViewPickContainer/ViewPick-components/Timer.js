import React, { Component } from 'react';
import { Header, Icon } from 'semantic-ui-react'

export default class Timer extends Component {

  constructor(props){
    super(props)

    this.state = {
      hours: 0,
      mins: 0,
      secs: 0
    }
  }

  componentDidMount(){
    this.calculateCountdown()
    this.interval = setInterval(() => {
    this.calculateCountdown()
    }, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  calculateCountdown(){
    let endTime = new Date(new Date().getFullYear(),
                           new Date().getMonth(),
                           new Date().getDate(),
                           16,
                           0,
                           0)

    let timeLeft = (endTime - new Date()) / 1000
    let hoursLeft = 0;
    let minsLeft = `00`;
    let secsLeft = `00`;

    if(timeLeft < 0){
      timeLeft += 86400
    }

    if(timeLeft > 3600){
      hoursLeft = Math.floor(timeLeft / 3600)
      timeLeft = timeLeft % 3600
    }
    if(timeLeft > 60){
      minsLeft = Math.floor(timeLeft / 60)
      if(minsLeft < 10){
        minsLeft = '0' + minsLeft
      }
      timeLeft = timeLeft % 60
    }
    if(timeLeft > 0){
      secsLeft = Math.floor(timeLeft)
      if(secsLeft < 10){
        secsLeft = '0' + secsLeft
      }
      timeLeft = 0
    }

    this.setState({
      hours: hoursLeft,
      mins: minsLeft,
      secs: secsLeft
    })

  }

  render(){
    return(
      <Header as='h2'>
        <Icon name="clock outline"/>
        {this.state.hours}:{this.state.mins}:{this.state.secs}
      </Header>
    )
  }


} /* End of class */
