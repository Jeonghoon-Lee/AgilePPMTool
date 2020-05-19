import * as actionTypes from './actionTypes'
import axios from 'axios'
import { setJWT } from '../../utils/authUtils'
import jwt_decode from 'jwt-decode'

export const createNewUserSuccess = (user) => {
  return {
    type: actionTypes.CREATE_USER_SUCCESS,
    user: user,
  }
}

export const createNewUserFail = (error) => {
  return {
    type: actionTypes.CREATE_USER_FAIL,
    error: error
  }
}

export const loginSuccess = (authUser) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user: authUser,
  }
}

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error
  }
}

export const checkAuthTimeout = (expirationTime) => {
  console.log('called check TIMEOUT', expirationTime);
  return dispatch => {
    setTimeout(() => {
      console.log('Check TIMEOUT');
      dispatch(logout())
    }, expirationTime * 1000)
  }
}

export const createNewUser = (newUser, history) => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/users/register', newUser)
      history.push('/users/login')    
      dispatch(createNewUserSuccess(res.data))
    } catch (error) {
      dispatch(createNewUserFail(error.response.data));
    }
  }
}

export const tryLogin = (user) => {
  return async dispatch => {
    try {
      const res = await axios.post('/api/users/login', user)
      const { token } = res.data
      localStorage.setItem('JWT', token)
      setJWT(token)
      const decoded = jwt_decode(token)

      dispatch(loginSuccess(decoded))
      dispatch(checkAuthTimeout(decoded.exp - Date.now() / 1000))
    } catch (error) {
      // console.log(error)
      // console.log(error.response.data)
      dispatch(loginFail(error.response.data))
    }
  }
}

export const logout = (user) => {
  console.log('action => logout called');
  
  localStorage.removeItem('JWT')
  return {
    type: actionTypes.LOGOUT
  }
}

export const clearLoginError = () => {
  return {
    type: actionTypes.CLEAR_LOGIN_ERROR
  }
}

export const checkAuthState = () => {
  return dispatch => {
    const authToken = localStorage.getItem('JWT')
    if (!authToken) {
      dispatch(logout())
    } else {
      const decoded_token = jwt_decode(authToken)
      const currentTime = Date.now() / 1000
      if (decoded_token.exp <= currentTime) {
        dispatch(logout())
      } else {
        setJWT(authToken)
        dispatch(checkAuthTimeout(decoded_token.exp - Date.now() / 1000))
      }
    }
  }
}