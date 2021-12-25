import { Button, FormGroup, MenuItem, Select } from '@material-ui/core';
import { Container, Grid, InputLabel, TextField } from '@mui/material';
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
    const [departmentList, setdepartmentList] = useState(
        appState.departments
    );
    useEffect(() => {
        dispatch(fetchOutcomeTypes());
        dispatch(searchOutcome(selectedDepartmentId, selectedOutcomeTypeId, OutcomeTitle))
    }, [dispatch, fetchOutcomeTypes])
    return (
        <div style={{ padding: 25 }}>
            <div className="text">Project Outcomes</div>
            {isAddOpen && <AddOutcome open={isAddOpen} handleClose={() => setisAddOpen(false)} handleRefresh={() => searchOutcome(selectedDepartmentId, selectedOutcomeTypeId, OutcomeTitle)} />}
            <Button variant="contained" color="success" onClick={() => setisAddOpen(true)} >Add Outcome</Button>
            <Grid container spacing={3} style={{ padding: 10 }}>
                <Grid item xs={3}>
                    <FormGroup>
                        <InputLabel>Department</InputLabel>
                        <Select
                            label="Department"
                            fullWidth
                            className="output-category-margin"
                            name="departmentId"
                            label="Select Department"
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
                    </FormGroup>
                </Grid>
                <Grid item xs={3}>
                    <FormGroup>
                        <InputLabel>Outcome Type</InputLabel>
                        <Select
                            label="Outcome Type"
                            fullWidth
                            className="output-category-margin"
                            name="outcomeTypeId"
                            label="Select Department"
                            onChange={(e) => setselectedOutcomeTypeId(e.target.value)}
                        >
                            {outcomeState.outcometypes && Array.isArray(outcomeState.outcometypes) && outcomeState.outcometypes.map((outcomeType, id) => {
                                return (
                                    <MenuItem key={id} value={outcomeType.Id}>
                                        {outcomeType.Outcome}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormGroup>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        className="output-margin"
                        placeholder="Keyword"
                        label="Outcome"
                        variant="outlined"
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
                        onClick={() => dispatch(searchOutcome(selectedDepartmentId, selectedOutcomeTypeId, OutcomeTitle))}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
            <Table SearchResult={outcomeState.outcome} />
        </div >
    )
}