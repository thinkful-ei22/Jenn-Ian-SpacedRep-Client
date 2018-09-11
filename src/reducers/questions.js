import {
  FETCH_QUESTION_SUCCESS,
  FETCH_QUESTION_REQUEST,
  FETCH_QUESTION_ERROR
} from '../actions/questions';
  
const initialState = {
  questions: [],
  currentQuestion: {},
  loading: false,
  error: null
};
  
export default function questionReducer(state = initialState, action) {
  if (action.type === FETCH_QUESTION_REQUEST) {
    console.log('question request fired');
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  else if (action.type === FETCH_QUESTION_SUCCESS) {
    console.log('action.question=', action.question);
    return Object.assign({}, state, {
      questions: [...action.question],
      currentQuestion: action.question[0],
      error: null
    }); 
  }
  else if (action.type === FETCH_QUESTION_ERROR) {
    console.log('question error fired');
    return Object.assign({}, state, {
      error: action.error
    });
  }
  return state;
}
  