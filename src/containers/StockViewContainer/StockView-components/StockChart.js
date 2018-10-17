import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux'



class StockChart extends Component {

  constructor(props){
    super(props)

    this.state = {
      timeframe: "1m",
      chartData: {labels: [],
      datasets: [{
        label: `1m chart for ${this.props.stockToView}`,
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
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
        datasets: [{
          label: `${this.state.timeframe} chart for ${this.props.stockToView}`,
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
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
                data = {this.state.chartData}
                options = {{
                  scales: {
                    yAxes: [{
                      ticks: {
                        beginAtZero:true
                      }
                    }]
                  }
                }}
           />
        </div>
        <div>
          <button onClick={() => this.setState({ timeframe: "1d"}, () => this.getDataFromAPI())}>1d</button>
          <button onClick={() => this.setState({ timeframe: "1m"}, () => this.getDataFromAPI())}>1m</button>
          <button onClick={() => this.setState({ timeframe: "3m"}, () => this.getDataFromAPI())}>3m</button>
          <button onClick={() => this.setState({ timeframe: "6m"}, () => this.getDataFromAPI())}>6m</button>
          <button onClick={() => this.setState({ timeframe: "1y"}, () => this.getDataFromAPI())}>1y</button>
          <button onClick={() => this.setState({ timeframe: "ytd"}, () => this.getDataFromAPI())}>ytd</button>
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
