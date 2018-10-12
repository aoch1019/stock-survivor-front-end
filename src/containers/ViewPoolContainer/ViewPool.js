import React, { Component } from 'react';

class ViewPool extends Component {



}


function mapStateToProps(state){
  return {
    currEntry: state.currEntry,
    currDay: state.currDay
  }
}

export default connect(mapStateToProps)(ViewPool)
