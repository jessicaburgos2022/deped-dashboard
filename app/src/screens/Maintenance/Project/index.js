import { Button, Grid, InputLabel, MenuItem, Select, FormControl } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProject } from '../../../actions/projectActions';
import Table from './_components/table';
import AddProject from './_components/addProject';

export default () => {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const dispatch = useDispatch();
    const projectState = useSelector(state => state.project);
    const appState = useSelector((state) => state.app);
    const [departmentList, setdepartmentList] = useState(appState.departments);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
    const [projectKeyword, setProjectKeyword] = useState(0);
    useEffect(() => {
        dispatch(searchProject(selectedDepartmentId))
    }, [])
    const handleClose = () => setIsAddOpen(false);
    const handleRefresh = () => dispatch(searchProject(selectedDepartmentId));
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
                {isAddOpen && <AddProject open={isAddOpen} handleClose={handleClose} handleRefresh={handleRefresh} />}
                <div className="container-fluid" style={{ marginTop: 20 }}>
                    <Button className='btn btn-primary' onClick={() => setIsAddOpen(true)} >Add Project</Button>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <div className="advance-search">
                        <span className="desc">Search</span>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <FormControl variant="standard" className="w-100">
                                    <InputLabel>Department</InputLabel>
                                    <Select
                                        fullWidth
                                        label="Department"
                                        name="departmentId"
                                        value={selectedDepartmentId}
                                        onChange={(e) => setSelectedDepartmentId(e.target.value)}
                                    >
                                        <MenuItem value={0}>Any</MenuItem>
                                        {departmentList.map((department, id) => {
                                            return (
                                                <MenuItem key={id} value={department.Id}>
                                                    {department.Name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        dispatch(
                                            searchProject(
                                                selectedDepartmentId
                                            )
                                        )
                                    }
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    <Table SearchResult={projectState.searchResult} />
                </div>
            </div>
        </div>

    )
}