import {
    INSERT_OPEX_RECORD_REQUEST,
    INSERT_OPEX_RECORD_SUCCESS,
    INSERT_OPEX_RECORD_FAILED,
    SEARCH_OPEX_RECORD_REQUEST,
    SEARCH_OPEX_RECORD_SUCCESS,
    SEARCH_OPEX_RECORD_FAILED
} from "../constants/opexConstants";

const opexRecordState = {
    searchResult: [],
};

export const OpexRecordReducer = (state = opexRecordState, action) => {
    const { payload, type } = action;
    switch (type) {
        case SEARCH_OPEX_RECORD_REQUEST:
            return {
                ...state,
                searchResult: []
            }
        case SEARCH_OPEX_RECORD_SUCCESS:
            return {
                ...state,
                searchResult: payload
            }
        case SEARCH_OPEX_RECORD_FAILED:
            return {
                ...state,
                searchResult: []
            }

        default:
            return state;
    }
};

