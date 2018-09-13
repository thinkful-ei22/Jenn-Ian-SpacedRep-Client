import { FETCH_QUESTION_SUCCESS, FETCH_QUESTION_REQUEST, fetchQuestionRequest, fetchQuestionSuccess, fetchQuestionError, FETCH_QUESTION_ERROR } from './questions';

describe('fechQuestionRequest', ()=> {
  it('should return the action', () =>{
    const action = fetchQuestionRequest();
    expect(action.type).toEqual(FETCH_QUESTION_REQUEST);
  });
});
  
describe('fetchQuestionSuccess', ()=> {
  it('should return the action', () =>{
    const action = fetchQuestionSuccess();
    expect(action.type).toEqual(FETCH_QUESTION_SUCCESS);
  });
});
  
describe('fetchQuestionError', ()=> {
  it('should return the action', () =>{
    const action = fetchQuestionError();
    expect(action.type).toEqual(FETCH_QUESTION_ERROR);
  });
}); 
  