import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Canvas from './Canvas.jsx';
import UserInput from './UserInput.jsx';
import store from './store';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

class Root extends Component {
  render() {
    return (
      <div>
        <UserInput />
        <Canvas />
        <DebugPanel top right bottom>
          <DevTools store={store} monitor={LogMonitor} />
        </DebugPanel>
      </div>
    );
  }
}

React.render(<Root />, document.body);
