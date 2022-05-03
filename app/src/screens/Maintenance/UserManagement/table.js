import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomPagination from '../../../components/CustomPagination';

export default (data) => {
    const { SearchResult } = data;
    const perPage = 15;
    const [currentPage, setCurrentPage] = useState(0);

    const currentData = SearchResult
        .slice(currentPage * perPage, currentPage * perPage + perPage);


    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible" className='table table-bordered'>
                <TableHead>
                    <TableRow>
                        <TableCell className="interface-table-header">
                            Name
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Username
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Department
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Role
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
                                        {r.FirstName} {r.MiddleName} {r.Surname}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.Username}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.DepartmentName}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.RoleName}
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