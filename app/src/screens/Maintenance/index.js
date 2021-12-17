import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KRAModule from './KRA'
import { Container, FormControl, IconButton, InputLabel, MenuItem, Select } from "@material-ui/core";
export default () => {
  const [outputType, setOutputType] = useState('major');

    const RenderOutputView = () => {
        switch (outputType) {
            case 'major':
                return 'major ito';
            case 'minor':
                return 'minor ito';
            case 'oo':
                return'oo ito';
            default:
                return 'major ito';
        }
    }
    const handleOutputTypeChange = (type) => {
        setOutputType(type);
    }


  return (
    <>
      <div className="text">Maintenance / Administrator</div>
     
      <div style={{ overflow: 'auto', padding: 25, height: "100vh" }}>
            <Container fixed maxWidth={true}>
                <FormControl variant="standard">
                    <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={outputType}
                        onChange={(e) => handleOutputTypeChange(e.target.value)}
                        label="Age"
                    >
                        <MenuItem value={'major'}>Major Output</MenuItem>
                        <MenuItem value={'minor'}>Minor Output</MenuItem>
                        <MenuItem value={'oo'}>Contributory Output to OO</MenuItem>
                    </Select>
                </FormControl>
                <RenderOutputView />
            </Container>
            <KRAModule />
        </div>
    </>
  );

}
