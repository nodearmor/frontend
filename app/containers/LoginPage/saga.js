import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { loginDone, loginError } from './actions';
import { LOGIN } from './constants';

// User request/response handler
export function* login() {
  const requestURL = `http://localhost/api/user/login`;

  try {
    // Call our request helper (see 'utils/request')
    yield call(request, requestURL);
    yield put(loginDone());
  } catch (err) {
    yield put(loginError(err));
  }
}

export default function* loginWatcher() {
  // Watches for LOGIN action and automatically initiates API call
  yield takeLatest(LOGIN, login);
}
