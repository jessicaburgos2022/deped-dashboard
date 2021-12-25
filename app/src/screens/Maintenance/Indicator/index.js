import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchKRA } from '../../../actions/kraActions';
import Table from './_components/table';
import AddOutput from './_components/addOutput';

export default () => {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const dispatch = useDispatch();
    const kraState = useSelector(state => state.kra);
    useEffect(() => {
        dispatch(searchKRA())
    }, [])
    const handleClose = () => setIsAddOpen(false);
    const handleRefresh = () => dispatch(searchKRA());
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">KRA Management</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Maintenance</a></li>
                                <li className="breadcrumb-item active">KRA Management</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    {isAddOpen && <AddOutput open={isAddOpen} handleClose={handleClose} handleRefresh={handleRefresh} />}
                    <div className="text">KRA  &nbsp; <Button variant="contained" color="success" onClick={() => setIsAddOpen(true)} >Add KRA</Button></div>
                    <Table SearchResult={kraState.searchResult} />

                </div>
            </div>
        </div>
    )
}