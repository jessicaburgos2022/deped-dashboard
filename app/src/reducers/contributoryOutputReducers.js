import {
    LIST_INDICATORSBYDEPT_REQUEST,
    LIST_INDICATORSBYDEPT_SUCCESS,
    LIST_INDICATORSBYDEPT_FAILED
} from "../constants/outputConstants";

const contributoryOutputState = {
    indicators: []
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
        default:
            return state;
    }
};
