import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchContributoryOutput } from '../../../../actions/outputActions';
import Table from './table';

export default () => {
    const dispatch = useDispatch();
    const contributorymanagementState = useSelector(state => state.ooManagement);
    useEffect(() => {
        dispatch(searchContributoryOutput())
    }, [])
    return (
        <div style={{ padding: 25 }}>
            <div className="text">Contributory Outputs to OO</div>
            <Table SearchResult={contributorymanagementState.searchResult} />
        </div>
    )
}