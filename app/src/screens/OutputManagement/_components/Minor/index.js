import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {searchMinorOutput} from '../../../../actions/outputActions';
import Table from './table';

export default () => {
    const dispatch = useDispatch();
    const outputManagementState = useSelector(state => state.minorOutputManagement);
    useEffect(()=>{
        dispatch(searchMinorOutput())
    },[])
    return (
        <div style={{ padding: 25 }}>
            <div className="text">Minor Outputs</div>
            <Table SearchResult = {outputManagementState.searchResult} />
        </div>
    )
}