import { combineReducers } from 'redux';
import { user } from './userReducers';
import { svnReducer, interfaceReducer } from './interfaceReducers';
import { appReducer } from './appReducers';
import { ticketReducer } from './ticketReducers';
import { dashboardReducer } from './dashboardReducers';
import { MajorOutputManagementReducer } from './majorOutputReducers';
import { MinorOutputManagementReducer } from './minorOutputReducers';
import { contributoryOutput } from './contributoryOutputReducers';
import { KraReducer } from './kraReducers';
import { ProjectReducer } from './projectReducers';
import { PrexcReducer } from './prexcReducers';
import { outcomeReducer } from './outcomeReducers';
import roleManagementReducer from './roleManagementReducer';
import alertReducer from './alertReducer';
import { OpexRecordReducer } from './opexReducer';


const combinedReducer = combineReducers({
  user,
  svnReducer,
  interfaceReducer,
  tickets: ticketReducer,
  app: appReducer,
  dashboard: dashboardReducer,
  majorOutputManagement: MajorOutputManagementReducer,
  minorOutputManagement: MinorOutputManagementReducer,
  ooManagement: contributoryOutput,
  kra: KraReducer,
  project: ProjectReducer,
  outcome: outcomeReducer,  
  roles: roleManagementReducer,
  alert: alertReducer,
  prexc: PrexcReducer,
  opex: OpexRecordReducer
});

export default combinedReducer;
