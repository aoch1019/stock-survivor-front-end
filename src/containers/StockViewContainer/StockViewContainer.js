import React, { Component } from 'react';
import StockChart from './StockView-components/StockChart'
import NewsFeed from './StockView-components/NewsFeed'
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Image } from 'semantic-ui-react'
import Palette from 'react-palette'

class StockViewContainer extends Component {

  constructor(props){
    super(props)

    this.state = {
      logo: null
    }
  }

  componentDidMount(){
    if(!!this.props.stockToView){
      this.getLogoFromAPI()
    }
    else if(!!this.props.currUser){
      this.props.history.push('/View-Pool')
    }
    else {
      this.props.history.push('/Login')
    }
  }

  getLogoFromAPI(){
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.stockToView}/logo`).then(res => res.json()).then(img =>
      this.setState({ logo: img.url })
    )
  }

  render(){
    return(
      <React.Fragment>
        <div>
          <Image src={this.state.logo} size='small' circular centered />
        </div>
        < StockChart />
      <h2>Recent News:</h2>
        < NewsFeed />
      </React.Fragment>
    )
  }

}

function mapStateToProps(state){
  return {
    stockToView: state.stockToView,
    currUser: state.currUser
  }
}

export default withRouter(connect(mapStateToProps)(StockViewContainer))
