import {
  GET_OUTPUTTYPE_LIST_REQUEST,
  GET_OUTPUTTYPE_LIST_SUCCESS,
  GET_OUTPUTTYPE_LIST_FAILED,
  GET_KRABYDEPARTMENT_REQUEST,
  GET_KRABYDEPARTMENT_SUCCESS,
  GET_KRABYDEPARTMENT_FAILED
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

export const fetchKRAByDepartmentId = () => async (dispatch) => {
  await dispatch({ type: GET_KRABYDEPARTMENT_REQUEST });
  try {
    const { data } = await axios.get(`/api/app/kra/1/2`);
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