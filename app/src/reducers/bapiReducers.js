import _ from 'lodash';
import {
  BAPI_GET_DETAILS_SUCCESS,
  BAPI_GET_DETAILS_FAIL,
  BAPI_UPDATE_REQUEST,
  BAPI_UPDATE_SUCCESS,
  BAPI_UPDATE_FAIL,
  BAPI_ADD_REQUEST,
  BAPI_ADD_SUCCESS,
  BAPI_ADD_FAIL,
  BAPI_DELETE_REQUEST,
  BAPI_DELETE_SUCCESS,
  BAPI_DELETE_FAIL,
  BAPI_GET_DETAILS_REQUEST,
  BAPI_GET_BUS_REQUEST,
  BAPI_GET_BUS_FAIL,
  BAPI_GET_BUS_SUCCESS,
  BAPI_GET_INTERFACES_REQUEST,
  BAPI_GET_INTERFACES_FAIL,
  BAPI_GET_INTERFACES_SUCCESS,
} from '../constants/bapiConstants';

export const bapiReducer = (state = {}, action) => {
  const { payload, type } = action;
  switch (type) {
    case BAPI_GET_DETAILS_REQUEST:
      return {
        ...state,
        loadingDetails: true,
        serviceName: payload,
      };
    case BAPI_GET_DETAILS_SUCCESS:
      return {
        ...state,
        loadingDetails: false,
        serviceName: '',
        details: payload.details,
      };
    case BAPI_GET_DETAILS_FAIL:
      return {
        ...state,
        loadingDetails: false,
        error: payload,
      };

    case BAPI_UPDATE_REQUEST:
      return {
        ...state,
        loadingAction: true,
      };

    case BAPI_UPDATE_SUCCESS:
      return {
        ...state,
        details: state.details.map((row) => {
          if (row.id === payload.id) {
            return { ...row, ...action.payload };
          } else {
            return row;
          }
        }),
        loadingAction: false,
      };

    case BAPI_UPDATE_FAIL:
      return {
        ...state,
        loadingAction: false,
        error: payload,
      };

    case BAPI_DELETE_REQUEST: {
      return {
        ...state,
        loadingAction: true,
      };
    }

    case BAPI_DELETE_SUCCESS:
      return {
        ...state,
        loadingAction: false,
        // details: state.details.map((row) => {
        //   const filtered = _.filter(row.details, (record) => {
        //     return record.id !== payload.id;
        //   });
        //   return {
        //     ...row,
        //     details: filtered,
        //   };
        // }),
      };

    case BAPI_DELETE_FAIL:
      return {
        ...state,
        loadingAction: false,
        error: payload,
      };

    case BAPI_ADD_REQUEST: {
      return {
        ...state,
        loadingAction: true,
      };
    }

    case BAPI_ADD_SUCCESS:
      return {
        ...state,
        loadingAction: false,
      };

    case BAPI_ADD_FAIL:
      return {
        ...state,
        loadingAction: false,
        error: payload,
      };

    case BAPI_GET_BUS_REQUEST:
      return {
        ...state,
        loadingBUS: true,
      };
    case BAPI_GET_BUS_SUCCESS:
      return {
        ...state,
        loadingBUS: false,
        bus: payload,
      };
    case BAPI_GET_BUS_FAIL:
      return {
        ...state,
        loadingBUS: false,
        error: payload,
      };

    case BAPI_GET_INTERFACES_REQUEST:
      return {
        ...state,
        loadingInterfaces: true,
      };

    case BAPI_GET_INTERFACES_SUCCESS:
      return {
        ...state,
        loadingInterfaces: false,
        // interfaces: payload,
        bus: state.bus.map((row) => {
          if (row.name === payload[0].businessunit_name) {
            return {
              ...row,
              services: payload,
            };
          } else {
            return row;
          }
        }),
      };
    case BAPI_GET_INTERFACES_FAIL:
      return {
        ...state,
        loadingInterfaces: false,
        error: payload,
      };

    default:
      return state;
  }
};
