import {
  GET_TICKET_BY_INTERFACE_REQUEST,
  GET_TICKET_BY_INTERFACE_SUCCESS,
  GET_TICKET_BY_INTERFACE_FAILED,
  LIST_TICKETTYPES_REQUEST,
  LIST_TICKETTYPES_SUCCESS,
  LIST_TICKETTYPES_FAILED
} from '../constants/ticketConstants';
const initialState = {
  loading: false,
  interfaceTickets: [],
  activeTicketTypes: []
};
export const ticketReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_TICKET_BY_INTERFACE_REQUEST:
      if (state.interfaceTickets && state.interfaceTickets.find((r) => r.interface === payload)) {
        for (var i in state.interfaceTickets) {
          if (state.interfaceTickets[i].interface === payload) {
            state.interfaceTickets[i].loading = true;
            break;
          }
        }
      }
      return {
        ...state,
      };
    case GET_TICKET_BY_INTERFACE_SUCCESS:
      if (
        state.interfaceTickets &&
        state.interfaceTickets.find((r) => r.interface === payload.interface)
      ) {
        for (var x in state.interfaceTickets) {
          if (state.interfaceTickets[x].interface === payload.interface) {
            state.interfaceTickets[x].loading = false;
            break;
          }
        }
        return {
          ...state,
          interfaceTickets: state.interfaceTickets,
          loading: false,
        };
      } else {
        var currentPayload = state.interfaceTickets ? state.interfaceTickets : [];
        currentPayload.push(payload);
        return {
          ...state,
          interfaceTickets: currentPayload,
        };
      }
    case GET_TICKET_BY_INTERFACE_FAILED:
      return {
        ...state,
        loading: false,
      };
    case LIST_TICKETTYPES_REQUEST:
      return {
        ...state,
        activeTicketTypes: [],
      };
    case LIST_TICKETTYPES_SUCCESS:
      return {
        ...state,
        activeTicketTypes: payload,
      };
    case LIST_TICKETTYPES_FAILED:
      return {
        ...state
      };
    default:
      return state;
  }
};