import {
  GET_OUTPUTTYPE_LIST_REQUEST,
  GET_OUTPUTTYPE_LIST_SUCCESS,
  GET_OUTPUTTYPE_LIST_FAILED,
  GET_KRABYDEPARTMENT_REQUEST,
  GET_KRABYDEPARTMENT_SUCCESS,
  GET_KRABYDEPARTMENT_FAILED,
  GET_PROJECTBYKRA_REQUEST,
  GET_PROJECTBYKRA_SUCCESS,
  GET_PROJECTBYKRA_FAILED
} from "../constants/appConstants";

const appState = {
  OutputTypes: [],
  KRA: [],
  projectsByKRA: [],
  projectsByKRALoading: false
};

export const appReducer = (state = appState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_OUTPUTTYPE_LIST_REQUEST:
      return {
        ...state,
        OutputTypes: []
      }
    case GET_OUTPUTTYPE_LIST_SUCCESS:
      return {
        ...state,
        OutputTypes: payload
      }
    case GET_OUTPUTTYPE_LIST_FAILED:
      return {
        ...state,
        OutputTypes: []
      }

    case GET_KRABYDEPARTMENT_REQUEST:
      return {
        ...state,
        KRA: []
      }
    case GET_KRABYDEPARTMENT_SUCCESS:
      return {
        ...state,
        KRA: payload
      }
    case GET_KRABYDEPARTMENT_FAILED:
      return {
        ...state,
        KRA: []
      }

    case GET_PROJECTBYKRA_REQUEST:
      return {
        ...state,
        projectsByKRA: [],
        projectsByKRALoading: true
      }
    case GET_PROJECTBYKRA_SUCCESS:
      return {
        ...state,
        projectsByKRA: payload,
        projectsByKRALoading: false
      }
    case GET_PROJECTBYKRA_FAILED:
      return {
        ...state,
        projectsByKRA: [],
        projectsByKRALoading: false
      }
    default:
      return state;
  }
};
