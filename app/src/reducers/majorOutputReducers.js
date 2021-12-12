import {
  INSERT_MAJOR_OUTPUT_REQUEST,
  INSERT_MAJOR_OUTPUT_SUCCESS,
  INSERT_MAJOR_OUTPUT_FAILED,
  INSERT_MINOR_OUTPUT_REQUEST,
  INSERT_MINOR_OUTPUT_SUCCESS,
  INSERT_MINOR_OUTPUT_FAILED,
  SEARCH_MAJOR_OUTPUT_REQUEST,
  SEARCH_MAJOR_OUTPUT_SUCCESS,
  SEARCH_MAJOR_OUTPUT_FAILED
} from "../constants/outputConstants";

const majorOutputState = {
  searchResult: []
};

export const MajorOutputManagementReducer = (state = majorOutputState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SEARCH_MAJOR_OUTPUT_REQUEST:
      return {
        ...state,
        searchResult: []
      }
    case SEARCH_MAJOR_OUTPUT_SUCCESS:
      return {
        ...state,
        searchResult: payload
      }
    case SEARCH_MAJOR_OUTPUT_FAILED:
      return {
        ...state,
        searchResult: []
      }
    default:
      return state;
  }
};
