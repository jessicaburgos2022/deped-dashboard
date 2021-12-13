import {
  GET_MONITOREDPPA_REQUEST,
  GET_MONITOREDPPA_SUCCESS,
  GET_MONITOREDPPA_FAILED,
  GET_CONDUCTEDWITHINTIMEFRAME_REQUEST,
  GET_CONDUCTEDWITHINTIMEFRAME_SUCCESS,
  GET_CONDUCTEDWITHINTIMEFRAME_FAILED,
  GET_BudgetUtilizationRate_REQUEST,
  GET_BudgetUtilizationRate_SUCCESS,
  GET_BudgetUtilizationRate_FAILED,
  GET_SATISFACTORYRESULT_REQUEST,
  GET_SATISFACTORYRESULT_SUCCESS,
  GET_SATISFACTORYRESULT_FAILED
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

export const fetchChart2 = () => async (dispatch) => {
  await dispatch({ type: GET_SATISFACTORYRESULT_REQUEST });
  try {
    const { data } = await axios.get(`/api/dashboard/chart2`);
    dispatch({
      type: GET_SATISFACTORYRESULT_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_SATISFACTORYRESULT_FAILED,
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

export const fetchChart4 = () => async (dispatch) => {
  await dispatch({ type: GET_BudgetUtilizationRate_REQUEST });
  try {
    const { data } = await axios.get(`/api/dashboard/chart4`);
    dispatch({
      type: GET_BudgetUtilizationRate_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_BudgetUtilizationRate_FAILED,
      payload: ""
    });
  }
};