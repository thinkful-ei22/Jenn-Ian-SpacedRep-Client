import { CHECK_ANSWER_REQUEST, checkAnswerRequest, checkAnswerError, CHECK_ANSWER_ERROR, checkAnswerSuccess, CHECK_ANSWER_SUCCESS, clearFeedback, CLEAR_FEEDBACK, clearSession, CLEAR_SESSION, checkAnswer } from './check-answer';

describe('checkAnswerRequest', ()=> {
  it('should return the action', () =>{
    const action = checkAnswerRequest();
    expect(action.type).toEqual(CHECK_ANSWER_REQUEST);
  });
});

describe('checkAnswerError', ()=> {
  it('should return the action', () =>{
    const action = checkAnswerError();
    expect(action.type).toEqual(CHECK_ANSWER_ERROR);
  });
});

describe('checkAnswerSuccess', ()=> {
  it('should return the action', () =>{
    const action = checkAnswerSuccess();
    expect(action.type).toEqual(CHECK_ANSWER_SUCCESS);
  });
}); 

describe('clearFeedback', ()=> {
  it('should return the action', () =>{
    const action = clearFeedback();
    expect(action.type).toEqual(CLEAR_FEEDBACK);
  });
});

describe('clearSession', ()=> {
  it('should return the action', () =>{
    const action = clearSession();
    expect(action.type).toEqual(CLEAR_SESSION);
  });
});

//   describe('checkAnswer', ()=> {
//     it('should return the action', () =>{
//       const action = checkAnswer();
     
//     });
//   });  test asynch action?