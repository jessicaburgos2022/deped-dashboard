import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchOutcome } from '../../../actions/outcomeActions';
import Swal from 'sweetalert2';
import CustomPagination from '../../../components/CustomPagination';

export default (data) => {
    const userState = useSelector(state => state.user);
    const outcomeState = useSelector(state => state.outcome);
    const dispatch = useDispatch();
    const departmentId = userState.userInfo.acc[0].DepartmentId;
    const { SearchResult } = data;
    const perPage = 15;
    const [currentPage, setCurrentPage] = useState(0);
    const currentData = SearchResult
        .slice(currentPage * perPage, currentPage * perPage + perPage);

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
                            Title
                        </TableCell>
                        <TableCell className="interface-table-header">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        currentData && Array.isArray(currentData) && currentData.map(r => {
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