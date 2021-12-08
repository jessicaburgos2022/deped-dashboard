import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
    USER_LOG_FAIL,
    USER_LOG_REQUEST,
    USER_LOG_SUCCESS,
    USER_LOGOUT,
  } from '../constants/userConstants';
  
  export const user = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
      case USER_LOGIN_REQUEST:
        return { loading: true };
      case USER_LOGIN_SUCCESS:
        return { loading: false, userInfo: payload };
      case USER_LOGIN_FAIL:
        return { loading: false, error: payload };
      case USER_LOGOUT:
        localStorage.removeItem("token");
        localStorage.removeItem("state");
        document.location = "/login";
        return {};
      case USER_LOAD_REQUEST:
        return { loading: true };
      case USER_LOAD_SUCCESS:
        return { loading: false, userInfo: payload };
      case USER_LOAD_FAIL:
        return { loading: false, error: payload };
      default:
        return state;
    }
  };
  
  export const userLogReducer = (state = {}, action) => {
    const { type, payload } = action;
    switch (type) {
      case USER_LOG_REQUEST:
        return { loading: true };
      case USER_LOG_SUCCESS:
        return { loading: false, success: true };
      case USER_LOG_FAIL:
        return { loading: false, error: payload, success: false };
      default:
        return state;
    }
  };
  