import { Button, FormControl, FormGroup, MenuItem, Select, Container, Grid, InputLabel, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchMajorOutput } from '../../../../actions/outputActions';
import Table from './table';
import './style.css';
export default () => {
    const dispatch = useDispatch();
    const outputManagementState = useSelector(state => state.majorOutputManagement);
    const appState = useSelector(state => state.app);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
    const [selectedYear, setSelectedYear] = useState(0);
    const [kraName, setKraName] = useState('');
    const [outputTypeId, setOutputTypeId] = useState(0);
    const [departmentList, setdepartmentList] = useState(
        appState.departments
    );
    const [selectedKRA, setSelectedKRA] = useState(null);

    useEffect(() => {
        dispatch(searchMajorOutput(selectedYear, selectedDepartmentId, kraName))
    }, [])
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Major Output Management</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Output Management</a></li>
                                <li className="breadcrumb-item active">Major Output Management</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" style={{ marginTop: 20 }}>
                    <Link to="/insertoutputmajor" style={{ color: "#fff", margin: "auto" }}>
                        <Button variant="contained" color="primary">Insert Major Output</Button>
                    </Link>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <div className='advance-search'>
                        <span className='desc'>Search</span>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <FormControl variant="standard" className="w-100">
                                    <InputLabel>Year</InputLabel>
                                    <Select
                                        fullWidth
                                        label="Year"
                                        name="selectedYear"
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        value={selectedYear}
                                    >
                                        <MenuItem value={0}>
                                            Any
                                        </MenuItem>
                                        <MenuItem value={new Date().getFullYear() - 1}>
                                            {new Date().getFullYear() - 1}
                                        </MenuItem>
                                        <MenuItem value={new Date().getFullYear()}>
                                            {new Date().getFullYear()}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
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
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    placeholder="KRA"
                                    label="KRA"
                                    variant="standard"
                                    fullWidth
                                    onChange={(e) => setKraName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => dispatch(searchMajorOutput(selectedYear, selectedDepartmentId, kraName))}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    <Table SearchResult={outputManagementState.searchResult} />
                </div>
            </div>
        </div >
    )
}