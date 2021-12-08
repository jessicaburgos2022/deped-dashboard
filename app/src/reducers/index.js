import { combineReducers } from 'redux';
import { user } from './userReducers';
import { bapiReducer } from './bapiReducers';
import { svnReducer, interfaceReducer } from './interfaceReducers';
import { businessUnitReducer, appReducer } from './appReducers';
import { ticketReducer } from './ticketReducers';

const combinedReducer = combineReducers({
  user,
  bapiReducer,
  svnReducer,
  interfaceReducer,
  businessUnitReducer,
  tickets: ticketReducer,
  app: appReducer
});

export default combinedReducer;
