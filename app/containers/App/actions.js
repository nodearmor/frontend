import { GET_USER, GET_USER_DONE, GET_USER_ERROR } from './constants';

export function getUser() {
  return {
    type: GET_USER,
  };
}

export function getUserDone(user) {
  return {
    type: GET_USER_DONE,
    user,
  };
}

export function getUserError(error) {
  return {
    type: GET_USER_ERROR,
    error,
  };
}
