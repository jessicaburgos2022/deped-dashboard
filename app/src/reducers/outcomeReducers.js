import {
    GET_LIST_OUTCOMETYPE_REQUEST,
    GET_LIST_OUTCOMETYPE_SUCCESS,
    GET_LIST_OUTCOMETYPE_FAILED,
    SEARCH_OUTCOME_REQUEST,
    SEARCH_OUTCOME_SUCCESS,
    SEARCH_OUTCOME_FAILED
} from "../constants/outcomeConstants";

const outcomeState = {
    outcometypes: [],
    outcome: []
};

export const outcomeReducer = (state = outcomeState, action) => {
    const { payload, type } = action;
    switch (type) {
        case GET_LIST_OUTCOMETYPE_REQUEST:
            return {
                ...state,
                outcometypes: []
            }
        case GET_LIST_OUTCOMETYPE_SUCCESS:
            return {
                ...state,
                outcometypes: payload
            }
        case GET_LIST_OUTCOMETYPE_FAILED:
            return {
                ...state,
                outcometypes: []
            }
        case SEARCH_OUTCOME_REQUEST:
            return {
                ...state,
                outcome: []
            }
        case SEARCH_OUTCOME_SUCCESS:
            return {
                ...state,
                outcome: payload
            }
        case SEARCH_OUTCOME_FAILED:
            return {
                ...state,
                outcome: []
            }
        default:
            return state;
    }
};
