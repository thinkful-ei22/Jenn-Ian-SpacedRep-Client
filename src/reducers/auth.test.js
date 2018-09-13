import { setAuthToken, clearAuth, authRequest, authSuccess, authError } from '../actions/auth';
import reducer from './auth';

describe('reducer', () => {
  it('should handle the setAuthToken action', () => {
    const oldState = {
      authToken: null};
    const authToken = 5;

    const state = reducer(oldState, setAuthToken(authToken));
    expect(state.authToken).toEqual(authToken);
  });
  it('should handle the clearAuth action', () => {
    const oldState = {
      authToken: 5,
      currentUser: {name: 'bob'}
    };
    const state = reducer(oldState, clearAuth());
    expect(state.authToken).toEqual(null);
    expect(state.currentUser).toEqual(null);
  });
  it('should handle the authRequest action', () => {
    const oldState = {
      loading: false,
    };
    const state = reducer(oldState, authRequest());
    expect(state.loading).toEqual(true);
  });
  it('should handle the authSuccess action', () => {
    const oldState = {
      currentUser: null
    };
    const currentUser = {name: 'bob'};
    const state = reducer(oldState, authSuccess(currentUser));
    expect(state.currentUser).toEqual(currentUser);
  });
  it('should handle the authError action', () => {
    const oldState = {
      error: null
    };
    const error = 'oh no';
    const state = reducer(oldState, authError(error));
    expect(state.error).toEqual(error);
  });
});