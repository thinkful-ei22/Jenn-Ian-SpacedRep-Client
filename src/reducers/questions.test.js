import questionReducer from './questions';
import { fetchQuestionRequest, fetchQuestionSuccess, fetchQuestionError } from '../actions/questions';

describe('questionReducer', () => {
  it('should handle the fetchQuestionRequest action', () => {
    const oldState = {
      loading: false
    };
    const state = questionReducer(oldState, fetchQuestionRequest());
    expect();
  });
  it('should handle the fetchQuestionSuccess action', () => {
    const oldState = {
      currentQuestion: null,
      questionList: [],
    };
    const question = {
      firstQuestion: {rojo: 'red'},
      questions: [{rojo: 'red'}, {azul: 'blue'}]
    };
    const state = questionReducer(oldState, fetchQuestionSuccess(question));
    expect(state.currentQuestion).toEqual(question.firstQuestion);
    expect(state.questionList).toEqual(question.questions);
  });
  it('should handle the fetchQuestionError action', () => {
    const oldState = {
      error: null
    };
    const error = 'aw man!';
    const state = questionReducer(oldState, fetchQuestionError(error));
    expect(state.error).toEqual(error);
  });
});