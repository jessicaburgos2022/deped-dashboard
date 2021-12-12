import {
    GET_MONITOREDPPA_REQUEST,
    GET_MONITOREDPPA_SUCCESS,
    GET_MONITOREDPPA_FAILED,
    GET_CONDUCTEDWITHINTIMEFRAME_REQUEST,
    GET_CONDUCTEDWITHINTIMEFRAME_SUCCESS,
    GET_CONDUCTEDWITHINTIMEFRAME_FAILED
}
from '../constants/dashboardConstants';


import axios from "../helpers/axios";

export const fetchChart1 = () => async (dispatch) => {
    await dispatch({ type: GET_MONITOREDPPA_REQUEST });
    try {
      const { data } = await axios.get(`/api/dashboard/chart1`);
      dispatch({
        type: GET_MONITOREDPPA_SUCCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: GET_MONITOREDPPA_FAILED,
        payload: ""
      });
    }
  };

  
export const fetchChart3 = () => async (dispatch) => {
    await dispatch({ type: GET_CONDUCTEDWITHINTIMEFRAME_REQUEST });
    try {
      const { data } = await axios.get(`/api/dashboard/chart3`);
      dispatch({
        type: GET_CONDUCTEDWITHINTIMEFRAME_SUCCESS,
        payload: data,
      });
    } catch (e) {
      dispatch({
        type: GET_CONDUCTEDWITHINTIMEFRAME_FAILED,
        payload: ""
      });
    }
  };