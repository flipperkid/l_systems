import React, { Component } from 'react';
import d3 from 'd3';
import ActionTypes from './ActionTypes';
import Brancher from './Brancher';
import store from './store';

class Canvas extends Component {
  constructor() {
   super();
   this.brancher = new Brancher();
   this.state = this.brancher.get();
   this.rowsRendered = 0;
  }

  render() {
    return (
      <svg ref='d3Canvas' width='100%' height='100%'
          onClick={this.setStartCoords.bind(this)}>
        <g className='d3-g' />
      </svg>
    );
  }

  componentDidMount() {
    this.brancher.subscribe(() => this.setState(this.brancher.get()));
    this.update();
  }

  componentDidUpdate() {
    this.rowsRendered = 0;
    this.update();
  }

  /**
   * @private
   */
  setStartCoords(event) {
    var canvas = React.findDOMNode(this);
    store.dispatch({
      type: ActionTypes.SET_START_COORDS,
      coords: {
        x: event.pageX - canvas.offsetLeft,
        y: event.pageY - canvas.offsetTop
      }
    });
  }

  /**
   * @private
   */
  update() {
    this.rowsRendered += 250;
    this.rowsRendered = Math.min(this.rowsRendered, this.state.branches.length);
    var el = this.refs.d3Canvas.getDOMNode();
    var svg = d3.select(el)
    var g = svg.selectAll('.d3-g');

    var branch = g.selectAll('.d3-polyline')
      .data(this.state.branches.slice(0, this.rowsRendered), (branch) => {
        return branch.points;
      });

    branch.enter()
      .append('polyline')
      .style('stroke', 'black')
      .style('fill', 'none')
      .attr('class', 'd3-polyline')
      .attr('points', (branch) => {
        return branch.points;
      });

    branch.exit().remove();
    if (this.rowsRendered < this.state.branches.length) {
      setTimeout(() => {
        this.update();
      });
    }
  }
}

export default Canvas;
