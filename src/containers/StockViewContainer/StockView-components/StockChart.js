import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'



class StockChart extends Component {

  constructor(props){
    super(props)

    this.state = {
      timeframe: "1m",
      chartData: {labels: [],
      datasets: [
        {
          label: `1m chart for ${this.props.stockToView}`,
          data: [],
          backgroundColor: 'rgba(0,0,0,0.1)',
          borderColor: 'rgba(135, 206, 235)',
          borderWidth: 3,
          borderCapStyle: 'butt',
          pointRadius: 6,
          pointHoverRadius: 12,
          pointHitRadius: 15,
          pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
          borderJoinStyle: 'miter',
          fill: false
       }
      ]
    }
    }

  }

  componentDidMount(){
    if(!!this.props.timeframe){
      this.setState({ timeframe: this.props.timeframe }, () => {
        if(!!this.props.stockToView){
          this.getDataFromAPI()
        }
      })
    }
    else{
      if(!!this.props.stockToView){
        this.getDataFromAPI()
      }
    }
  }

  getDataFromAPI(){
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.stockToView}/chart/${this.state.timeframe}`).then(res => res.json())
      .then(APIhash => {
        const dataset = {labels: [],
        datasets: [
          {
            label: `${this.state.timeframe} chart for ${this.props.stockToView}`,
            data: [],
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderColor: 'rgba(135, 206, 235)',
            borderWidth: 3,
            borderCapStyle: 'butt',
            pointRadius: 4,
            pointHoverRadius: 7,
            pointHitRadius: 10,
            pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
            borderJoinStyle: 'miter',
            fill: false
          }
        ]
      }
        APIhash.forEach(dailyQuote => {
          const closePrice = dailyQuote.close
          const date = dailyQuote.label
          dataset.labels.push(date)
          dataset['datasets'][0].data.push(closePrice)
        })
        this.setState({ chartData: dataset })
      })
  }

  render(){
    return(
      <React.Fragment>
        <div className="chart">
        < Line
                height={300}
                data = {this.state.chartData}
                options = {
                  {
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                                xAxes: [
                                  {
                                      ticks: {
                                         callback: function(label, index, labels) {
                                           return label;
                                         }
                                      }
                                  }
                                ],
                                yAxes: [
                                  {
                                      ticks: {
                                         callback: function(label, index, labels) {
                                           return label;
                                         },
                                         fontSize: 18,
                                         fontColor: 'black'
                                      },
                                       display: true,
                    }
                                ]
                            }
                }}

           />
        </div>
        <div>
          <Button.Group size='mini' compact>
            <Button onClick={() => this.setState({ timeframe: "1d"}, () => this.getDataFromAPI())}>1d</Button>
            <Button onClick={() => this.setState({ timeframe: "1m"}, () => this.getDataFromAPI())}>1m</Button>
            <Button onClick={() => this.setState({ timeframe: "3m"}, () => this.getDataFromAPI())}>3m</Button>
            <Button onClick={() => this.setState({ timeframe: "6m"}, () => this.getDataFromAPI())}>6m</Button>
            <Button onClick={() => this.setState({ timeframe: "1y"}, () => this.getDataFromAPI())}>1y</Button>
            <Button onClick={() => this.setState({ timeframe: "ytd"}, () => this.getDataFromAPI())}>ytd</Button>
          </Button.Group>
        </div>
      </React.Fragment>
    )
  }

} /* End of class */

function mapStateToProps(state){
  return {
    stockToView: state.stockToView
  }
}


export default connect(mapStateToProps)(StockChart)
