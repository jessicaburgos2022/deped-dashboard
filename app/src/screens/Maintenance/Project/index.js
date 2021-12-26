import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProject } from '../../../actions/projectActions';
import Table from './_components/table';
import AddProject from './_components/addProject';

export default () => {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const dispatch = useDispatch();
    const projectState = useSelector(state => state.project);
    useEffect(() => {
        dispatch(searchProject())
    }, [])
    const handleClose = () => setIsAddOpen(false);
    const handleRefresh = () => dispatch(searchProject());
    return (

        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Project Maintenance</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Maintenance</a></li>
                                <li className="breadcrumb-item active">Project</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    {isAddOpen && <AddProject open={isAddOpen} handleClose={handleClose} handleRefresh={handleRefresh} />}
                    <Button variant="contained" color="primary" onClick={() => setIsAddOpen(true)} >Add PROJECT</Button>
                    <Table SearchResult={projectState.searchResult} />
                </div>
            </div>
        </div>

    )
}