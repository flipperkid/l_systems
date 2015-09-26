import React, { Component } from 'react';
import d3 from 'd3';
import Brancher from './Brancher';

class Canvas extends Component {
  constructor() {
   super();
   this.brancher = new Brancher();
   this.state = this.brancher.get();
  }

  render() {
    return (
      <svg ref='d3Canvas' width='100%' height='100%'>
        <g className='d3-g' />
      </svg>
    );
  }

  componentDidMount() {
    this.brancher.subscribe(() => this.setState(this.brancher.get()));
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  /**
   * @private
   */
  update() {
    var el = this.refs.d3Canvas.getDOMNode();
    var svg = d3.select(el)
    var g = svg.selectAll('.d3-g');

    var branch = g.selectAll('.d3-polyline')
      .data(this.state.branches, function(branch) {
        return branch.points;
      });

    branch.enter()
      .append('polyline')
      .style('stroke', 'black')
      .style('fill', 'none')
      .attr('class', 'd3-polyline')
      .attr('points', function(branch) {
        return branch.points;
      });

    branch.exit().remove();
  }
}

export default Canvas;
