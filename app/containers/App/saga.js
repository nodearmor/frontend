import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { getUserDone, getUserError } from './actions';
import { GET_USER } from './constants';

// User request/response handler
export function* getUser() {
  const requestURL = `http://localhost/api/user`;

  try {
    // Call our request helper (see 'utils/request')
    const user = yield call(request, requestURL);
    yield put(getUserDone(user));
  } catch (err) {
    yield put(getUserError(err));
  }
}

export default function* githubData() {
  // Watches for GET_USER action and automatically initiates API call
  yield takeLatest(GET_USER, getUser);
}
