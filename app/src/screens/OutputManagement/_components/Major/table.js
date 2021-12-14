import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import React, { useState } from 'react';
import ViewOutput from './viewoutput';
import ViewEdit from './editOutput';
import { useSelector } from 'react-redux';

export default (data) => {
    const userState = useSelector(state => state.user);
    const departmentId = userState.userInfo.acc[0].DepartmentId;
    const { SearchResult } = data;
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    console.log(data)
    const handleViewOpen = (data) => {
        setSelectedRow(data);
        setIsViewOpen(true)

    }
    const handleViewEdit = (data) => {
        setSelectedRow(data);
        setIsEditOpen(true)
    }
    return (
        <TableContainer component={Paper}>
            {
                isViewOpen && <ViewOutput data={selectedRow} open={isViewOpen} handleClose={() => setIsViewOpen(false)} />
            }
            {
                isEditOpen && <ViewEdit data={selectedRow} open={isEditOpen} handleClose={() => setIsEditOpen(false)} />
            }
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell className="interface-table-header">
                            Department
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Project
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Output
                        </TableCell>
                        <TableCell className="interface-table-header">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        SearchResult && Array.isArray(SearchResult) && SearchResult.map(r => {
                            console.log(SearchResult)
                            return (
                                <TableRow>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.Department}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.Project}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.Output}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        <Button onClick={() => handleViewOpen(r)}>View</Button>
                                        <Button onClick={() => handleViewEdit(r)} hidden={parseInt(departmentId) !== parseInt(r.DepartmentId)}>Edit</Button>
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