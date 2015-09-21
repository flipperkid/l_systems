import React, { Component } from 'react';
import ActionTypes from './ActionTypes';
import ChatMessage from './ChatMessage.jsx';
import firebase, { authenticate } from './firebase';
import store from './store';

class Chat extends Component {
  constructor() {
   super();
   this.state = store.getState();
  }

  render() {
    var messages = this.state.messages.map(function(message) {
      return (<ChatMessage name={message.name} text={message.text} />)
    });

    return (
      <div>
        <div>{messages}</div>
        <input type='text' ref='nameInput' placeholder='Name'
          onChange={this.onNameChange} value={this.state.name}/>
        <input type='text' ref='messageInput' placeholder='Message'
          onChange={this.onTextChange} onKeyPress={this.onTextKeyPress}
          value={this.state.text} />
      </div>
    );
  }

  componentDidMount() {
    store.subscribe(() => this.setState(store.getState()));
  }

  onNameChange(event) {
    store.dispatch({
      type: ActionTypes.SET_VALUE,
      field: 'name',
      value: event.target.value
    });
  }

  onTextChange(event) {
    store.dispatch({
      type: ActionTypes.SET_VALUE,
      field: 'text',
      value: event.target.value
    });
  }

  onTextKeyPress(event) {
    if (event.charCode !== 13) {
      return;
    }

    if (firebase.getAuth()) {
      var state = store.getState();
      firebase.push({
        name: state.name,
        text: state.text
      });
    } else {
      authenticate();
    }

    store.dispatch({
      type: ActionTypes.SUBMIT
    });
  }
}

export default Chat;
