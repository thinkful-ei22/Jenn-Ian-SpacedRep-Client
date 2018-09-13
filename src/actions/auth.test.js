import { setAuthToken, SET_AUTH_TOKEN, CLEAR_AUTH, clearAuth, authRequest, AUTH_REQUEST, authSuccess, AUTH_SUCCESS, authError, AUTH_ERROR } from './auth';

describe('setAuthToken', ()=> {
  it('should return the action', () =>{
    const authToken = '5';
    const action = setAuthToken(authToken);
    expect(action.type).toEqual(SET_AUTH_TOKEN);
    expect(action.authToken).toEqual(authToken);
  });
});

describe('clearAuth', ()=> {
  it('should return the action', () =>{
    const action = clearAuth();
    expect(action.type).toEqual(CLEAR_AUTH);
  });
});

describe('authRequest', ()=> {
  it('should return the action', () =>{
    const action = authRequest();
    expect(action.type).toEqual(AUTH_REQUEST);
  });
});

describe('authSuccess', ()=> {
  it('should return the action', () =>{
    const action = authSuccess();
    expect(action.type).toEqual(AUTH_SUCCESS);
  });
});

describe('authError', ()=> {
  it('should return the action', () =>{
    const action = authError();
    expect(action.type).toEqual(AUTH_ERROR);
  });
});
