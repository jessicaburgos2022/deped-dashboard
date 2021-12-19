import {
SEARCH_PROJECT_OUTPUT_REQUEST,
SEARCH_PROJECT_OUTPUT_SUCCESS,
SEARCH_PROJECT_OUTPUT_FAILED,
ADD_PROJECT_OUTPUT_REQUEST,
ADD_PROJECT_OUTPUT_SUCCESS,
ADD_PROJECT_OUTPUT_FAILED,
EDIT_PROJECT_OUTPUT_REQUEST,
EDIT_PROJECT_OUTPUT_SUCCESS,
EDIT_PROJECT_OUTPUT_FAILED

} from "../constants/projectConstants";
import axios from "../helpers/axios";

export const searchProject = (param) => async (dispatch) => {
    await dispatch({ type: SEARCH_PROJECT_OUTPUT_REQUEST });
    try {
        const { data } = await axios.get(`/api/project`);
        await dispatch({ type: SEARCH_PROJECT_OUTPUT_SUCCESS, payload: data });

    } catch (e) {
        dispatch({
            type: SEARCH_PROJECT_OUTPUT_FAILED,
            payload: []
        });
    }

};
export const addProject = (param) => async (dispatch) => {
    await dispatch({ type: ADD_PROJECT_OUTPUT_REQUEST });
    try {
        const { data } = await axios.post(`/api/project`,param);
        await dispatch({ type: ADD_PROJECT_OUTPUT_SUCCESS, payload: data });
        return data;
    } catch (e) {
        dispatch({
            type: ADD_PROJECT_OUTPUT_FAILED,
            payload: []
        });
    }

};
export const editProject = (param) => async (dispatch) => {
    await dispatch({ type: EDIT_PROJECT_OUTPUT_REQUEST });
    try {
        const { data } = await axios.put(`/api/project`,param);
        await dispatch({ type: EDIT_PROJECT_OUTPUT_SUCCESS, payload: data });
        return data;
    } catch (e) {
        dispatch({
            type: EDIT_PROJECT_OUTPUT_FAILED,
            payload: []
        });
    }

};
