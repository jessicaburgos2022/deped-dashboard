import { combineReducers } from 'redux';
import { user } from './userReducers';
import { svnReducer, interfaceReducer } from './interfaceReducers';
import { appReducer } from './appReducers';
import { ticketReducer } from './ticketReducers';
import { dashboardReducer } from './dashboardReducers';
import { MajorOutputManagementReducer } from './majorOutputReducers';
import { MinorOutputManagementReducer } from './minorOutputReducers';
import {contributoryOutput} from './contributoryOutputReducers';
import { KraReducer } from './kraReducers';

const combinedReducer = combineReducers({
  user,
  svnReducer,
  interfaceReducer,
  tickets: ticketReducer,
  app: appReducer,
  dashboard: dashboardReducer,
  majorOutputManagement: MajorOutputManagementReducer,
  minorOutputManagement : MinorOutputManagementReducer,
  ooManagement: contributoryOutput,
  kra: KraReducer
});

export default combinedReducer;
