// import mappingTable from "../api/mappingTable";
import {
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILED,
  GET_ACTIONS_REQUEST,
  GET_ACTIONS_SUCCESS,
  GET_ACTIONS_FAILED,
  INSERT_ROLEACTION_REQUEST,
  INSERT_ROLEACTION_SUCCESS,
  INSERT_ROLEACTION_FAILED,
  GET_ROLES_LIST_REQUEST,
  GET_ROLES_LIST_SUCCESS,
  GET_ROLES_LIST_FAILED,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAILED,
  CREATE_ROLE_REQUEST,
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_FAILED,
  SEARCH_USER_ROLE_REQUEST,
  SEARCH_USER_ROLE_SUCCESS,
  SEARCH_USER_ROLE_FAILED
} from "../constants/roleConstants";
import axios from "../helpers/axios";
import {openAlert} from "./alertActions";
export const searchRoles = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ROLES_REQUEST,
      payload: null,
    });
    const res = await axios.get(`/api/roles`);
    dispatch({
      type: GET_ROLES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ROLES_FAILED,
      payload: { msg: error.message },
    });
  }
};
export const getAllRoles = () => async (dispatch) => {
  
  try {
    dispatch({
      type: GET_ROLES_LIST_REQUEST,
      payload: null,
    });
    const res = await axios.get(`/api/roles/search`);
    dispatch({
      type: GET_ROLES_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ROLES_LIST_FAILED,
      payload: { msg: error.message },
    });
  }
};
export const searchActions = () => async (dispatch) => {
    try {
      dispatch({
        type: GET_ACTIONS_REQUEST,
        payload: null,
      });
      const res = await axios.get(`/api/roles/actions`);
      dispatch({
        type: GET_ACTIONS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: GET_ACTIONS_FAILED,
        payload: { msg: error.message },
      });
    }
  };
  export const createRole = (title, isActive) => async (dispatch) => {
    try{
      dispatch({
        type: CREATE_ROLE_REQUEST,
        payload: null
      });
      const res = await axios.post(`/api/roles`,{
        title,
        isActive
      });
      dispatch(
        openAlert(
          res.data[0].Message.split('|')[1],
          res.data[0].Message.split('|')[0] === 'Success'?'success':'warning'
        )
      );
      dispatch({
        type: CREATE_ROLE_SUCCESS,
        payload: res.data
      });
    }
    catch(error) {
      dispatch({
        type: CREATE_ROLE_FAILED,
        payload: {msg: error.message}
      });
    }
  }
  export const deleteRole = (roleId) => async (dispatch) => {
    try{
      dispatch({
        type: DELETE_ROLE_REQUEST,
        payload: null
      });
      const res = await axios.delete(`/api/roles/${roleId}`);
      dispatch(
        openAlert(
          res.data[0].Message.split('|')[1],
          res.data[0].Message.split('|')[0] === 'Success'?'success':'warning'
        )
      );
      dispatch({
        type: DELETE_ROLE_SUCCESS,
        payload: res.data
      });
    }
    catch(error) {
      dispatch({
        type: DELETE_ROLE_FAILED,
        payload: {msg: error.message}
      });
    }
  }
  export const submitRoleUpdate = (roleId, actionIds, isActive) => async (dispatch) => {
    try{
      dispatch({
        type: INSERT_ROLEACTION_REQUEST,
        payload: null
      });
      const res = await axios.put(`/api/roles`,{
        roleId,
        actionIds,
        isActive : isActive
      });
      dispatch(
        openAlert(
          res.data[0].Message.split('|')[1],
          res.data[0].Message.split('|')[0] === 'Success'?'success':'warning'
        )
      );
      dispatch({
        type: INSERT_ROLEACTION_SUCCESS,
        payload: res.data
      });
    }
    catch(error) {
      dispatch({
        type: INSERT_ROLEACTION_FAILED,
        payload: {msg: error.message}
      });
    }
  }
  export const searchRoleAction = () => async (dispatch) => {
    try {
      dispatch({
        type: SEARCH_USER_ROLE_REQUEST,
        payload: null,
      });
      const res = await axios.get(`/api/roles/roleaction`);
      dispatch({
        type: SEARCH_USER_ROLE_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: SEARCH_USER_ROLE_FAILED,
        payload: { msg: error.message },
      });
    }
  };