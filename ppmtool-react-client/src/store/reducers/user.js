import * as actionTypes from '../actions/actionTypes'

const initialState = {
  user: {},
  error: {},
  isAuthenticated: false,
}

const createNewUserSuccess = (state, action) => {
  return {
    ...state,
    user: action.user,
    error: {},
    isAuthenticated: false,
  }
}

const createNewUserFail = (state, action) => {
  return {
    ...state,
    error: action.error
  }
}

const loginSuccess = (state, action) => {
  console.log('login success', action.user);
  
  return {
    ...state,
    user: action.user,
    error:{},
    isAuthenticated: true,
  }
}

const loginFail = (state, action) => {
  return {
    ...state,
    user: {},
    error: action.error,
    isAuthenticated: false,
  }
}

const clearLoginError = (state, action) => {
  return {
    ...state,
    error: {}
  }
}

const logout = (state, action) => {
  console.log('logout called in reducer.');
  
  return {
    ...state,
    user: {},
    error: {},
    isAuthenticated: false,
  }
}

const reducer = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER_SUCCESS: return createNewUserSuccess(state, action)
    case actionTypes.CREATE_USER_FAIL: return createNewUserFail(state, action)

    case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action)
    case actionTypes.LOGIN_FAIL: return loginFail(state, action)
    case actionTypes.CLEAR_LOGIN_ERROR: return clearLoginError(state, action)

    case actionTypes.LOGOUT: return logout(state, action)

    default: return state;
  }

}

export default reducer