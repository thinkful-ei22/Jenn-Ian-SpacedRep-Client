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

export const checkAnswer = (answerObj) => (dispatch, getState) => {
    dispatch(checkAnswerRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users`, {
        method: 'PUT',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
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
