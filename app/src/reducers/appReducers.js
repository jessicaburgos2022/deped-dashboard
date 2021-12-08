import {
  GET_OUTPUTTYPE_LIST_REQUEST,
  GET_OUTPUTTYPE_LIST_SUCCESS,
  GET_OUTPUTTYPE_LIST_FAILED,
  GET_KRABYDEPARTMENT_REQUEST,
  GET_KRABYDEPARTMENT_SUCCESS,
  GET_KRABYDEPARTMENT_FAILED
} from "../constants/appConstants";

const appState = {
  OutputTypes: [],
  KRA: []
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
        KRA : []
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
    default:
      return state;
  }
};
