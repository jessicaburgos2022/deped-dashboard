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
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Contributory Outputs to OO Management</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Output Management</a></li>
                                <li className="breadcrumb-item active">Contributory Outputs to OO Management</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <Table SearchResult={contributorymanagementState.searchResult} />
                </div>
            </div>
        </div>
    )
}