import { CLOSE_ALERT, OPEN_ALERT } from "../constants/appConstants";

const initialState = {
  open: false,
  message: { message: '', typ: '' },
};

const authReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case 'RESET_ALERT':
      return initialState;
    case OPEN_ALERT:
      return {
        open: true,
        message: {
          message: payload.message.message,
          typ: payload.message.type,
        },
      };
    case CLOSE_ALERT:
      return {
        open: false,
        message: { message: '', typ: '' },
      };
    default:
      return state;
  }
};

export { authReducer as default };
