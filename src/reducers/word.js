import {
  FETCH_WORD_SUCCESS,
  FETCH_WORD_REQUEST,
  FETCH_WORD_ERROR
} from '../actions/words';
  
const initialState = {
  currentWord: '',
  loading: false,
  error: null
};
  
export default function wordReducer(state = initialState, action) {
  if (action.type === FETCH_WORD_REQUEST) {
    console.log('word request fired');
    // return Object.assign({}, state, {
    //   loading: true,
    //   error: null
    // });
  }
  else if (action.type === FETCH_WORD_SUCCESS) {
    console.log('word success fired');
    // return Object.assign({}, state, {
    //   currentWord: action.word,
    //   error: null
    // }); 
  }
  else if (action.type === FETCH_WORD_ERROR) {
    console.log('word error fired');
    // return Object.assign({}, state, {
    //   error: action.error
    // });
  }
  return state;
}
  