import { Button, FormControl, FormGroup, MenuItem, Select, Container, Grid, InputLabel, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOutcomeTypes, searchOutcome } from '../../../actions/outcomeActions';
import AddOutcome from './addOutcome';
import Table from './table';
export default () => {
    const dispatch = useDispatch();
    const outcomeState = useSelector(state => state.outcome);
    const appState = useSelector(state => state.app);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
    const [selectedOutcomeTypeId, setselectedOutcomeTypeId] = useState(0);
    const [OutcomeTitle, setOutcomeTitle] = useState('');
    const [isAddOpen, setisAddOpen] = useState(false);
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(0);
    const [departmentList, setdepartmentList] = useState(
        appState.departments
    );
    useEffect(() => {
        dispatch(fetchOutcomeTypes());
        dispatch(searchOutcome(selectedYear, selectedDepartmentId, selectedOutcomeTypeId, OutcomeTitle))
    }, [dispatch, fetchOutcomeTypes])
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Outcome Management</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Maintenance</a></li>
                                <li className="breadcrumb-item active">Outcome</li>
                            </ol>
                        </div>
                    </div>
                </div>
                {isAddOpen && <AddOutcome open={isAddOpen} handleClose={() => setisAddOpen(false)} handleRefresh={() => searchOutcome(selectedDepartmentId, selectedOutcomeTypeId, OutcomeTitle)} />}
                <div className="container-fluid" style={{ marginTop: 20 }}>
                    <Button className="btn btn-primary" onClick={() => setisAddOpen(true)} >Add Outcome</Button>
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
                                        className="output-category-margin"
                                        name="departmentId"
                                        onChange={(e) => setSelectedDepartmentId(e.target.value)}
                                    >
                                        <MenuItem value={0}>
                                            None
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
                                <FormControl variant="standard" className="w-100">
                                    <InputLabel>Outcome Type</InputLabel>
                                    <Select
                                        label="Outcome Type"
                                        fullWidth
                                        className="output-category-margin"
                                        name="outcomeTypeId"
                                        onChange={(e) => setselectedOutcomeTypeId(e.target.value)}
                                    >
                                        <MenuItem value={0}>
                                            Any
                                        </MenuItem>
                                        {outcomeState.outcometypes && Array.isArray(outcomeState.outcometypes) && outcomeState.outcometypes.map((outcomeType, id) => {
                                            return (
                                                <MenuItem key={id} value={outcomeType.Id}>
                                                    {outcomeType.Outcome}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={3} >
                                <TextField
                                    fullWidth
                                    placeholder="Title Keyword"
                                    label="Title"
                                    variant="standard"
                                    size="small"
                                    onChange={(e) => setOutcomeTitle(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={3} >
                                <Button
                                    className="output-margin"
                                    variant="contained"
                                    style={{ width: "100%" }}
                                    color="primary"
                                    onClick={() => dispatch(searchOutcome(selectedYear, selectedDepartmentId, selectedOutcomeTypeId, OutcomeTitle))}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                    <Table SearchResult={outcomeState.outcome} />
                </div >
            </div >
        </div >
    )
}