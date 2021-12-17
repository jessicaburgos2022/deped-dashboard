import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchContributoryOutput, editOutputStatus } from '../../../../actions/outputActions';
import Swal from 'sweetalert2';

export default (data) => {
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const departmentId = userState.userInfo.acc[0].DepartmentId;
    const { SearchResult } = data;

    const handleRefresh = () => {
        dispatch(searchContributoryOutput());
    }
    const handleEditOutputStatus = (oType, hId, sId) => {
        Swal.fire({
            title: "Confirmation",
            text: "Do you want to approve?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No"
        }).then(async (r) => {
            if (r.isConfirmed) {
                var ret = await dispatch(editOutputStatus({ outputtype: oType, headerid: hId, statusid: sId }))
                Swal.fire(
                    ret.result,
                    ret.message,
                    ret.result === "Success" ? "success" : "error"
                );
                handleRefresh();
            }
        });
    }
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell className="interface-table-header">
                            Department
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Outcome Type
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Outcome Title
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Project
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Indicator
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Result
                        </TableCell>
                        <TableCell className="interface-table-header">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        SearchResult && Array.isArray(SearchResult) && SearchResult.map(r => {
                            return (
                                <TableRow>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.DepartmentName}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.OutcomeType}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.OutcomeTitle}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.ProjectName}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.IndicatorTitle}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.Result}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {/* <Button >View</Button>
                                        <Button hidden={parseInt(departmentId) !== parseInt(r.DepartmentId) || r.StatusId !== 1}>Edit</Button> */}
                                        <Button onClick={() => handleEditOutputStatus(3, r.OutcomeResultId, 2)} hidden={userState.userInfo.acc[0].RoleId !== 1 || r.StatusId !== 1 || parseInt(departmentId) !== parseInt(r.DepartmentId)}>Approve</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}