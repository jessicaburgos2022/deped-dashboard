import {
SEARCH_KRA_REQUEST,
SEARCH_KRA_OUTPUT_SUCCESS,
SEARCH_KRA_OUTPUT_FAILED,
ADD_KRA_OUTPUT_REQUEST,
ADD_KRA_OUTPUT_SUCCESS,
ADD_KRA_OUTPUT_FAILED,
EDIT_KRA_OUTPUT_REQUEST,
EDIT_KRA_OUTPUT_SUCCESS,
EDIT_KRA_OUTPUT_FAILED

} from "../constants/kraConstants";
import axios from "../helpers/axios";

export const searchKRA = (param) => async (dispatch) => {
    await dispatch({ type: SEARCH_KRA_REQUEST });
    try {
        const { data } = await axios.get(`/api/kra`);
        await dispatch({ type: SEARCH_KRA_OUTPUT_SUCCESS, payload: data });

    } catch (e) {
        dispatch({
            type: SEARCH_KRA_OUTPUT_FAILED,
            payload: []
        });
    }

};
export const addKRA = (param) => async (dispatch) => {
    await dispatch({ type: ADD_KRA_OUTPUT_REQUEST });
    try {
        const { data } = await axios.post(`/api/kra`,param);
        await dispatch({ type: ADD_KRA_OUTPUT_SUCCESS, payload: data });
        return data;
    } catch (e) {
        dispatch({
            type: ADD_KRA_OUTPUT_FAILED,
            payload: []
        });
    }

};
export const editKRA = (param) => async (dispatch) => {
    await dispatch({ type: EDIT_KRA_OUTPUT_REQUEST });
    try {
        const { data } = await axios.put(`/api/kra`,param);
        await dispatch({ type: EDIT_KRA_OUTPUT_SUCCESS, payload: data });
        return data;
    } catch (e) {
        dispatch({
            type: EDIT_KRA_OUTPUT_FAILED,
            payload: []
        });
    }

};
