/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { GET_USER, GET_USER_DONE, GET_USER_ERROR } from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: true,
  error: false,
  user: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return state
        .set('loading', true)
        .set('error', false)
        .set('user', false);
    case GET_USER_DONE:
      return state.set('loading', false).set('user', action.user);
    case GET_USER_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
