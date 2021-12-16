import {
    LIST_INDICATORSBYDEPT_REQUEST,
    LIST_INDICATORSBYDEPT_SUCCESS,
    LIST_INDICATORSBYDEPT_FAILED,
    SEARCH_CONTRIBUTORY_OUTPUT_REQUEST,
    SEARCH_CONTRIBUTORY_OUTPUT_SUCCESS,
    SEARCH_CONTRIBUTORY_OUTPUT_FAILED
} from "../constants/outputConstants";


const contributoryOutputState = {
    indicators: [],
    searchResult: []
};

export const contributoryOutput = (state = contributoryOutputState, action) => {
    const { payload, type } = action;
    switch (type) {
        case LIST_INDICATORSBYDEPT_REQUEST:
            return {
                ...state,
                indicators: []
            }
        case LIST_INDICATORSBYDEPT_SUCCESS:
            return {
                ...state,
                indicators: payload
            }
        case LIST_INDICATORSBYDEPT_FAILED:
            return {
                ...state,
                indicators: []
            }
        case SEARCH_CONTRIBUTORY_OUTPUT_REQUEST:
            return {
                ...state,
                searchResult: []
            }
        case SEARCH_CONTRIBUTORY_OUTPUT_SUCCESS:
            return {
                ...state,
                searchResult: payload
            }
        case SEARCH_CONTRIBUTORY_OUTPUT_FAILED:
            return {
                ...state,
                searchResult: []
            }
        default:
            return state;
    }
};
