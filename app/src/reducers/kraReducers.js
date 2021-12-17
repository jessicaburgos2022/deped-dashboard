import {
    SEARCH_KRA_REQUEST,
    SEARCH_KRA_OUTPUT_SUCCESS,
    SEARCH_KRA_OUTPUT_FAILED,
    ADD_KRA_OUTPUT_REQUEST,
    ADD_KRA_OUTPUT_SUCCESS,
    ADD_KRA_OUTPUT_FAILED
    
    } from "../constants/kraConstants";

    const kraState = {
        searchResult: []
      };

    export const KraReducer = (state = kraState, action) => {
        const { payload, type } = action;
        switch (type) {
          case SEARCH_KRA_REQUEST:
            return {
              ...state,
              searchResult: []
            }
          case SEARCH_KRA_OUTPUT_SUCCESS:
            return {
              ...state,
              searchResult: payload
            }
          case SEARCH_KRA_OUTPUT_FAILED:
            return {
              ...state,
              searchResult: []
            }
            
          default:
            return state;
        }
      };
      