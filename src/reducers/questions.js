import {
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_ERROR
} from '../actions/questions';
  
const initialState = {
  currentQuestion: null,
  questionList: [],
  loading: false,
  error: null
};
  
export default function questionReducer(state = initialState, action) {
  if (action.type === FETCH_QUESTION_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  else if (action.type === FETCH_QUESTION_SUCCESS) {
    return Object.assign({}, state, {
      currentQuestion: action.question.firstQuestion,
      questionList: [...state.questionList, ...action.question.questions],
      error: null
    }); 
  }
  else if (action.type === FETCH_QUESTION_ERROR) {
    return Object.assign({}, state, {
      error: action.error,
      loading: false
    });
  }
  return state;
}
  