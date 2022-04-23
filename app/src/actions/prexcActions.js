import {
    INSERT_ORGOUTCOME_REQUEST,
    INSERT_ORGOUTCOME_SUCCESS,
    INSERT_ORGOUTCOME_FAILED,
    LIST_ORGOUTCOME_REQUEST,
    LIST_ORGOUTCOME_SUCCESS,
    LIST_ORGOUTCOME_FAILED,
    INSERT_PREXCPROJECT_REQUEST,
    INSERT_PREXCPROJECT_SUCCESS,
    INSERT_PREXCPROJECT_FAILED, 
    INSERT_PREXCINDICATOR_REQUEST, 
    INSERT_PREXCINDICATOR_SUCCESS, 
    INSERT_PREXCINDICATOR_FAILED,
    LIST_PROJECTINDICATORS_REQUEST,
    LIST_PROJECTINDICATORS_SUCCESS,
    LIST_PROJECTINDICATORS_FAILED
} from "../constants/prexcConstants";
import axios from "../helpers/axios";

export const insertOrgOutcome = (param) => async (dispatch) => {
    await dispatch({ type: INSERT_ORGOUTCOME_REQUEST });
    try {
        const { data } = await axios.post(`/api/prexc/orgoutcome`, param);
        await dispatch({ type: INSERT_ORGOUTCOME_SUCCESS, payload: data });
        return data;
    } catch (e) {
        dispatch({
            type: INSERT_ORGOUTCOME_FAILED,
            payload: []
        });
    }
};

export const listOrgOutcome = (param) => async (dispatch) => {
    await dispatch({ type: LIST_ORGOUTCOME_REQUEST });
    try {
        const { data } = await axios.get(`/api/prexc/orgoutcome/${param.orgId}`);
        await dispatch({ type: LIST_ORGOUTCOME_SUCCESS, payload: data });
    } catch (e) {
        dispatch({
            type: LIST_ORGOUTCOME_FAILED,
            payload: []
        });
    }
};

export const insertProject = (param) => async (dispatch) => {
    await dispatch({ type: INSERT_PREXCPROJECT_REQUEST });
    try {
        const { data } = await axios.post(`/api/prexc/project`, param);
        await dispatch({ type: INSERT_PREXCPROJECT_SUCCESS, payload: data });
        return data;
    } catch (e) {
        dispatch({
            type: INSERT_PREXCPROJECT_FAILED,
            payload: []
        });
    }
};
export const insertIndicator = (param) => async (dispatch) => {
    await dispatch({ type: INSERT_PREXCINDICATOR_REQUEST });
    try {
        const { data } = await axios.post(`/api/prexc/indicator`, param);
        await dispatch({ type: INSERT_PREXCINDICATOR_SUCCESS, payload: data });
        return data;
    } catch (e) {
        dispatch({
            type: INSERT_PREXCINDICATOR_FAILED,
            payload: []
        });
    }
};

export const listProjectIndicators = () => async (dispatch) => {
    await dispatch({ type: LIST_PROJECTINDICATORS_REQUEST });
    try {
        const { data } = await axios.get(`/api/prexc/project/indicator`);
        await dispatch({ type: LIST_PROJECTINDICATORS_SUCCESS, payload: data });
    } catch (e) {
        dispatch({
            type: LIST_PROJECTINDICATORS_FAILED,
            payload: []
        });
    }
};
