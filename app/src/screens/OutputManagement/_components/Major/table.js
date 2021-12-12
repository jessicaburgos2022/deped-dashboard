import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import React, { useState } from 'react';
import ViewOutput from './viewoutput';

export default (data) => {
    const { SearchResult } = data;
    const [isViewOpen, setIsViewOpen] = useState(false);
    return (
        <TableContainer component={Paper}>
            {
                isViewOpen && <ViewOutput open={isViewOpen} handleClose={() => setIsViewOpen(false)} />
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
                                        <Button onClick={() => setIsViewOpen(true)}>View</Button>
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