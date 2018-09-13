import checkAnswerReducer from './check-answer';
import { clearFeedback, clearSession, checkAnswerRequest, checkAnswerSuccess, checkAnswerError } from '../actions/check-answer';

describe('checkAnswerReducer', () => {
  it('should handle the clearFeedback action', () => {
    const oldState={
      feedback: true
    };
    const state =checkAnswerReducer(oldState, clearFeedback());
    expect(state.feedback).toEqual(null); 
  });
  it('should handle the clearSession action', () => {
    const oldState={
      totalAnswered: 10,
      totalCorrect: 6
    };
    const state = checkAnswerReducer(oldState, clearSession());
    expect(state.totalAnswered).toEqual(null);
    expect(state.totalCorrect).toEqual(null); 
  });
  it('should handle the checkAnswerRequest action', () => {
    const oldState={
      loading: false
    };
    const state = checkAnswerReducer(oldState, checkAnswerRequest());
    expect(state.loading).toEqual(true); 
  });
  it('should handle the checkAnswerSuccess action', () => {
    const oldState={
      feedback: null,
      totalAnswered: 0,
      totalCorrect: 0,
      overallAnswered: 0,
      overallCorrect: 0,
    };
    const data = {
      questionsAnswered: 12,
      questionsCorrect: 8,
      feedback: true
    };
   
    const state = checkAnswerReducer(oldState, checkAnswerSuccess(data));
    expect(state.feedback).toEqual(data);
    expect(state.totalAnswered).toEqual(1);
    expect(state.totalCorrect).toEqual(1);
    expect(state.overallAnswered).toEqual(data.questionsAnswered);
    expect(state.overallCorrect).toEqual(data.questionsCorrect); 
  });
  it('should handle the checkAnswerError action', () => {
    const oldState={
      error: null
    };
    const error = 'uh oh';
    const state = checkAnswerReducer(oldState, checkAnswerError(error));
    expect(state.error).toEqual(error); 
  });
});