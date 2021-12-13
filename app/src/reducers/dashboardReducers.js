import {
    GET_MONITOREDPPA_REQUEST,
    GET_MONITOREDPPA_SUCCESS,
    GET_MONITOREDPPA_FAILED,
    GET_CONDUCTEDWITHINTIMEFRAME_REQUEST,
    GET_CONDUCTEDWITHINTIMEFRAME_SUCCESS,
    GET_CONDUCTEDWITHINTIMEFRAME_FAILED,
    GET_BudgetUtilizationRate_REQUEST,
    GET_BudgetUtilizationRate_SUCCESS,
    GET_BudgetUtilizationRate_FAILED
}
    from '../constants/dashboardConstants';


const dashboardState = {
    loading: false,
    MonitoredPPA: [],
    ConductedWithinTimeframe: [],
    BudgetUtilizationRate: []
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

        case GET_BudgetUtilizationRate_REQUEST:
            return {
                ...state,
                loading: true,
                BudgetUtilizationRate: []
            }
        case GET_BudgetUtilizationRate_SUCCESS:
            return {
                ...state,
                loading: false,
                BudgetUtilizationRate: payload
            }
        case GET_BudgetUtilizationRate_FAILED:
            return {
                ...state,
                loading: false,
                BudgetUtilizationRate: []
            }
        default:
            return state;
    }
};
