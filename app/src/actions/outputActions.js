import {
    INSERT_MAJOR_OUTPUT_REQUEST,
    INSERT_MAJOR_OUTPUT_SUCCESS,
    INSERT_MAJOR_OUTPUT_FAILED,
    INSERT_MINOR_OUTPUT_REQUEST,
    INSERT_MINOR_OUTPUT_SUCCESS,
    INSERT_MINOR_OUTPUT_FAILED,
    INSERT_CONTRIBUTORY_OUTPUT_REQUEST,
    INSERT_CONTRIBUTORY_OUTPUT_SUCCESS,
    INSERT_CONTRIBUTORY_OUTPUT_FAILED,
    SEARCH_MAJOR_OUTPUT_REQUEST,
    SEARCH_MAJOR_OUTPUT_SUCCESS,
    SEARCH_MAJOR_OUTPUT_FAILED,
    SEARCH_MINOR_OUTPUT_REQUEST,
    SEARCH_MINOR_OUTPUT_SUCCESS,
    SEARCH_MINOR_OUTPUT_FAILED,
    LIST_INDICATORSBYDEPT_REQUEST,
    LIST_INDICATORSBYDEPT_SUCCESS,
    LIST_INDICATORSBYDEPT_FAILED,
    EDIT_MAJOR_OUTPUT_REQUEST,
    EDIT_MAJOR_OUTPUT_SUCCESS,
    EDIT_MAJOR_OUTPUT_FAILED,
    EDIT_MINOR_OUTPUT_REQUEST,
    EDIT_MINOR_OUTPUT_SUCCESS,
    EDIT_MINOR_OUTPUT_FAILED,
    EDIT_OUTPUTSTATUS_REQUEST,
    EDIT_OUTPUTSTATUS_SUCCESS,
    EDIT_OUTPUTSTATUS_FAILED
} from "../constants/outputConstants";
import axios from "../helpers/axios";

export const insertMajorOutput = (param) => async (dispatch) => {
    await dispatch({ type: INSERT_MAJOR_OUTPUT_REQUEST });
    try {
        const { data } = await axios.post(`/api/output/major`, param);
        await dispatch({ type: INSERT_MAJOR_OUTPUT_SUCCESS });
        return data;
    } catch (e) {
        dispatch({
            type: INSERT_MAJOR_OUTPUT_FAILED,
            payload: ""
        });
    }
};

export const editMajorOutput = (param) => async (dispatch) => {
    await dispatch({ type: EDIT_MAJOR_OUTPUT_REQUEST });
    try {
        const { data } = await axios.put(`/api/output/major`, param);
        await dispatch({ type: EDIT_MAJOR_OUTPUT_SUCCESS });
        return data;
    } catch (e) {
        dispatch({
            type: EDIT_MAJOR_OUTPUT_FAILED,
            payload: ""
        });
    }
};

export const insertMinorOutput = (param) => async (dispatch) => {
    await dispatch({ type: EDIT_MINOR_OUTPUT_REQUEST });
    try {
        const { data } = await axios.post(`/api/output/minor`, param);
        await dispatch({ type: EDIT_MINOR_OUTPUT_SUCCESS });
        return data;

    } catch (e) {
        dispatch({
            type: EDIT_MINOR_OUTPUT_FAILED,
            payload: ""
        });
    }

};

export const editMinorOutput = (param) => async (dispatch) => {
    await dispatch({ type: EDIT_MINOR_OUTPUT_REQUEST });
    try {
        const { data } = await axios.put(`/api/output/minor`, param);
        await dispatch({ type: EDIT_MINOR_OUTPUT_SUCCESS });
        return data;
    } catch (e) {
        dispatch({
            type: EDIT_MINOR_OUTPUT_FAILED,
            payload: ""
        });
    }
};

export const insertContributoryOutput = (param) => async (dispatch) => {
    await dispatch({ type: INSERT_CONTRIBUTORY_OUTPUT_REQUEST });
    try {
        const { data } = await axios.post(`/api/output/contributory`, param);
        await dispatch({ type: INSERT_CONTRIBUTORY_OUTPUT_SUCCESS });
        return data;

    } catch (e) {
        dispatch({
            type: INSERT_CONTRIBUTORY_OUTPUT_FAILED,
            payload: ""
        });
    }

};

export const searchMajorOutput = (param) => async (dispatch) => {
    await dispatch({ type: SEARCH_MAJOR_OUTPUT_REQUEST });
    try {
        const { data } = await axios.get(`/api/output/major`);
        await dispatch({ type: SEARCH_MAJOR_OUTPUT_SUCCESS, payload: data });

    } catch (e) {
        dispatch({
            type: SEARCH_MAJOR_OUTPUT_FAILED,
            payload: []
        });
    }

};

export const searchMinorOutput = (param) => async (dispatch) => {
    await dispatch({ type: SEARCH_MINOR_OUTPUT_REQUEST });
    try {
        const { data } = await axios.get(`/api/output/minor`);
        await dispatch({ type: SEARCH_MINOR_OUTPUT_SUCCESS, payload: data });
    } catch (e) {
        dispatch({
            type: SEARCH_MINOR_OUTPUT_FAILED,
            payload: []
        })
    }
};


export const fetchIndicatorsByDeptId = (deptId) => async (dispatch) => {
    await dispatch({ type: LIST_INDICATORSBYDEPT_REQUEST });
    try {
        const { data } = await axios.get(`/api/output/indicator/${deptId}`);
        dispatch({
            type: LIST_INDICATORSBYDEPT_SUCCESS,
            payload: data,
        });
    } catch (e) {
        dispatch({
            type: LIST_INDICATORSBYDEPT_FAILED,
            payload: ""
        });
    }
};


export const editOutputStatus = (param) => async (dispatch) => {
    await dispatch({ type: EDIT_OUTPUTSTATUS_REQUEST });
    try {
        const { data } = await axios.put(`/api/output/major/status`, param);
        await dispatch({ type: EDIT_OUTPUTSTATUS_SUCCESS });
        return data;
    } catch (e) {
        dispatch({
            type: EDIT_OUTPUTSTATUS_FAILED,
            payload: ""
        });
    }
};