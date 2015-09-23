import { compose, createStore } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import ActionTypes from './ActionTypes';

const initialState = {
  rules: {
    'F': 'FF'
    'X': 'F-[[X]+X]+F[+FX]-X'
  },
  start: 'F',
  iterations: 4
};
const reducer = function(state = initialState, action) {
  var newState = $.extend(true, {}, state);
  switch (action.type) {
    default:
      return state;
  }
};

const finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);
const store = finalCreateStore(reducer);
export default store;
