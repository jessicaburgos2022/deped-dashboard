import React, { useState } from 'react';
import { Container, FormControl, IconButton, InputLabel, MenuItem, Select } from "@material-ui/core";
import MajorView from './_components/MajorOutput';
import MinorView from './_components/MinorOutput';
import OOView from './_components/OO';

export default (props) => {

    const RenderOutputView = () => {
        switch (props.location.pathname) {
            case '/output/major':
                return <MajorView />;
            case '/output/minor':
                return <MinorView />;
            case '/output/oo':
                return <OOView />;
            default:
                return <MajorView />;
        }
    }

    return (
        <div style={{ overflow: 'auto', padding: 25, height: "100vh" }}>
            <Container fixed maxWidth={true}>
                <RenderOutputView />
            </Container>
        </div>
    )
}