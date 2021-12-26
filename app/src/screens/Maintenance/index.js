import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KRAModule from './KRA';
import PROJECTModule from './Project';
import INDICATORModule from './Indicator';
import OutcomeModule from './Outcome';
import UserManagement from './UserManagement';
import { Container, FormControl, IconButton, InputLabel, MenuItem, Select } from "@material-ui/core";
export default (props) => {
  const [outputType, setOutputType] = useState('major');

  const RenderOutputView = () => {
    switch (props.location.pathname) {
      case '/maintenance/kra':
        return <KRAModule />;
      case '/maintenance/project':
        return <PROJECTModule />;
      case '/maintenance/outcome':
        return <OutcomeModule />
      case '/maintenance/indicator':
        return <INDICATORModule />;
        case '/maintenance/user':
          return <UserManagement />;
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
