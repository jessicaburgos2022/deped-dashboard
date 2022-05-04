import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KRAModule from './KRA';
import PROJECTModule from './Project';
import INDICATORModule from './Indicator';
import OutcomeModule from './Outcome';
import UserManagement from './UserManagement';
import RoleManagement from './RoleManagement';
import ChangePassword from './ChangePassword';
import { Container, FormControl, IconButton, InputLabel, MenuItem, Select } from "@material-ui/core";
import { fetchDepartmentList, fetchKRAByDepartmentId, fetchOutputTypes, fetchProjectByDepartment } from "../../actions/appActions";
import { fetchIndicatorsByDeptId } from "../../actions/outputActions";
export default (props) => {
  const [outputType, setOutputType] = useState('major');

  const dispatch = useDispatch();
  const accState = useSelector((state) => state.user);
  useEffect(() => {
    var departmentId = accState.userInfo.acc[0]
      ? accState.userInfo.acc[0].DepartmentId
      : 0;
    dispatch(fetchKRAByDepartmentId(departmentId));
    dispatch(fetchOutputTypes());
    dispatch(fetchIndicatorsByDeptId(departmentId));
    dispatch(fetchProjectByDepartment(departmentId));
    dispatch(fetchDepartmentList());
    // eslint-disable-next-line
  }, []);
  const RenderOutputView = () => {
    switch (props.location.pathname) {
      case '/maintenance-kra':
        return <KRAModule />;
      case '/maintenance-project':
        return <PROJECTModule />;
      case '/maintenance-outcome':
        return <OutcomeModule />
      case '/maintenance-indicator':
        return <INDICATORModule />;
      case '/maintenance-user':
        return <UserManagement />;
      case '/maintenance-role':
        return <RoleManagement />;
      case '/maintenance-changepassword':
        return <ChangePassword />;
      default:
        return <KRAModule />;
    }
  }
  const handleOutputTypeChange = (type) => {
    setOutputType(type);
  }


  return (
    <RenderOutputView />
  );

}
