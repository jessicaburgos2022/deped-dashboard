import React, { useEffect, useState } from 'react';
import { Container, FormControl, IconButton, InputLabel, MenuItem, Select } from "@material-ui/core";
import MajorView from './_components/MajorOutput';
import MinorView from './_components/MinorOutput';
import OOView from './_components/OO';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDepartmentList, fetchKRAByDepartmentId, fetchOutputTypes, fetchProjectByDepartment } from '../../actions/appActions';
import { fetchIndicatorsByDeptId } from '../../actions/outputActions';

export default (props) => {

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