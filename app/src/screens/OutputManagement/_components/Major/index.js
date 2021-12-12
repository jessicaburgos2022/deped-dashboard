import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {searchMajorOutput} from '../../../../actions/outputActions';
import Table from './table';

export default () => {
    const dispatch = useDispatch();
    const outputManagementState = useSelector(state => state.majorOutputManagement);
    useEffect(()=>{
        dispatch(searchMajorOutput())
    },[])
    return (
        <div style={{ padding: 25 }}>
            <div className="text">Major</div>
            <Table SearchResult = {outputManagementState.searchResult} />
        </div>
    )
}