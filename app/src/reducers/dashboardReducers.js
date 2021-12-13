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
    GET_SATISFACTORYRESULT_FAILED
}
    from '../constants/dashboardConstants';


const dashboardState = {
    loading: false,
    MonitoredPPA: [],
    ConductedWithinTimeframe: [],
    BudgetUtilizationRate: [],
    SatisfactoryResult: []
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
        default:
            return state;
    }
};
