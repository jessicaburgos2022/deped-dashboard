import {
    GET_LIST_OUTCOMETYPE_REQUEST,
    GET_LIST_OUTCOMETYPE_SUCCESS,
    GET_LIST_OUTCOMETYPE_FAILED,
    SEARCH_OUTCOME_REQUEST,
    SEARCH_OUTCOME_SUCCESS,
    SEARCH_OUTCOME_FAILED,
    INSERT_OUTCOME_REQUEST,
    INSERT_OUTCOME_SUCCESS,
    INSERT_OUTCOME_FAILED
} from "../constants/outcomeConstants";
import axios from "../helpers/axios";

export const fetchOutcomeTypes = () => async (dispatch) => {
    await dispatch({ type: GET_LIST_OUTCOMETYPE_REQUEST });
    try {
        const { data } = await axios.get(`/api/outcome/outcometype`);
        dispatch({
            type: GET_LIST_OUTCOMETYPE_SUCCESS,
            payload: data,
        });
        return data;
    } catch (e) {
        dispatch({
            type: GET_LIST_OUTCOMETYPE_FAILED,
            payload: ""
        });
    }
};

export const searchOutcome = (departmentid, outcometypeid, title) => async (dispatch) => {
    await dispatch({ type: SEARCH_OUTCOME_REQUEST });
    try {
        const { data } = await axios.post(`/api/outcome/search`, { departmentid, outcometypeid, title });
        dispatch({
            type: SEARCH_OUTCOME_SUCCESS,
            payload: data,
        });
    } catch (e) {
        dispatch({
            type: SEARCH_OUTCOME_FAILED,
            payload: ""
        });
    }
};

export const insertOutcome = (param) => async (dispatch) => {
    await dispatch({ type: INSERT_OUTCOME_REQUEST });
    try {
        const { data } = await axios.post(`/api/outcome/`, param);
        dispatch({
            type: INSERT_OUTCOME_SUCCESS,
            payload: data,
        });
        return data;
    } catch (e) {
        dispatch({
            type: INSERT_OUTCOME_FAILED,
            payload: ""
        });
    }
};