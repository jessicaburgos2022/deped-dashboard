import {
  LIST_BUSINESSUNIT_REQUEST,
  LIST_BUSINESSUNIT_SUCCESS,
  LIST_BUSINESSUNIT_FAILED,
  GET_BU_DEPLOYMENTS_REQUEST,
  GET_BU_DEPLOYMENTS_SUCCESS,
  GET_BU_DEPLOYMENTS_FAILED,
  GET_MOST_DEPLOYED_REQUEST,
  GET_MOST_DEPLOYED_SUCCESS,
  GET_MOST_DEPLOYED_FAILED
} from "../constants/appConstants";

const businessUnitState = {
  businessUnits: [],
  error: "",
};
export const businessUnitReducer = (state = businessUnitState, action) => {
  const { payload, type } = action;
  switch (type) {
    case LIST_BUSINESSUNIT_REQUEST:
      return state;
    case LIST_BUSINESSUNIT_SUCCESS:
      return {
        ...state,
        businessUnits: payload,
      };
    case LIST_BUSINESSUNIT_FAILED:
      return {
        ...state,
        businessUnits: [],
        error: "",
      };
    default:
      return state;
  }
};

const appState = {
  marketDeployments: [],
  mostDeployed: [],
  activeTicketTypes: [],
  error: "",
};

export const appReducer = (state = appState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_BU_DEPLOYMENTS_REQUEST:
      return state;
    case GET_BU_DEPLOYMENTS_SUCCESS:
      return {
        ...state,
        marketDeployments: payload,
      };
    case GET_BU_DEPLOYMENTS_FAILED:
      return {
        ...state,
        marketDeployments: [],
        error: "",
      };
    case GET_MOST_DEPLOYED_REQUEST:
      return state;
    case GET_MOST_DEPLOYED_SUCCESS:
      return {
        ...state,
        mostDeployed: payload,
        error: "",
      };
    case GET_MOST_DEPLOYED_FAILED:
      return {
        ...state,
        mostDeployed: [],
        error: "",
      };
    default:
      return state;
  }
};
