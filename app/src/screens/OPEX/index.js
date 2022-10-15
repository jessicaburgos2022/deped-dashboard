import { Button, Grid, InputLabel, Select, FormControl, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Table from './_components/table';
import { useDispatch, useSelector } from 'react-redux';
import './style.css'; // JBurgos
import { searchOpexRecord } from '../../actions/opexActions';
import AddOutput from './_components/addOpexRecord';
import { hasAccess } from '../../helpers/common';
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

export default () => {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const dispatch = useDispatch();
    const opexState = useSelector(state => state.opex)
    const appState = useSelector((state) => state.app);
    const userState = useSelector((state) => state.user);
    const [departmentList, setdepartmentList] = useState(appState.departments);
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
    const [selectedYear, setSelectedYear] = useState(0);
    const [selectedQuarter, setSelectedQuarter] = useState(0);
    useEffect(() => {
        dispatch(searchOpexRecord(selectedYear, selectedDepartmentId, selectedQuarter))
    }, [selectedQuarter, selectedYear, selectedDepartmentId])
    const handleClose = () => setIsAddOpen(false);
    const handleRefresh = () =>
        dispatch(searchOpexRecord(selectedYear, selectedDepartmentId, selectedQuarter));

    const CustomWidthTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))({
        [`& .${tooltipClasses.tooltip}`]: {
            maxWidth: 500,
        },
    });
    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <div style={{ display: "flex" }}>
                                <h1 className="m-0">Operational Expenditure</h1>
                                {/* <div> */}
                                {/* <CustomWidthTooltip
                                    title={
                                        <p style={{ fontSize: "12", color: "#FFF" }}>
                                            <b>MAJOR OUTPUTS</b> - Programs, Project and
                                            Activities(PPAs) with Funding Source from MOOE, CO,
                                            Downloaded PPAs refer to:
                                            <ul>
                                                <p style={{ fontSize: "10px", color: "#FFF" }}>
                                                    <li>
                                                        <b>Program</b> - an integrated group of activities
                                                        that contribute to particular contunuing objective
                                                        of a department/agency.
                                                    </li>
                                                    <li>
                                                        <b>Project</b> - a special department or agency
                                                        undertaking carried out within a define time frame
                                                        and intended to result in some pre-determined
                                                        measure of goods and services.
                                                    </li>
                                                    <li>
                                                        <b>Activities</b> - a work process that contributes
                                                        to the implementation of a program or sub-program or
                                                        project.
                                                    </li>
                                                </p>
                                            </ul>
                                        </p>
                                    }
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            margin: "0.4rem 0 0 0.4rem",
                                        }}
                                    >
                                        <HelpRoundedIcon
                                            style={{ color: "#012060", width: "1.2rem" }}
                                        ></HelpRoundedIcon>
                                    </div>
                                </CustomWidthTooltip> */}
                                {/* </div> */}
                            </div>
                        </div>

                        {/* <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="#">Output Management</a>
                                </li>
                                <li className="breadcrumb-item active">
                                    Major Output Management
                                </li>
                            </ol>
                        </div> */}
                    </div>
                </div>
                <div className="container-fluid" style={{ marginTop: 20 }}>
                    {hasAccess(userState, 2) && (
                        <Button className='btn btn-primary' onClick={() => setIsAddOpen(true)} >Add OP EX Record</Button>
                    )}
                </div>
            </div>

            {isAddOpen && <AddOutput open={isAddOpen} handleClose={handleClose} handleRefresh={handleRefresh} />}
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
                                        name="departmentid"
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
                                <FormControl variant="standard" className="w-100">
                                    <InputLabel>Year</InputLabel>
                                    <Select
                                        fullWidth
                                        label="Year"
                                        name="year"
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                    >
                                        <MenuItem value={0}>Any</MenuItem>
                                        <MenuItem value={new Date().getFullYear()}>{new Date().getFullYear()}</MenuItem>
                                        <MenuItem value={new Date().getFullYear() - 1}>{new Date().getFullYear() - 1}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={3}>
                                <FormControl variant="standard" className="w-100">
                                    <InputLabel>Quarter</InputLabel>
                                    <Select
                                        fullWidth
                                        label="Quarter"
                                        name="quarter"
                                        value={selectedQuarter}
                                        onChange={(e) => setSelectedQuarter(e.target.value)}
                                    >
                                        <MenuItem value={0}>Any</MenuItem>
                                        <MenuItem value={1}>First Quarter</MenuItem>
                                        <MenuItem value={2}>Second Quarter</MenuItem>
                                        <MenuItem value={3}>Third Quarter</MenuItem>
                                        <MenuItem value={4}>Fourth Quarter</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                    <Table SearchResult={opexState.searchResult} />
                </div>
            </div>
        </div>

    )
}