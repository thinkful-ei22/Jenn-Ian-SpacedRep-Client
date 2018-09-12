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

export const CLEAR_FEEDBACK = 'CLEAR_FEEDBACK';
export const clearFeedback = () => ({
  type: CLEAR_FEEDBACK
});

// export const UPDATE_SCORE_CORRECT = 'UPDATE_SCORE_CORRECT';
// export const updateScoreCorrect = () => ({
//   type: UPDATE_SCORE_CORRECT
// });

// export const UPDATE_SCORE_INCORRECT = 'UPDATE_SCORE_INCORRECT';
// export const updateScoreIncorrect = () => ({
//   type: UPDATE_SCORE_INCORRECT
// });

export const checkAnswer = (answerObj, userId) => (dispatch, getState) => {
  dispatch(checkAnswerRequest());
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
    .then((data) => dispatch(checkAnswerSuccess(data)))
    .catch(err => {
      dispatch(checkAnswerError(err));
    });
};
