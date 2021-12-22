import { Button, FormGroup, MenuItem, Select } from '@material-ui/core';
import { Container, Grid, InputLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMajorOutput } from '../../../../actions/outputActions';
import Table from './table';

export default () => {
    const dispatch = useDispatch();
    const outputManagementState = useSelector(state => state.majorOutputManagement);
    const appState = useSelector(state => state.app);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
    const [kraName, setKraName] = useState('');
    const [outputTypeId, setOutputTypeId] = useState(0);
    const [departmentList, setdepartmentList] = useState(
        appState.departments
    );
    const [selectedKRA, setSelectedKRA] = useState(null);

    // const handleKRAChange = async (event) => {
    //     setValue("kraid", event.target.value);
    //     setSelectedKRA(event.target.value);
    //     dispatch(fetchProjectByKRAId(event.target.value));
    //   };
    useEffect(() => {
        dispatch(searchMajorOutput(selectedDepartmentId, kraName))
    }, [])
    return (
        <div style={{ padding: 25 }}>
            <div className="text">Major Outputs</div>
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
                    <TextField
                        fullWidth
                        className="output-margin"
                        placeholder="KRA"
                        label="Objective"
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
                        onClick={() => dispatch(searchMajorOutput(selectedDepartmentId, kraName))}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
            <Table SearchResult={outputManagementState.searchResult} />
        </div>
    )
}