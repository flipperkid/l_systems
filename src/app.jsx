import { compose, createStore } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import React, { Component } from 'react';

const ActionTypes = {
  RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
  SUBMIT: 'SUBMIT',
  SET_VALUE: 'SET_VALUE'
};

const initialState = {
  messages: [],
  name: '',
  text: ''
};
const reducer = function(state = initialState, action) {
  var newState = $.extend(true, {}, state);
  switch (action.type) {
    case ActionTypes.SUBMIT:
      newState.text = '';
      return newState;
    case ActionTypes.RECEIVE_MESSAGE:
      newState.messages.push(action.message)
      return newState;
    case ActionTypes.SET_VALUE:
      newState[action.field] = action.value;
      return newState;
    default:
      return state;
  }
};

const finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);
window.store = finalCreateStore(reducer);

window.firebase = new Firebase('https://celerity.firebaseio.com/');
firebase.unauth();
const authenticate = function() {
  var state = store.getState();
  firebase.authWithPassword({
    email: state.name,
    password: state.text
  }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
      firebase.on('child_added', function(snapshot) {
        store.dispatch({
          type: ActionTypes.RECEIVE_MESSAGE,
          message: snapshot.val()
        });
      }, this);
    }
  });
};

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

class Root extends Component {
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
