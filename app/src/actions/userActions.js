import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOAD_REQUEST,
  USER_LOAD_SUCCESS,
  USER_LOAD_FAIL,
  USER_LOG_REQUEST,
  USER_LOG_SUCCESS,
  USER_LOG_FAIL,
  USER_LOGOUT,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  SEARCH_USER_REQUEST,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_FAILED,
  CHANGEPASSWORD_REQUEST,
  CHANGEPASSWORD_SUCCESS,
  CHANGEPASSWORD_FAILED
} from "../constants/userConstants";
import service from "../helpers/axios";
import Swal from 'sweetalert2';

export const changePassword = (param) => async (dispatch) => {
  try {
    dispatch({ type: CHANGEPASSWORD_REQUEST });
    const { data } = await service.post(
      '/api/users/password',
      param
    );
    return data;
  } catch (error) {
    dispatch({
      type: CHANGEPASSWORD_FAILED
    });
  }
};


export const resetPassword = (param) => async (dispatch) => {
  try {
    const { data } = await service.post(
      '/api/users/password/reset',
      param
    );
    return data;
  } catch (error) {
  }
};

export const searchUsers = () => async (dispatch) => {
  await dispatch({ type: SEARCH_USER_REQUEST });
  try {
    const { data } = await service.get(`/api/users/search`);
    await dispatch({ type: SEARCH_USER_SUCCESS, payload: data });

  } catch (e) {
    dispatch({
      type: SEARCH_USER_FAILED,
      payload: []
    });
  }
};
export const register = (param) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const { data } = await service.post(
      '/api/auth/register',
      param
    );
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAILED
    });
  }
};
export const login = (callback, username, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
    };

    const { data } = await service.post(
      '/api/auth/account',
      { username, password },
      config
    );
    if (data.result && (data.result !== "Success")) {
      Swal.fire({
        title: data.message,
        text: 'Please try again.',
        icon: "error",
        dangerMode: true
      });
    }
    else {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
      callback(data);
    }
  } catch (error) {
    // dispatch({
    //   type: USER_LOGIN_FAIL,
    //   payload:
    //     error.response && error.response.data.message
    //       ? error.response.data.message
    //       : error.message,
    // });
  }
};

export const loadUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOAD_REQUEST });
    const { data } = await service.get(`/api/users/${userId}`);
    dispatch({
      type: USER_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOAD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logUser = (user) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    dispatch({ type: USER_LOG_REQUEST });

    const { data } = await service.put('/api/users/log', user, config);
    dispatch({
      type: USER_LOG_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOG_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  // localStorage.removeItem('userInfo');

  dispatch({ type: USER_LOGOUT });
  // dispatch({ type: SELECT_RESET });
};
