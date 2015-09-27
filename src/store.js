import { compose, createStore } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import ActionTypes from './ActionTypes';

const initialState = {
  rules: {
    'F': 'FF',
    'X': 'F-[[X]+X]+F[+FX]-X'
  },
  start: 'X',
  iterations: 6,
  lineLength: 1,
  angle: 270,
  angleIncrement: 30,
  startCoords: {
    x: 0,
    y: 400
  }
};
const reducer = function(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_STATE:
      return $.extend(true, {}, state, action.update);
    case ActionTypes.SET_START_COORDS:
      var newState = $.extend(true, {}, state);
      newState.startCoords = action.coords;
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
export default store;
