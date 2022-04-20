// import axios from 'axios';

import { OPEN_ALERT, CLOSE_ALERT } from '../constants/appConstants';

// close alert
export const closeAlert = () => (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: CLOSE_ALERT,
    });
  }, 4000);
  clearTimeout();
};

//open alert
export const openAlert = (message, type) => async (dispatch) => {
  await dispatch({
    type: OPEN_ALERT,
    payload: { message: { message: message, type: type } },
  });
  // await dispatch(closeAlert);
};
