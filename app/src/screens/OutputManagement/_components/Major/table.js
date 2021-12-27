import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import React, { useState } from 'react';
import ViewOutput from './viewoutput';
import ViewEdit from './editOutput';
import { useSelector, useDispatch } from 'react-redux';
import { searchMajorOutput, editOutputStatus } from '../../../../actions/outputActions';
import Swal from 'sweetalert2';
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
        dispatch(searchMajorOutput());
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
            {
                isViewOpen && <ViewOutput data={selectedRow} open={isViewOpen} handleClose={() => setIsViewOpen(false)} />
            }
            {
                isEditOpen && <ViewEdit data={selectedRow} open={isEditOpen} handleClose={() => setIsEditOpen(false)} handleRefresh={() => handleRefresh()} />
            }
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell className="interface-table-header">
                            Department
                        </TableCell>
                        <TableCell className="interface-table-header">
                            KRA
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Project
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
                            return (
                                <TableRow>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.Department}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.KRAName}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.Project}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        {r.Status}
                                    </TableCell>
                                    <TableCell component="th" className="interface-table-cell">
                                        <Button onClick={() => handleViewOpen(r)}>View</Button>
                                        {
                                            (parseInt(userState.userInfo.acc[0].RoleId) === 1 || (parseInt(departmentId) === parseInt(r.DepartmentId) && userState.userInfo.acc[0].RoleId === 3))
                                            &&
                                            <Button onClick={() => handleViewEdit(r)}>Edit</Button>
                                        }
                                        {
                                            (parseInt(userState.userInfo.acc[0].RoleId) === 1 || (parseInt(departmentId) === parseInt(r.DepartmentId) && userState.userInfo.acc[0].RoleId === 3 && r.StatusId === 1))
                                            &&
                                            <Button onClick={() => handleEditOutputStatus(1, r.OutputMajorHeaderId, 2)} >Approve</Button>
                                        }
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