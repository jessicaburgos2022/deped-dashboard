import React, { useState } from 'react';
import { Container, FormControl, IconButton, InputLabel, MenuItem, Select } from "@material-ui/core";
import MajorView from './_components/MajorOutput';
import MinorView from './_components/MinorOutput';
import OOView from './_components/OO';

export default (props) => {

    const RenderOutputView = () => {
        switch (props.location.pathname) {
            case '/insertoutputmajor':
                return <MajorView />;
            case '/insertoutputminor':
                return <MinorView />;
            case '/insertoutputoo':
                return <OOView />;
            default:
                return <MajorView />;
        }
    }

    return (
        <RenderOutputView />
    )
}