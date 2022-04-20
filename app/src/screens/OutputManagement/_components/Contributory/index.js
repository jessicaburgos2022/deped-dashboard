import { Button, FormControl, FormGroup, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { searchContributoryOutput } from '../../../../actions/outputActions';
import { fetchOutcomeTypes } from '../../../../actions/outcomeActions';
import Table from './table';

export default () => {
    const dispatch = useDispatch();
    const contributorymanagementState = useSelector(state => state.ooManagement);
    const appState = useSelector(state => state.app);
    const outcomeState = useSelector(state => state.outcome);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedOutcomeType, setSelectedOutcomeType] = useState(0);
    const [Title, setTitle] = useState('');
    const [departmentList, setdepartmentList] = useState(
        appState.departments
    );
    const currentYear = new Date().getFullYear();
    const [outcomeTypeList, setOutcomeTypeList] = useState(outcomeState.outcometypes);
    useEffect(() => {
        dispatch(fetchOutcomeTypes())
        dispatch(searchContributoryOutput({ krayear: selectedYear, departmentid: selectedDepartmentId, outcometypeid: selectedOutcomeType, title: Title }))
    }, [])
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Target Outputs Along Key Result Areas (KRAs)</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Output Management</a></li>
                                <li className="breadcrumb-item active">Target Outputs Along Key Result Areas</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="container-fluid" style={{ marginTop: 20 }}>
                    <Link to="/insertoutputoo" style={{ color: "#fff", margin: "auto" }}>
                        <Button variant="contained" color="primary">Insert Target Outputs</Button>
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
                                <FormControl variant="standard" className=" w-100">
                                    <InputLabel>Department</InputLabel>
                                    <Select
                                        label="Department"
                                        fullWidth
                                        className="output-category-margin"
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
                                <FormControl variant="standard" className=" w-100">
                                    <InputLabel>Outcome</InputLabel>
                                    <Select
                                        label="Outcome"
                                        fullWidth
                                        className="output-category-margin"
                                        name="outcometypeid"
                                        onChange={(e) => setSelectedOutcomeType(e.target.value)}
                                    >
                                        <MenuItem value={0}>
                                            Any
                                        </MenuItem>
                                        {outcomeTypeList.map((outcome, id) => {
                                            return (
                                                <MenuItem key={id} value={outcome.Id}>
                                                    {outcome.Outcome}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3} >
                                <Button
                                    className="output-margin"
                                    variant="contained"
                                    style={{ width: "100%" }}
                                    color="primary"
                                    onClick={() => dispatch(searchContributoryOutput({ krayear: selectedYear, departmentid: selectedDepartmentId, outcometypeid: selectedOutcomeType, title: Title }))}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    <Table SearchResult={contributorymanagementState.searchResult ? contributorymanagementState.searchResult : []} departmentid={selectedDepartmentId} outcometypeid={selectedOutcomeType} title={Title} />
                </div>
            </div>
        </div >
    )
}