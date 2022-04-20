import {
    SEARCH_PREXC_REQUEST,
    SEARCH_PREXC_SUCCESS,
    SEARCH_PREXC_FAILED,
    LIST_ORGOUTCOME_REQUEST,
    LIST_ORGOUTCOME_SUCCESS,
    LIST_ORGOUTCOME_FAILED
} from "../constants/prexcConstants";

const prexcState = {
    searchResult: [],
    orgOutcome: []
};

export const PrexcReducer = (state = prexcState, action) => {
    const { payload, type } = action;
    switch (type) {
        case SEARCH_PREXC_REQUEST:
            return {
                ...state,
                searchResult: []
            }
        case SEARCH_PREXC_SUCCESS:
            return {
                ...state,
                searchResult: payload
            }
        case SEARCH_PREXC_FAILED:
            return {
                ...state,
                searchResult: []
            }

        case LIST_ORGOUTCOME_REQUEST:
            return {
                ...state,
                orgOutcome: []
            }

        case LIST_ORGOUTCOME_SUCCESS:
            return {
                ...state,
                orgOutcome: payload
            }

        case LIST_ORGOUTCOME_FAILED:
            return {
                ...state,
                orgOutcome: []
            }
        default:
            return state;
    }
};
