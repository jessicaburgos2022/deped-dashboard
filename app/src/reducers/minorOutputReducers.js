import {
    INSERT_MAJOR_OUTPUT_REQUEST,
    INSERT_MAJOR_OUTPUT_SUCCESS,
    INSERT_MAJOR_OUTPUT_FAILED,
    INSERT_MINOR_OUTPUT_REQUEST,
    INSERT_MINOR_OUTPUT_SUCCESS,
    INSERT_MINOR_OUTPUT_FAILED,
    SEARCH_MINOR_OUTPUT_REQUEST,
  SEARCH_MINOR_OUTPUT_SUCCESS,
  SEARCH_MINOR_OUTPUT_FAILED
} from "../constants/outputConstants";
  
  const minorOutputState = {
    searchResult: []
  };
  
  export const MinorOutputManagementReducer = (state = minorOutputState, action) => {
    
  const { payload, type } = action;
  switch (type) {
    case SEARCH_MINOR_OUTPUT_REQUEST:
      return {
        ...state,
        searchResult: []
      }
    case SEARCH_MINOR_OUTPUT_SUCCESS:
      return {
        ...state,
        searchResult: payload
      }
    case SEARCH_MINOR_OUTPUT_FAILED:
      return {
        ...state,
        searchResult: []
      }
    default:
      return state;
  }
  };
  