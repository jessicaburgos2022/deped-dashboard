import {
  SVN_INFO_REQUEST,
  SVN_INFO_SUCCESS,
  SVN_INFO_FAILED,
  SEARCH_INTERFACE_REQUEST,
  SEARCH_INTERFACE_SUCCESS,
  SEARCH_INTERFACE_FAILED,
  SEARCH_BAPI_BY_INTERFACE_REQUEST,
  SEARCH_BAPI_BY_INTERFACE_SUCCESS,
  INSERT_INTERFACE_REQUEST,
  INSERT_INTERFACE_FAILED,
  EDIT_INTERFACE_REQUEST,
  EDIT_INTERFACE_FAILED,
  DELETE_INTERFACE_REQUEST,
  DELETE_INTERFACE_FAILED,
  DELETE_MULTIPLEINTERFACE_REQUEST,
  DELETE_MULTIPLEINTERFACE_SUCCESS,
  DELETE_MULTIPLEINTERFACE_FAILED,
} from "../constants/interfaceConstants";
import axios from "../helpers/axios";

export const getSVNInformation = (url, service) => async (dispatch) => {
  await dispatch({ type: SVN_INFO_REQUEST, payload: service });
  try {
    const { data } = await axios.post(`/api/interface/svn`, { path: url });
    dispatch({
      type: SVN_INFO_SUCCESS,
      payload: { interface: service, data, loading: false },
    });
  } catch (error) {
    dispatch({
      type: SVN_INFO_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchInterface = (param) => async (dispatch) => {
  await dispatch({ type: SEARCH_INTERFACE_REQUEST, payload: param });
  try {
    const { data } = await axios.post(`/api/interface/`, { param });
    dispatch({
      type: SEARCH_INTERFACE_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: SEARCH_INTERFACE_FAILED,
      payload:""
    });
  }
};

export const getBapiByInterface = (service) => async (dispatch) => {
  await dispatch({ type: SEARCH_BAPI_BY_INTERFACE_REQUEST, payload: service });
  try {
    const { data } = await axios.get(`/api/bapis/${service}`);
    dispatch({
      type: SEARCH_BAPI_BY_INTERFACE_SUCCESS,
      payload: { interface: service, data, loading: false },
    });
  } catch (error) {
    dispatch({
      type: SEARCH_INTERFACE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const insertInterface = (param) => async (dispatch) => {
  await dispatch({ type: INSERT_INTERFACE_REQUEST, payload: param });
  try {
    const { data } = await (await axios.post(`/api/interface/insert`, {param}));
    return data[0];
  } catch (error) {
    dispatch({
      type: INSERT_INTERFACE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const editInterface = (param) => async (dispatch) => {
  await dispatch({ type: EDIT_INTERFACE_REQUEST, payload: param });
  try {
    const { data } = await (await axios.post(`/api/interface/edit`, {param}));
    return data[0];
  } catch (error) {
    dispatch({
      type: EDIT_INTERFACE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteInterface = (param) => async (dispatch) => {
  await dispatch({ type: DELETE_INTERFACE_REQUEST, payload: param });
  try {
    const { data } = await (await axios.post(`/api/interface/delete`, {param}));
    return data[0];
  } catch (error) {
    dispatch({
      type: DELETE_INTERFACE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteMultipleInterface = (param) => async (dispatch) => {
  await dispatch({ type: DELETE_MULTIPLEINTERFACE_REQUEST, payload: param });
  try {
    const { data } = await (await axios.post(`/api/interface/deleteMulti`, {param}));
    return data;
  } catch (error) {
    dispatch({
      type: DELETE_MULTIPLEINTERFACE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const insertTask = (param) => async (dispatch) => {
  await dispatch({ type: INSERT_INTERFACE_REQUEST, payload: param });
  try {
    const { data } = await (await axios.post(`/api/interface/task`, {param}));
    return data[0];
  } catch (error) {
    dispatch({
      type: INSERT_INTERFACE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};