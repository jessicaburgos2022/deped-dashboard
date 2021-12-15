import {
SEARCH_KRA_REQUEST,
SEARCH_KRA_OUTPUT_SUCCESS,
SEARCH_KRA_OUTPUT_FAILED

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
