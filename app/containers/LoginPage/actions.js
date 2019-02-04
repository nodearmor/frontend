import { LOGIN, LOGIN_DONE, LOGIN_ERROR } from './constants';

export function login(email, password) {
  return {
    type: LOGIN,
    email,
    password,
  };
}

export function loginDone() {
  return {
    type: LOGIN_DONE,
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error,
  };
}
