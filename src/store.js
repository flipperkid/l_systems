import { compose, createStore } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import ActionTypes from './ActionTypes';

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
const store = finalCreateStore(reducer);
export default store;
