import React, { useState } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import MajorView from './_components/Major';
import MinorView from './_components/Minor';

export default () => {

    const [outputType, setOutputType] = useState('major');

    const RenderOutputView = () => {
        switch (outputType) {
            case 'major':
                return <MajorView />;
            case 'minor':
                return <MinorView />;
            default:
                return <MajorView />;
        }
    }
    const handleOutputTypeChange = (type) => {
        setOutputType(type);
    }
    return (
        <div style={{ height: "100vh", overflow: "auto" }}>
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
                        <MenuItem value={'major'}>Major</MenuItem>
                        <MenuItem value={'minor'}>Minor</MenuItem>
                    </Select>
                </FormControl>
                <RenderOutputView />
            </Container>
        </div>)
}