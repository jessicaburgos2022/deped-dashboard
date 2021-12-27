import { Button, FormGroup, MenuItem, Select, Container, Grid, InputLabel, TextField, FormControl } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMinorOutput } from '../../../../actions/outputActions';
import Table from './table';

export default () => {
    const dispatch = useDispatch();
    const outputManagementState = useSelector(state => state.minorOutputManagement);
    const appState = useSelector(state => state.app);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
    const [kraName, setKraName] = useState('');
    const [outputTypeId, setOutputTypeId] = useState(0);
    const [departmentList, setdepartmentList] = useState(
        appState.departments
    );
    const [selectedKRA, setSelectedKRA] = useState(null);
    useEffect(() => {
        dispatch(searchMinorOutput(selectedDepartmentId, kraName))
    }, [])
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Minor Output Management</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Output Management</a></li>
                                <li className="breadcrumb-item active">Minor Output Management</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <Grid container spacing={3} style={{ padding: 10 }}>
                        <Grid item xs={3}>
                            <FormGroup>
                                <FormControl variant="standard" className=" w-100">
                                    <InputLabel>Department</InputLabel>
                                    <Select
                                        variant="standard"
                                        label="Department"
                                        fullWidth
                                        className="output-category-margin"
                                        name="departmentId"
                                        label="Select Department"
                                        onChange={(e) => setSelectedDepartmentId(e.target.value)}
                                    >
                                        <MenuItem value={0}>
                                            Any
                                        </MenuItem>
                                        {departmentList.map((department, id) => {
                                            return (
                                                <MenuItem key={id} value={department.Id}>
                                                    {department.Name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                fullWidth
                                className="output-margin"
                                placeholder="KRA"
                                label="KRA"
                                variant="outlined"
                                size="small"
                                onChange={(e) => setKraName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3} >
                            <Button
                                className="output-margin"
                                variant="contained"
                                style={{ width: "100%" }}
                                color="primary"
                                onClick={() => dispatch(searchMinorOutput(selectedDepartmentId, kraName))}
                            >
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                    <Table SearchResult={outputManagementState.searchResult} />
                </div>
            </div>
        </div>
    )
}