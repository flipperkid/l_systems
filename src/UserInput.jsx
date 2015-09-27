import React, { Component } from 'react';
import Slider from 'material-ui/lib/slider';
import ActionTypes from './ActionTypes';
import store from './store';

class UserInput extends Component {
  constructor() {
    super();
    this.state = store.getState();
  }

  render() {
    return (
      <div style={{position: 'absolute', width: '150px'}}>
        <Slider name='iterations' ref='iterationsInput' description='Iterations'
          value={this.state.iterations} min={1} max={15} step={1}
          onDragStop={this.publishChanges.bind(this)} />
        <Slider name='lineLength' ref='lineLengthInput' description='Line Length'
          value={this.state.lineLength} min={.1} max={5} step={.1}
          onDragStop={this.publishChanges.bind(this)} />
        <Slider name='angle' ref='angleInput' description='Initial Angle'
          value={this.state.angle} min={0} max={360} step={5}
          onDragStop={this.publishChanges.bind(this)} />
        <Slider name='angleIncrement' ref='angleIncrementInput' description='Angle Increment'
          value={this.state.angleIncrement} min={0} max={360} step={5}
          onDragStop={this.publishChanges.bind(this)} />
      </div>
    );
  }

  componentDidMount() {
    store.subscribe(() => this.setState(store.getState()));
  }

  /**
   * @private
   */
  publishChanges() {
    var newState = {
      'iterations': this.refs.iterationsInput.getValue(),
      'lineLength': this.refs.lineLengthInput.getValue(),
      'angle': this.refs.angleInput.getValue(),
      'angleIncrement': this.refs.angleIncrementInput.getValue()
    };

    store.dispatch({
      type: ActionTypes.UPDATE_STATE,
      update: newState
    });
  }
}

export default UserInput;
