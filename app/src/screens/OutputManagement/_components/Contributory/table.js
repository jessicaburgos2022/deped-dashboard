import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchContributoryOutput, editOutputStatus } from '../../../../actions/outputActions';
import Swal from 'sweetalert2';
import CustomPagination from '../../../../components/CustomPagination';
import { hasAccess, isOfficeAccessible } from '../../../../helpers/common';

export default (data) => {
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const departmentId = userState.userInfo.acc[0].DepartmentId;
    const { SearchResult } = data;
    const perPage = 15;
    const [currentPage, setCurrentPage] = useState(0);
    const currentData = SearchResult && Array.isArray(SearchResult) ? SearchResult
        .slice(currentPage * perPage, currentPage * perPage + perPage) : [];

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
            <Table aria-label="collapsible" className='table table-bordered'>
                <TableHead className='thead'>
                    <TableRow>
                        <TableCell className="interface-table-header">
                            Department
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Year
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Type
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Outcome Title
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Program / Project
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Indicator
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Result
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Status
                        </TableCell>
                        <TableCell className="interface-table-header">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        currentData && Array.isArray(currentData) && currentData.map(r => {
                            // SearchResult && Array.isArray(SearchResult) && SearchResult.map(r => {
                            console.log(currentData);
                            return (
                                <TableRow>
                                    <TableCell component="td" className="interface-table-cell text-center">
                                        {r.DepartmentName}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell text-center">
                                        {r.KRAYear}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.OutcomeType}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.OutcomeTitle}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.ProjectName}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.IndicatorTitle}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.Result}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        <span className={`badge-pill ${r.StatusId === 2 ? 'badge-success' : 'badge-warning'}`}>{r.Status}</span>
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {/* <Button >View</Button>
                                        <Button hidden={parseInt(departmentId) !== parseInt(r.DepartmentId) || r.StatusId !== 1}>Edit</Button> */}

                                        <div style={{ display: 'flex', padding: 5 }}>
                                            {
                                                hasAccess(userState, 7) &&
                                                isOfficeAccessible(userState, r.DepartmentId) &&
                                                r.StatusId === 1
                                                &&
                                                <Button className="btn btn-secondary" onClick={() => handleEditOutputStatus(3, r.OutcomeResultId, 2)} >Approve</Button>
                                            }
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            <CustomPagination
                perPage={perPage}
                total={
                    SearchResult.length
                }
                paginate={(e, pageNumber) => setCurrentPage(pageNumber - 1)}
                currentPage={currentPage + 1}
            />
        </TableContainer>
    )
}