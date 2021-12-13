import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import React, { useState } from 'react';
import ViewOutput from './viewoutput';

export default (data) => {
    const { SearchResult } = data;
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});

    const handleViewOpen = (data) => {
        setSelectedRow(data);
        setIsViewOpen(true)
    }
    return (
        <TableContainer component={Paper}>
            {
                isViewOpen && <ViewOutput data={selectedRow} open={isViewOpen} handleClose={() => setIsViewOpen(false)} />
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