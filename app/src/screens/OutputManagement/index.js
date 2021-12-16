import React, { useState } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import MajorView from './_components/Major';
import MinorView from './_components/Minor';
import ContributoryView from './_components/Contributory';

export default () => {

    const [outputType, setOutputType] = useState('major', 'minor');
    // const [outputType, setOutputType] = useState('minor');

    const RenderOutputView = () => {
        switch (outputType) {
            case 'major':
                return <MajorView />;
            case 'minor':
                return <MinorView />;
            default:
                return <ContributoryView />;
        }
    }
    const handleOutputTypeChange = (type) => {
        setOutputType(type);
    }
    return (
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
        </div>)
}