import React, { Component } from 'react';

class ChatMessage extends Component {
  render() {
    return (
      <div><span>{this.props.name}: {this.props.text}</span></div>
    );
  }
}

export default ChatMessage;
