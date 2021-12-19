import {
    SEARCH_PROJECT_OUTPUT_REQUEST,
    SEARCH_PROJECT_OUTPUT_SUCCESS,
    SEARCH_PROJECT_OUTPUT_FAILED,
    ADD_PROJECT_OUTPUT_REQUEST,
    ADD_PROJECT_OUTPUT_SUCCESS,
    ADD_PROJECT_OUTPUT_FAILED
    
    } from "../constants/projectConstants";

    const projectState = {
        searchResult: []
      };

    export const ProjectReducer = (state = projectState, action) => {
        const { payload, type } = action;
        switch (type) {
          case SEARCH_PROJECT_OUTPUT_REQUEST:
            return {
              ...state,
              searchResult: []
            }
          case SEARCH_PROJECT_OUTPUT_SUCCESS:
            return {
              ...state,
              searchResult: payload
            }
          case SEARCH_PROJECT_OUTPUT_FAILED:
            return {
              ...state,
              searchResult: []
            }
            
          default:
            return state;
        }
      };
      