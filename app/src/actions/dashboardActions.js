import {
    GET_MONITOREDPPA_REQUEST,
    GET_MONITOREDPPA_SUCCESS,
    GET_MONITOREDPPA_FAILED
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