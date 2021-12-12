import {
    GET_MONITOREDPPA_REQUEST,
    GET_MONITOREDPPA_SUCCESS,
    GET_MONITOREDPPA_FAILED,
    GET_CONDUCTEDWITHINTIMEFRAME_REQUEST,
    GET_CONDUCTEDWITHINTIMEFRAME_SUCCESS,
    GET_CONDUCTEDWITHINTIMEFRAME_FAILED
}
    from '../constants/dashboardConstants';


const dashboardState = {
    loading: false,
    MonitoredPPA: [],
    ConductedWithinTimeframe: []
};

export const dashboardReducer = (state = dashboardState, action) => {
    const { payload, type } = action;
    switch (type) {
        case GET_MONITOREDPPA_REQUEST:
            return {
                ...state,
                loading: true,
                MonitoredPPA: []
            }
        case GET_MONITOREDPPA_SUCCESS:
            return {
                ...state,
                loading: false,
                MonitoredPPA: payload
            }
        case GET_MONITOREDPPA_FAILED:
            return {
                ...state,
                loading: false,
                MonitoredPPA: []
            }

        case GET_CONDUCTEDWITHINTIMEFRAME_REQUEST:
            return {
                ...state,
                loading: true,
                ConductedWithinTimeframe: []
            }
        case GET_CONDUCTEDWITHINTIMEFRAME_SUCCESS:
            return {
                ...state,
                loading: false,
                ConductedWithinTimeframe: payload
            }
        case GET_CONDUCTEDWITHINTIMEFRAME_FAILED:
            return {
                ...state,
                loading: false,
                ConductedWithinTimeframe: []
            }
        default:
            return state;
    }
};
