import React, { Component } from 'react';
import { connect } from 'react-redux'
import ArticleSummary from './ArticleSummary'

class NewsFeed extends Component {

  constructor(props){
    super(props)

    this.state ={
      news: []
    }
  }

  componentDidMount(){
    if(!!this.props.stockToView){
      this.getNewsFromAPI()
    }
  }

  getNewsFromAPI(){
    fetch(`https://api.iextrading.com/1.0/stock/${this.props.stockToView}/news`).then(res => res.json()).then(newsHash =>
      this.setState({ news: newsHash })
    )
  }

  render(){
    return(
        this.state.news.map((article,idx) => {
          return < ArticleSummary key={idx} article={article} />
        })

    )
  }
}

function mapStateToProps(state){
  return {
    stockToView: state.stockToView
  }
}

export default connect(mapStateToProps)(NewsFeed)
