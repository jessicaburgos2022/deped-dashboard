import {
  LIST_BUSINESSUNIT_REQUEST,
  LIST_BUSINESSUNIT_SUCCESS,
  LIST_BUSINESSUNIT_FAILED,
  GET_BU_DEPLOYMENTS_REQUEST,
  GET_BU_DEPLOYMENTS_SUCCESS,
  GET_BU_DEPLOYMENTS_FAILED,
  GET_MOST_DEPLOYED_REQUEST,
  GET_MOST_DEPLOYED_SUCCESS,
  GET_MOST_DEPLOYED_FAILED
} from "../constants/appConstants";
import axios from "../helpers/axios";

export const listBusinessUnit = () => async (dispatch) => {
  await dispatch({ type: LIST_BUSINESSUNIT_REQUEST });
  try {
    const { data } = await axios.get(`/api/app/businessunit`);
    dispatch({
      type: LIST_BUSINESSUNIT_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: LIST_BUSINESSUNIT_FAILED,
      payload: ""
    });
  }
};

export const getBUDeployments = () => async (dispatch) => {
  await dispatch({ type: GET_BU_DEPLOYMENTS_REQUEST });
  try {
    const { data } = await axios.get(`/api/app/businessunit/deployments`);
    dispatch({
      type: GET_BU_DEPLOYMENTS_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_BU_DEPLOYMENTS_FAILED,
      payload: ""
    });
  }
};
export const getMostDeployed = (pageSize) => async (dispatch) => {
  await dispatch({ type: GET_MOST_DEPLOYED_REQUEST });
  try {
    const { data } = await axios.get(`/api/app/businessunit/mostdeployed/` + pageSize);
    dispatch({
      type: GET_MOST_DEPLOYED_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_MOST_DEPLOYED_FAILED,
      payload: ""
    });
  }
};