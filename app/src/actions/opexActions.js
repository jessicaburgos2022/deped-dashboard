import {
    INSERT_OPEX_RECORD_REQUEST,
    INSERT_OPEX_RECORD_SUCCESS,
    INSERT_OPEX_RECORD_FAILED,
    SEARCH_OPEX_RECORD_REQUEST,
    SEARCH_OPEX_RECORD_SUCCESS,
    SEARCH_OPEX_RECORD_FAILED
} from "../constants/opexConstants";
import axios from "../helpers/axios";

export const insertOpexRecord = (param) => async (dispatch) => {
    console.log(param)
    await dispatch({ type: INSERT_OPEX_RECORD_REQUEST });
    try {
        const { data } = await axios.post(`/api/opex`, param);
        await dispatch({ type: INSERT_OPEX_RECORD_SUCCESS });
        return data;
    } catch (e) {
        dispatch({
            type: INSERT_OPEX_RECORD_FAILED,
            payload: ""
        });
    }
};

export const searchOpexRecord = (year, departmentid, quarter) => async (dispatch) => {
    await dispatch({ type: SEARCH_OPEX_RECORD_REQUEST });
    try {
        const { data } = await axios.post(`/api/opex/search`, { year, departmentid, quarter });
        await dispatch({ type: SEARCH_OPEX_RECORD_SUCCESS, payload: data });

    } catch (e) {
        dispatch({
            type: SEARCH_OPEX_RECORD_FAILED,
            payload: []
        });
    }

};

