import React, { useEffect, useState } from 'react';
import { Container, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import MajorView from './_components/Major';
import MinorView from './_components/Minor';
import ContributoryView from './_components/Contributory';
import { fetchDepartmentList, fetchKRAByDepartmentId, fetchOutputTypes, fetchProjectByDepartment } from '../../actions/appActions';
import { fetchIndicatorsByDeptId } from '../../actions/outputActions';
import { useDispatch, useSelector } from 'react-redux';

export default (props) => {

    const [outputType, setOutputType] = useState('major', 'minor');
    // const [outputType, setOutputType] = useState('minor');
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
            case '/outputmajor':
                return <MajorView />;
            case '/outputminor':
                return <MinorView />;
            default:
                return <ContributoryView />;
        }
    }
    return (
        <RenderOutputView />
    )
}