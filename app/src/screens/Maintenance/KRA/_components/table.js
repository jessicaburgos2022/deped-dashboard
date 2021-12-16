import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMajorOutput, editOutputStatus } from '../../../../actions/outputActions';
import Swal from 'sweetalert2';

export default (data) => {
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { SearchResult } = data;
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
                var ret = ""; //await dispatch(editOutputStatus({ outputtype: oType, headerid: hId, statusid: sId }))
                Swal.fire(
                    ret.result,
                    ret.message,
                    ret.result === "Success" ? "success" : "error"
                );
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
                            Output Type
                        </TableCell>
                        <TableCell className="interface-table-header">
                            KRA
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
                                        {r.DepartmentDescription}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.OutputTypeDescription}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.KRAName}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">

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