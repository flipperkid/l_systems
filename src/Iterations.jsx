import React, { Component } from 'react';
import Iteration from './Iteration.jsx';
import Iterator from './Iterator';

class Iterations extends Component {
  constructor() {
   super();
   this.iterator = new Iterator();
   this.state = this.iterator.get();
  }

  render() {
    var iterations = this.state.iterations.map(function(iteration) {
      return (<Iteration number={iteration.number} pattern={iteration.pattern} />)
    });

    return (
      <div>{iterations}</div>
    );
  }

  componentDidMount() {
    this.iterator.subscribe(() => this.setState(this.iterator.get()));
  }
}

export default Iterations;
