import {
    INSERT_MAJOR_OUTPUT_REQUEST,
    INSERT_MAJOR_OUTPUT_SUCCESS,
    INSERT_MAJOR_OUTPUT_FAILED,
    INSERT_MINOR_OUTPUT_REQUEST,
    INSERT_MINOR_OUTPUT_SUCCESS,
    INSERT_MINOR_OUTPUT_FAILED
} from "../constants/outputConstants";
import axios from "../helpers/axios";

export const insertMajorOutput = (param) => async (dispatch) => {
    await dispatch({ type: INSERT_MAJOR_OUTPUT_REQUEST });
    try {
        const { data } = await axios.post(`/api/output/major`, param);
        console.log(data);
        return data;
    } catch (e) {
        dispatch({
            type: INSERT_MAJOR_OUTPUT_FAILED,
            payload: ""
        });
    }
};