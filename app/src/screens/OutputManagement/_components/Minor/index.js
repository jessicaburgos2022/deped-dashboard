import { Button, FormGroup, MenuItem, Select, Container, Grid, InputLabel, TextField, FormControl } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchMinorOutput } from '../../../../actions/outputActions';
import Table from './table';
import './style.css';

export default () => {
    const dispatch = useDispatch();
    const outputManagementState = useSelector(state => state.minorOutputManagement);
    const appState = useSelector(state => state.app);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
    const [kraName, setKraName] = useState('');
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(0);
    const [outputTypeId, setOutputTypeId] = useState(0);
    const [departmentList, setdepartmentList] = useState(
        appState.departments
    );
    const [selectedKRA, setSelectedKRA] = useState(null);
    useEffect(() => {
        dispatch(searchMinorOutput(selectedYear, selectedDepartmentId, kraName))
    }, [])
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Minor Output Management</h1>
                            <p style={{ fontSize: "12px" }} className="text-muted">
                                <b>MINOR OUTPUTS</b> - Programs, Project and Activities on Cross-cutting KRAs not included in OPCRF Cross-cutting KRAs may include:
                                <ul>
                                    <p style={{ fontSize: "10px" }} className="text-muted">
                                        <li>Technical assistance, Monitoring and Evaluation, Planning, Learning and Development, and other In-House KRAs</li>
                                    </p>

                                </ul>

                            </p>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Output Management</a></li>
                                <li className="breadcrumb-item active">Minor Output Management</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div className="container-fluid" style={{ marginTop: 20 }}>
                    <Link to="/insertoutputminor" style={{ color: "#fff", margin: "auto" }}>
                        <Button variant="contained" color="primary">Insert Minor Output</Button>
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
                                        <MenuItem value={currentYear - 1}>
                                            {currentYear - 1}
                                        </MenuItem>
                                        <MenuItem value={currentYear}>
                                            {currentYear}
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl variant="standard" className="w-100">
                                    <InputLabel>Department</InputLabel>
                                    <Select
                                        label="Department"
                                        fullWidth
                                        name="departmentId"
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
                                    fullWidth
                                    placeholder="KRA"
                                    label="KRA"
                                    variant="standard"
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
                                    onClick={() => dispatch(searchMinorOutput(selectedYear, selectedDepartmentId, kraName))}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    <Table SearchResult={outputManagementState.searchResult} />
                </div>
            </div>
        </div>
    )
}