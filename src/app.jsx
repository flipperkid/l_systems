import { compose, createStore } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import React, { Component } from 'react';

const ActionTypes = {
  RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
  SUBMIT: 'SUBMIT'
};

const initialState = {
  messages: [],
  text: ''
};
const reducer = function(state = initialState, action) {
  var newState = $.extend(true, {}, state);
  switch (action.type) {
    case ActionTypes.SUBMIT:
      setTimeout(() => firebase.push(action.message))
      newState.text = '';
      return newState;
    case ActionTypes.RECEIVE_MESSAGE:
      newState.messages.push(action.message)
      return newState;
    default:
      return state;
  }
};

const finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);
const store = finalCreateStore(reducer);
const firebase = new Firebase('https://celerity.firebaseio.com/');
firebase.on('child_added', function(snapshot) {
  store.dispatch({
    type: ActionTypes.RECEIVE_MESSAGE,
    message: snapshot.val()
  });
}, this);

class ChatMessage extends Component {
  render() {
    return (
      <div><span>{this.props.name}: {this.props.text}</span></div>
    );
  }
}

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
        <input type='text' ref='nameInput' placeholder='Name' />
        <input type='text' ref='messageInput' placeholder='Message'
          onKeyPress={this.onKeyPress} onChange={this.onTextChange}
          value={this.state.text} />
      </div>
    );
  }

  componentDidMount() {
    store.subscribe(() => this.setState(store.getState()));
  }

  onTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  onKeyPress(e) {
    if (e.charCode == 13) {
      var name = this.refs.nameInput.getDOMNode().value;
      var text = this.refs.messageInput.getDOMNode().value;
      store.dispatch({
        type: ActionTypes.SUBMIT,
        message: {name: name, text: text}
      });
    }
  }
}

export default class Root extends Component {
  render() {
    return (
      <div>
        <Chat />
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}

React.render(<Root />, document.body);
