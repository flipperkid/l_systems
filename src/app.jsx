import { createStore } from 'redux';
var React = require('react');

var ActionTypes = {
  RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
  SUBMIT: 'SUBMIT'
};

var initialState = {
  messages: [],
  text: ''
};
var reducer = function(state = initialState, action) {
  var newState = $.extend({}, state);
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

var store = createStore(reducer);
var firebase = new Firebase('https://celerity.firebaseio.com/');
firebase.on('child_added', function(snapshot) {
  store.dispatch({
    type: ActionTypes.RECEIVE_MESSAGE,
    message: snapshot.val()
  });
}, this);

var ChatMessage = React.createClass({
  render: function() {
    return (
      <div><span>{this.props.name}: {this.props.text}</span></div>
    );
  }
});

var Chat = React.createClass({
  render: function() {
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
  },

  getInitialState: function() {
    return store.getState();
  },

  componentDidMount: function() {
    store.subscribe(() => this.setState(store.getState()));
  },

  onTextChange: function(event) {
    this.setState({
      text: event.target.value
    });
  },

  onKeyPress: function (e) {
    if (e.charCode == 13) {
      var name = this.refs.nameInput.getDOMNode().value;
      var text = this.refs.messageInput.getDOMNode().value;
      store.dispatch({
        type: ActionTypes.SUBMIT,
        message: {name: name, text: text}
      });
    }
  }
});

React.render(<Chat/>, document.body);
