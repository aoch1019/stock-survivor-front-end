import React, { Component } from 'react';

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

  calculateCountdown(){
    let endTime = new Date(new Date().getFullYear(),
                           new Date().getMonth(),
                           new Date().getDate(),
                           16,
                           0,
                           0)

    let timeLeft = (endTime - new Date()) / 1000
    let hoursLeft = 0;
    let minsLeft = 0;
    let secsLeft = 0;

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
      <div>
        <h3>Time Remaining {this.state.hours}:{this.state.mins}:{this.state.secs}</h3>
      </div>
    )
  }


} /* End of class */
