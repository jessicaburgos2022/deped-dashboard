import {
  SVN_INFO_REQUEST,
  SVN_INFO_SUCCESS,
  SVN_INFO_FAILED,
  SEARCH_INTERFACE_REQUEST,
  SEARCH_INTERFACE_SUCCESS,
  SEARCH_INTERFACE_FAILED,
  SEARCH_BAPI_BY_INTERFACE_REQUEST,
  SEARCH_BAPI_BY_INTERFACE_SUCCESS,
} from "../constants/interfaceConstants";
const initialState = {
  loading: false,
  svnInfo: [],
};
export const svnReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SVN_INFO_REQUEST:
      if (state.svnInfo && state.svnInfo.find((r) => r.interface === payload)) {
        for (var i in state.svnInfo) {
          if (state.svnInfo[i].interface === payload) {
            state.svnInfo[i].loading = true;
            break;
          }
        }
      }
      return {
        ...state,
      };
    case SVN_INFO_SUCCESS:
      if (
        state.svnInfo &&
        state.svnInfo.find((r) => r.interface === payload.interface)
      ) {
        for (var x in state.svnInfo) {
          if (state.svnInfo[x].interface === payload.interface) {
            state.svnInfo[x].loading = false;
            break;
          }
        }
        return {
          ...state,
          svnInfo: state.svnInfo,
          loading: false,
        };
      } else {
        var currentPayload = state.svnInfo ? state.svnInfo : [];
        currentPayload.push(payload);
        return {
          ...state,
          svnInfo: currentPayload,
        };
      }
    case SVN_INFO_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const initialInterfaceState = {
  searchParams: {},
  interfaces: [],
  bapiByInterface: [],
  tableLoading: false,
  error: "",
};
export const interfaceReducer = (state = initialInterfaceState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SEARCH_INTERFACE_REQUEST:
      return {
        ...state,
        tableLoading: true,
        searchParams: payload,
      };
    case SEARCH_INTERFACE_SUCCESS:
      return {
        ...state,
        tableLoading: false,
        interfaces: payload,
      };
    case SEARCH_INTERFACE_FAILED:
      return {
        ...state,
        tableLoading: true,
        interfaces: [],
        error: "",
      };
    case SEARCH_BAPI_BY_INTERFACE_REQUEST:
      return {
        ...state,
      };
    case SEARCH_BAPI_BY_INTERFACE_SUCCESS:
      if (
        state.bapiByInterface &&
        state.bapiByInterface.find((r) => r.interface === payload.interface)
      ) {
        for (var x in state.svnInfo) {
          if (state.bapiByInterface[x].interface === payload.interface) {
            state.bapiByInterface[x].loading = false;
            break;
          }
        }
        return {
          ...state,
          bapiByInterface: state.bapiByInterface,
          loading: false,
        };
      } else {
        var currentPayload = state.bapiByInterface ? state.bapiByInterface : [];
        currentPayload.push(payload);
        return {
          ...state,
          bapiByInterface: currentPayload,
        };
      }
    default:
      return state;
  }
};
