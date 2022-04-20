import {
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILED,
  GET_ACTIONS_REQUEST,
  GET_ACTIONS_SUCCESS,
  GET_ACTIONS_FAILED,
  GET_ROLES_LIST_REQUEST,
  GET_ROLES_LIST_SUCCESS,
  GET_ROLES_LIST_FAILED,
  SEARCH_USER_ROLE_REQUEST,
  SEARCH_USER_ROLE_SUCCESS,
  SEARCH_USER_ROLE_FAILED,
} from "../constants/roleConstants";

const initialState = {
  loading: false,
  roleList: [],
  roles: [],
  actions: [],
  roleaction: [],
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_ROLES_REQUEST:
      return {
        ...state,
        loading: true,
        roles: [],
      };
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: payload,
      };
    case GET_ROLES_FAILED:
      return {
        ...state,
        loading: false,
        roles: [],
      };
    case GET_ACTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        actions: [],
      };
    case GET_ACTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        actions: payload,
      };
    case GET_ACTIONS_FAILED:
      return {
        ...state,
        loading: false,
        actions: [],
      };
    case GET_ROLES_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        roleList: [],
      };
    case GET_ROLES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        roleList: payload,
      };
    case GET_ROLES_LIST_FAILED:
      return {
        ...state,
        loading: true,
        roleList: [],
      };
    case SEARCH_USER_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
        roleaction: [],
      };
    case SEARCH_USER_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        roleaction: payload,
      };
    case SEARCH_USER_ROLE_FAILED:
      return {
        ...state,
        loading: false,
        roleaction: [],
      };
    default:
      return state;
  }
};
