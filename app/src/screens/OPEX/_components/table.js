import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomPagination from '../../../components/CustomPagination';

export default (data) => {

    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const departmentId = userState.userInfo.acc[0].DepartmentId;
    const { SearchResult } = data;
    const perPage = 15;
    const [currentPage, setCurrentPage] = useState(0);

    const currentData = SearchResult && Array.isArray(SearchResult) ? SearchResult
        .slice(currentPage * perPage, currentPage * perPage + perPage) : [];

    return (
        <TableContainer component={Paper} className="form">
            <Table aria-label="collapsible" className='table table-bordered'>
                <TableHead className='thead'>
                    <TableRow>
                        <TableCell className="interface-table-header text-nowrap">
                            Year
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Quarter
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Department
                        </TableCell>
                        <TableCell className="interface-table-header w-75">
                            Title
                        </TableCell>
                        <TableCell className="interface-table-header">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        currentData && Array.isArray(currentData) && currentData.map(r => {
                            // SearchResult && Array.isArray(SearchResult) && SearchResult.map(r => {
                            return (
                                <TableRow>
                                    <TableCell component="td" className="interface-table-cell text-nowrap text-center">
                                        {r.Year}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell text-nowrap text-center">
                                        {r.Quarter}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.DepartmentName}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.Title}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {/* <Button className='btn btn-secondary' onClick={() => handleViewOpen(r)}>View</Button>
                                        <Button onClick={() => handleViewEdit(r)} hidden={parseInt(departmentId) !== parseInt(r.DepartmentId)}>Edit</Button> */}
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