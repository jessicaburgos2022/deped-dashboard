import { combineReducers } from 'redux';
import { user } from './userReducers';
import { svnReducer, interfaceReducer } from './interfaceReducers';
import { appReducer } from './appReducers';
import { ticketReducer } from './ticketReducers';

const combinedReducer = combineReducers({
  user,
  svnReducer,
  interfaceReducer,
  tickets: ticketReducer,
  app: appReducer
});

export default combinedReducer;
