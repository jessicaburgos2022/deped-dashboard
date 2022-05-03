import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchKRA } from '../../../actions/kraActions';
import Table from './_components/table';
import AddOutput from './_components/addOutput';
import './style.css'; // JBurgos

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
                                <li className="breadcrumb-item active">KRA</li>
                            </ol>
                        </div>
                    </div>
                </div>
                {isAddOpen && <AddOutput open={isAddOpen} handleClose={handleClose} handleRefresh={handleRefresh} />}
                <div className="container-fluid" style={{ marginTop: 20 }}>
                    <Button className='btn btn-primary' onClick={() => setIsAddOpen(true)} >Add KRA</Button>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <Table SearchResult={kraState.searchResult} />
                </div>
            </div>
        </div>

    )
}