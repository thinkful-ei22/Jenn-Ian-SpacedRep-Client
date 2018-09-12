import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const CHECK_ANSWER_REQUEST = 'CHECK_ANSWER_REQUEST';
export const checkAnswerRequest = () => ({
  type: CHECK_ANSWER_REQUEST
});

export const CHECK_ANSWER_ERROR = 'CHECK_ANSWER_ERROR';
export const checkAnswerError = error => ({
  type: CHECK_ANSWER_ERROR,
  error
});

export const CHECK_ANSWER_SUCCESS = 'CHECK_ANSWER_SUCCESS';
export const checkAnswerSuccess = feedback => ({
  type: CHECK_ANSWER_SUCCESS,
  feedback
});

export const checkAnswer = (answerObj, userId) => (dispatch, getState) => {
  dispatch(checkAnswerRequest());
  console.log(answerObj);
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(answerObj)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
  //remove curlies?
    .then(({ data }) => dispatch(checkAnswerSuccess(data)))
    .catch(err => {
      dispatch(checkAnswerError(err));
    });
};
