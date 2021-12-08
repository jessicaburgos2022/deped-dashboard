import {
  GET_TICKET_BY_INTERFACE_REQUEST,
  GET_TICKET_BY_INTERFACE_SUCCESS,
  GET_TICKET_BY_INTERFACE_FAILED,
  LIST_TICKETTYPES_REQUEST,
  LIST_TICKETTYPES_SUCCESS,
  LIST_TICKETTYPES_FAILED
} from '../constants/ticketConstants';
import axios from "../helpers/axios";
export const getTicketByInterface = (service) => async (dispatch) => {
  await dispatch({ type: GET_TICKET_BY_INTERFACE_REQUEST, payload: service });
  try {
    const { data } = await axios.get(`/api/tickets/${service}`);
    dispatch({
      type: GET_TICKET_BY_INTERFACE_SUCCESS,
      payload: { interface: service, data, loading: false },
    });
  } catch (error) {
    dispatch({
      type: GET_TICKET_BY_INTERFACE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listActiveTicketTypes = () => async (dispatch) => {
  await dispatch({ type: LIST_TICKETTYPES_REQUEST });
  try {
    const { data } = await axios.get(`/api/tickets/types/1`);
    console.log(data);
    dispatch({
      type: LIST_TICKETTYPES_SUCCESS,
      payload: data,
    });
  } catch (e) {
    dispatch({
      type: LIST_TICKETTYPES_FAILED,
      payload: ""
    });
  }
};
