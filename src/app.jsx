var firebase = new Firebase('https://celerity.firebaseio.com/');
var allMessages = [];
firebase.on('child_added', function(snapshot) {
  allMessages.push(snapshot.val());
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
        <input type='text' ref='nameInput' placeholder='Name'>
          {this.state.name}
        </input>
        <input type='text' ref='messageInput' placeholder='Message'
            onKeyPress={this.onKeyPress}>
          {this.state.text}
        </input>
      </div>
    );
  },

  getInitialState: function() {
    return {
      messages: allMessages,
      name: '',
      text: ''
    }
  },

  componentDidMount: function() {
    var self = this;
    Object.observe(allMessages, function() {
      self.setState({
        messages: allMessages,
        name: self.state.name,
        text: self.state.text
      });
    });
  },

  onKeyPress: function (e) {
    if (e.charCode == 13) {
      var name = this.refs.nameInput.getDOMNode().value;
      var text = this.refs.messageInput.getDOMNode().value;
      firebase.push({name: name, text: text});
      this.refs.messageInput.getDOMNode().value = '';
    }
  }
});

React.render(<Chat/>, document.body);
