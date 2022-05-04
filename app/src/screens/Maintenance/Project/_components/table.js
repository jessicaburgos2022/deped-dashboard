import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import React, { useState } from 'react';
import ViewOutput from './viewoutput';
import ViewEdit from './editProject';
import { useDispatch, useSelector } from 'react-redux';
import { editOutputStatus, searchMinorOutput } from '../../../../actions/outputActions';
import Swal from 'sweetalert2';
// import { searchKRA } from '../../../../actions/kraActions';
import { searchProject } from '../../../../actions/projectActions';
import CustomPagination from '../../../../components/CustomPagination';

export default (data) => {
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const departmentId = userState.userInfo.acc[0].DepartmentId;
    const { SearchResult } = data;
    const [isViewOpen, setIsViewOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState({});
    const perPage = 15;
    const [currentPage, setCurrentPage] = useState(0);

    const currentData = SearchResult
        .slice(currentPage * perPage, currentPage * perPage + perPage);

    const handleViewOpen = (data) => {
        setSelectedRow(data);
        setIsViewOpen(true)

    }
    const handleViewEdit = (data) => {
        setSelectedRow(data);
        setIsEditOpen(true)
    }
    const handleRefresh = () => {
        dispatch(searchProject(0));
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
            {
                isViewOpen && <ViewOutput data={selectedRow} open={isViewOpen} handleClose={() => setIsViewOpen(false)} />
            }
            {
                isEditOpen && <ViewEdit data={selectedRow} open={isEditOpen} handleClose={() => setIsEditOpen(false)} handleRefresh={() => handleRefresh()} />
            }
            <Table aria-label="collapsible" className='table table-bordered'>
                <TableHead className='thead'>
                    <TableRow>
                        <TableCell className="interface-table-header text-nowrap">KRA Id</TableCell>
                        <TableCell className="interface-table-header text-nowrap">Project ID</TableCell>
                        <TableCell className="interface-table-header">Department</TableCell>
                        <TableCell className="interface-table-header">KRA Name</TableCell>
                        <TableCell className="interface-table-header">Project / Program</TableCell>
                        <TableCell className="interface-table-header">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        currentData && Array.isArray(currentData) && currentData.map(r => {
                            return (
                                <TableRow>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.KRAId}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.ProjectId}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.DepartmentDescription}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.KRADescription}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.ProjectName}
                                    </TableCell>

                                    <TableCell component="td" className="interface-table-cell">
                                        <Button className='btn btn-secondary' onClick={() => handleViewOpen(r)}>View</Button>
                                        <Button className='btn btn-secondary' onClick={() => handleViewEdit(r)} hidden={parseInt(departmentId) !== parseInt(r.DepartmentId)}>Edit</Button>
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