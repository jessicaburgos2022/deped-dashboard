import React, { useState } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import MajorView from './_components/Major';
import MinorView from './_components/Minor';
import ContributoryView from './_components/Contributory';

export default (props) => {

    const [outputType, setOutputType] = useState('major', 'minor');
    // const [outputType, setOutputType] = useState('minor');

    const RenderOutputView = () => {
        switch (props.location.pathname) {
            case '/outputmanagement/major':
                return <MajorView />;
            case '/outputmanagement/minor':
                return <MinorView />;
            default:
                return <ContributoryView />;
        }
    }
    return (
        <div style={{ overflow: 'auto', padding: 25, height: "100vh" }}>
            <Container fixed maxWidth={true}>
                <RenderOutputView />
            </Container>
        </div>)
}