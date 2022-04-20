import {
    INSERT_ORGOUTCOME_REQUEST,
    INSERT_ORGOUTCOME_SUCCESS,
    INSERT_ORGOUTCOME_FAILED,
    LIST_ORGOUTCOME_REQUEST,
    LIST_ORGOUTCOME_SUCCESS,
    LIST_ORGOUTCOME_FAILED
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