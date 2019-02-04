import { fromJS } from 'immutable';

import { LOGIN, LOGIN_DONE, LOGIN_ERROR } from './constants';

// The initial state of the login page
const initialState = fromJS({
  loading: true,
  error: false,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return state.set('loading', true).set('error', false);
    case LOGIN_DONE:
      return state.set('loading', false);
    case LOGIN_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default loginReducer;
