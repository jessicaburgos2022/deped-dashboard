import {
  GET_OUTPUTTYPE_LIST_REQUEST,
  GET_OUTPUTTYPE_LIST_SUCCESS,
  GET_OUTPUTTYPE_LIST_FAILED,
  GET_KRABYDEPARTMENT_REQUEST,
  GET_KRABYDEPARTMENT_SUCCESS,
  GET_KRABYDEPARTMENT_FAILED,
  GET_PROJECTBYKRA_REQUEST,
  GET_PROJECTBYKRA_SUCCESS,
  GET_PROJECTBYKRA_FAILED,
  GET_PROJECTBYDEPARTMENT_REQUEST,
  GET_PROJECTBYDEPARTMENT_SUCCESS,
  GET_PROJECTBYDEPARTMENT_FAILED,
  GET_DEPARTMENTLIST_REQUEST,
  GET_DEPARTMENTLIST_SUCCESS,
  GET_DEPARTMENTLIST_FAILED
} from "../constants/appConstants";
import axios from "../helpers/axios";

export const fetchOutputTypes = () => async (dispatch) => {
  await dispatch({ type: GET_OUTPUTTYPE_LIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/app/outputtype`);
    dispatch({
      type: GET_OUTPUTTYPE_LIST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_OUTPUTTYPE_LIST_FAILED,
      payload: ""
    });
  }
};

export const fetchKRAByDepartmentId = (deptId) => async (dispatch) => {
  await dispatch({ type: GET_KRABYDEPARTMENT_REQUEST });
  try {
    const { data } = await axios.get(`/api/app/kra/${deptId}`);
    dispatch({
      type: GET_KRABYDEPARTMENT_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_KRABYDEPARTMENT_FAILED,
      payload: ""
    });
  }
};

export const fetchProjectByKRAId = (kraId) => async (dispatch) => {
  await dispatch({ type: GET_PROJECTBYKRA_REQUEST });
  try {
    const { data } = await axios.get(`/api/app/project/${kraId}`);
    dispatch({
      type: GET_PROJECTBYKRA_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_PROJECTBYKRA_FAILED,
      payload: ""
    });
  }
};


export const fetchProjectByDepartment = (deptId) => async (dispatch) => {
  await dispatch({ type: GET_PROJECTBYDEPARTMENT_REQUEST });
  try {
    const { data } = await axios.get(`/api/app/project/department/${deptId}`);
    dispatch({
      type: GET_PROJECTBYDEPARTMENT_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_PROJECTBYDEPARTMENT_FAILED,
      payload: ""
    });
  }
};

export const fetchDepartmentList = () => async (dispatch) => {
  await dispatch({ type: GET_DEPARTMENTLIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/app/department`);
    dispatch({
      type: GET_DEPARTMENTLIST_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: GET_DEPARTMENTLIST_FAILED,
      payload: ""
    });
  }
};