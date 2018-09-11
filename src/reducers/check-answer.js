import {
    CHECK_ANSWER_REQUEST,
    CHECK_ANSWER_ERROR,
    CHECK_ANSWER_SUCCESS
  } from '../actions/check-answer';
    
  const initialState = {
    feedback: null,
    loading: false,
    error: null
  };
    
  export default function checkAnswerReducer(state = initialState, action) {
    if (action.type === CHECK_ANSWER_REQUEST) {
      return Object.assign({}, state, {
        loading: true,
        error: null
      });
    }
    else if (action.type === CHECK_ANSWER_SUCCESS) {
      return Object.assign({}, state, {
        feedback: action.feedback,
        error: null
      }); 
    }
    else if (action.type === CHECK_ANSWER_ERROR) {
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      });
    }
    return state;
  }
    