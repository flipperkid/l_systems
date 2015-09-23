import React, { Component } from 'react';

class Iteration extends Component {
  render() {
    return (
      <div><span>{this.props.number}: {this.props.pattern}</span></div>
    );
  }
}

export default Iteration;
