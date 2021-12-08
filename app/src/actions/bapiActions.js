import {
  BAPI_GET_DETAILS_REQUEST,
  BAPI_GET_DETAILS_SUCCESS,
  BAPI_GET_DETAILS_FAIL,
  BAPI_UPDATE_REQUEST,
  BAPI_UPDATE_SUCCESS,
  BAPI_UPDATE_FAIL,
  BAPI_ADD_REQUEST,
  BAPI_ADD_SUCCESS,
  BAPI_ADD_FAIL,
  BAPI_DELETE_REQUEST,
  BAPI_DELETE_SUCCESS,
  BAPI_DELETE_FAIL,
  BAPI_GET_BUS_REQUEST,
  BAPI_GET_BUS_SUCCESS,
  BAPI_GET_BUS_FAIL,
  BAPI_GET_INTERFACES_REQUEST,
  BAPI_GET_INTERFACES_FAIL,
  BAPI_GET_INTERFACES_SUCCESS,
} from '../constants/bapiConstants';
import axios from '../helpers/axios';

export const updateBapi = (callback, payload) => async (dispatch) => {
  await dispatch({ type: BAPI_UPDATE_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.put(`/api/bapis`, payload, config);
    dispatch({
      type: BAPI_UPDATE_SUCCESS,
      payload: payload,
    });
    callback(data);
  } catch (error) {
    dispatch({
      type: BAPI_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addBapiInfo = (callback, payload) => async (dispatch) => {
  await dispatch({ type: BAPI_ADD_REQUEST });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const { data } = await axios.post(`/api/bapis`, payload, config);
    dispatch({
      type: BAPI_ADD_SUCCESS,
      payload: payload,
    });
    callback(data);
  } catch (error) {
    dispatch({
      type: BAPI_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteBapiRecord = (callback, payload) => async (dispatch) => {
  await dispatch({ type: BAPI_DELETE_REQUEST });

  try {
    await axios.delete(`/api/bapis/${payload.id}`);

    dispatch({
      type: BAPI_DELETE_SUCCESS,
      payload: payload,
    });
    callback();
  } catch (error) {
    dispatch({
      type: BAPI_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getActiveBUS = () => async (dispatch) => {
  await dispatch({ type: BAPI_GET_BUS_REQUEST });
  try {
    const { data } = await axios.get(`/api/bapis/bus`);
    dispatch({
      type: BAPI_GET_BUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BAPI_GET_BUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getInterfacesByBU = (id) => async (dispatch) => {
  await dispatch({ type: BAPI_GET_INTERFACES_REQUEST });
  try {
    const { data } = await axios.get(`/api/bapis/bus/${id}`);
    dispatch({
      type: BAPI_GET_INTERFACES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BAPI_GET_INTERFACES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getBapisByInterfaceId = (serviceId) => async (dispatch) => {
  await dispatch({ type: BAPI_GET_DETAILS_REQUEST, payload: serviceId });
  try {
    const { data } = await axios.get(`/api/bapis/${serviceId}`);
    const updata = {
      service_name: serviceId,
      details: data,
    };
    dispatch({
      type: BAPI_GET_DETAILS_SUCCESS,
      payload: updata,
    });
  } catch (error) {
    dispatch({
      type: BAPI_GET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
