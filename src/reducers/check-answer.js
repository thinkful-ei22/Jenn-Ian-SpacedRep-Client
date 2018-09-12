import {
  CHECK_ANSWER_REQUEST,
  CHECK_ANSWER_ERROR,
  CHECK_ANSWER_SUCCESS,
  CLEAR_FEEDBACK,
} from '../actions/check-answer';
    
const initialState = {
  feedback: null,
  totalAnswered: 0,
  totalCorrect:0,
  loading: false,
  error: null
};
    
export default function checkAnswerReducer(state = initialState, action) {
  if (action.type === CLEAR_FEEDBACK) {
    return Object.assign({}, state, {
      feedback: null
    }); 
  }
  else if (action.type === CHECK_ANSWER_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  else if (action.type === CHECK_ANSWER_SUCCESS) {
    if(action.feedback.feedback===true){
      return Object.assign({}, state, {
        feedback: action.feedback,
        totalAnswered: state.totalAnswered+1,
        totalCorrect: state.totalCorrect+1,
        error: null
      }); 
    }
    return Object.assign({}, state, {
      feedback: action.feedback,
      totalAnswered: state.totalAnswered+1,
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
    