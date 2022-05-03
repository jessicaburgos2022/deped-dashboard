import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchOutcome } from '../../../actions/outcomeActions';
import Swal from 'sweetalert2';
import CustomPagination from '../../../components/CustomPagination';
import ViewOutcome from './viewOutcome';

export default (data) => {
    const userState = useSelector(state => state.user);
    const outcomeState = useSelector(state => state.outcome);
    const dispatch = useDispatch();
    const departmentId = userState.userInfo.acc[0].DepartmentId;
    const { SearchResult } = data;
    const perPage = 15;
    const [currentPage, setCurrentPage] = useState(0);
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const currentData = SearchResult
        .slice(currentPage * perPage, currentPage * perPage + perPage);

    const handleViewOpen = (data) => {
        setSelectedRow(data);
        setIsViewOpen(true)
    }
    return (
        <TableContainer component={Paper}>
            {
                isViewOpen && <ViewOutcome data={selectedRow} open={isViewOpen} handleClose={() => setIsViewOpen(false)} />
            }
            <Table aria-label="collapsible" className='table table-bordered'>
                <TableHead className="thead">
                    <TableRow>
                        <TableCell className="interface-table-header">
                            Department
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Year
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
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.DepartmentName}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.OutcomeYear}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.OutcomeType}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell w-50">
                                        {r.OutcomeTitle}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        <Button className="btn btn-secondary" onClick={() => handleViewOpen(r)}>View</Button>
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