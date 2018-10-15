import {
  CHECK_ANSWER_REQUEST,
  CHECK_ANSWER_ERROR,
  CHECK_ANSWER_SUCCESS,
  CLEAR_FEEDBACK,
  CLEAR_SESSION
} from '../actions/check-answer';
import { TOGGLE_PERFORMANCE } from '../actions/performance';
    
const initialState = {
  feedback: null,
  overallAnswered: 0,
  overallCorrect: 0,
  totalAnswered: 0,
  totalCorrect:0,
  loading: false,
  error: null,
  displayPerformance: false
};
    
export default function checkAnswerReducer(state = initialState, action) {
  if (action.type === CLEAR_FEEDBACK) {
    return Object.assign({}, state, {
      feedback: null
    }); 
  } else if (action.type === CLEAR_SESSION) {
    return Object.assign({}, state, {
      totalAnswered: null,
      totalCorrect: null
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
        error: null,
        overallAnswered: action.feedback.questionsAnswered,
        overallCorrect: action.feedback.questionsCorrect,
        loading: false
      }); 
    }
    return Object.assign({}, state, {
      feedback: action.feedback,
      totalAnswered: state.totalAnswered+1,
      error: null,
      overallAnswered: action.feedback.questionsAnswered,
      overallCorrect: action.feedback.questionsCorrect
    }); 
  }
  else if (action.type === CHECK_ANSWER_ERROR) {
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  }
  else if(action.type === TOGGLE_PERFORMANCE){
    return Object.assign({}, state, {
      displayPerformance: !state.displayPerformance
    });
  }
  return state;
}
    