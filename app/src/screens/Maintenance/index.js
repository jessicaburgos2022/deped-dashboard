import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KRAModule from './KRA'
import { Container, FormControl, IconButton, InputLabel, MenuItem, Select } from "@material-ui/core";
export default (props) => {
  const [outputType, setOutputType] = useState('major');

  const RenderOutputView = () => {
    switch (props.location.pathname) {
      case '/maintenance/kra':
        return <KRAModule />;
      case '/maintenance/project':
        return <KRAModule />;
      case '/maintenance/indicator':
        return <KRAModule />;
      default:
        return <KRAModule />;
    }
  }
  const handleOutputTypeChange = (type) => {
    setOutputType(type);
  }


  return (
    <>
      <div className="text">Maintenance / Administrator</div>

      <div style={{ overflow: 'auto', padding: 25, height: "100vh" }}>
        <RenderOutputView />
      </div>
    </>
  );

}
