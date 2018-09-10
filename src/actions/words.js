import { API_BASE_URL } from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_WORD_REQUEST = 'FETCH_WORD_REQUEST';
export const fetchWordRequest = () => ({
  type: FETCH_WORD_REQUEST
});

export const FETCH_WORD_SUCCESS = 'FETCH_WORD_SUCCESS';
export const fetchWordSuccess = (word) => ({
  type: FETCH_WORD_SUCCESS,
  word
});

export const FETCH_WORD_ERROR = 'FETCH_WORD_ERROR';
export const fetchWordError = (error) => ({
  type: FETCH_WORD_ERROR,
  error
});

export const fetchWord = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/words`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({word}) => dispatch(fetchWordSuccess(word)))
    .catch(err => {
      dispatch(fetchWordError(err));
    });
};