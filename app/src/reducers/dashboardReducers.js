import {
    GET_MONITOREDPPA_REQUEST,
    GET_MONITOREDPPA_SUCCESS,
    GET_MONITOREDPPA_FAILED,
    GET_CONDUCTEDWITHINTIMEFRAME_REQUEST,
    GET_CONDUCTEDWITHINTIMEFRAME_SUCCESS,
    GET_CONDUCTEDWITHINTIMEFRAME_FAILED,
    GET_BudgetUtilizationRate_REQUEST,
    GET_BudgetUtilizationRate_SUCCESS,
    GET_BudgetUtilizationRate_FAILED,
    GET_SATISFACTORYRESULT_REQUEST,
    GET_SATISFACTORYRESULT_SUCCESS,
    GET_SATISFACTORYRESULT_FAILED,
    GET_DASHBOARDOO_INFO_REQUEST,
    GET_DASHBOARDOO_INFO_SUCCESS,
    GET_DASHBOARDOO_INFO_FAILED,
    GET_MONITOREDPPA_PREVIOUSYEAR_REQUEST,
    GET_MONITOREDPPA_PREVIOUSYEAR_SUCCESS,
    GET_MONITOREDPPA_PREVIOUSYEAR_FAILED
}
    from '../constants/dashboardConstants';


const dashboardState = {
    loading: false,
    MonitoredPPA: [],
    PreviousYearMonitoredPPA: [],
    ConductedWithinTimeframe: [],
    BudgetUtilizationRate: [],
    SatisfactoryResult: [],
    oo: []
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

        case GET_MONITOREDPPA_PREVIOUSYEAR_REQUEST:
            return {
                ...state,
                loading: true,
                PreviousYearMonitoredPPA: []
            }
        case GET_MONITOREDPPA_PREVIOUSYEAR_SUCCESS:
            return {
                ...state,
                loading: false,
                PreviousYearMonitoredPPA: payload
            }
        case GET_MONITOREDPPA_PREVIOUSYEAR_FAILED:
            return {
                ...state,
                loading: false,
                PreviousYearMonitoredPPA: []
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

        case GET_SATISFACTORYRESULT_REQUEST:
            return {
                ...state,
                loading: true,
                SatisfactoryResult: []
            }
        case GET_SATISFACTORYRESULT_SUCCESS:
            return {
                ...state,
                loading: false,
                SatisfactoryResult: payload
            }
        case GET_SATISFACTORYRESULT_FAILED:
            return {
                ...state,
                loading: false,
                SatisfactoryResult: []
            }
        case GET_DASHBOARDOO_INFO_REQUEST:
            return {
                ...state,
                loading: true,
                oo: []
            }
        case GET_DASHBOARDOO_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                oo: payload
            }
        case GET_DASHBOARDOO_INFO_FAILED:
            return {
                ...state,
                loading: false,
                oo: []
            }
        default:
            return state;
    }
};
