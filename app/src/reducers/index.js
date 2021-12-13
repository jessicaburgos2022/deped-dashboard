import { combineReducers } from 'redux';
import { user } from './userReducers';
import { svnReducer, interfaceReducer } from './interfaceReducers';
import { appReducer } from './appReducers';
import { ticketReducer } from './ticketReducers';
import { dashboardReducer } from './dashboardReducers';
import { MajorOutputManagementReducer } from './majorOutputReducers';
import {contributoryOutput} from './contributoryOutputReducers';

const combinedReducer = combineReducers({
  user,
  svnReducer,
  interfaceReducer,
  tickets: ticketReducer,
  app: appReducer,
  dashboard: dashboardReducer,
  majorOutputManagement: MajorOutputManagementReducer,
  ooManagement: contributoryOutput
});

export default combinedReducer;
