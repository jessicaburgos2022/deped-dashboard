import {
    SEARCH_PREXC_REQUEST,
    SEARCH_PREXC_SUCCESS,
    SEARCH_PREXC_FAILED,
    LIST_ORGOUTCOME_REQUEST,
    LIST_ORGOUTCOME_SUCCESS,
    LIST_ORGOUTCOME_FAILED,
    LIST_PROJECTINDICATORS_REQUEST,
    LIST_PROJECTINDICATORS_SUCCESS,
    LIST_PROJECTINDICATORS_FAILED,
    SEARCH_INDICATORVALUE_REQUEST,
    SEARCH_INDICATORVALUE_SUCCESS,
    SEARCH_INDICATORVALUE_FAILED
} from "../constants/prexcConstants";

const prexcState = {
    searchResult: [],
    orgOutcome: [],
    projectIndicators: [],
    indicatorValues: []
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
        case LIST_PROJECTINDICATORS_REQUEST:
            return {
                ...state,
                projectIndicators: []
            }

        case LIST_PROJECTINDICATORS_SUCCESS:
            return {
                ...state,
                projectIndicators: payload
            }

        case LIST_PROJECTINDICATORS_FAILED:
            return {
                ...state,
                projectIndicators: []
            }
        case SEARCH_INDICATORVALUE_REQUEST:
            return {
                ...state,
                indicatorValues: []
            }
        case SEARCH_INDICATORVALUE_SUCCESS:
            return {
                ...state,
                indicatorValues: payload
            }

        case SEARCH_INDICATORVALUE_FAILED:
            return {
                ...state,
                indicatorValues: []
            }
        default:
            return state;
    }
};
