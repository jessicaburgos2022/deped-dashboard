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
        <RenderOutputView />
    )
}