import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import React, { Component } from 'react';
import Canvas from './Canvas.jsx';
import Iterations from './Iterations.jsx';
import store from './store';

class Root extends Component {
  render() {
    return (
      <div>
        <Canvas />
        <Iterations />
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}

React.render(<Root />, document.body);
