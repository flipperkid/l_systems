import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import React, { Component } from 'react';
import Chat from './Chat.jsx';
import store from './store';

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
