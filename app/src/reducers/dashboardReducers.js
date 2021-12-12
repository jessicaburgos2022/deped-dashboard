import {
    GET_MONITOREDPPA_REQUEST,
    GET_MONITOREDPPA_SUCCESS,
    GET_MONITOREDPPA_FAILED
}
    from '../constants/dashboardConstants';


const dashboardState = {
    loading: false,
    MonitoredPPA: []
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

        default:
            return state;
    }
};
