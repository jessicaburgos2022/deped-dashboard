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
        <TableContainer component={Paper} className="form">
            {
                isViewOpen && <ViewOutput data={selectedRow} open={isViewOpen} handleClose={() => setIsViewOpen(false)} />
            }
            {
                isEditOpen && <ViewEdit data={selectedRow} open={isEditOpen} handleClose={() => setIsEditOpen(false)} handleRefresh={() => handleRefresh()} />
            }
            <Table aria-label="collapsible" className='table table-striped table-bordered'>
                <TableHead className='thead'>
                    <TableRow>
                        <TableCell className="interface-table-header">
                            Department
                        </TableCell>
                        <TableCell className="interface-table-header">
                            Year
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
                                    <TableCell component="td" className="interface-table-cell  text-center">
                                        {r.Department}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell text-center">
                                        {r.KRAYear}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.KRAName}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.Project}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        {r.Status}
                                    </TableCell>
                                    <TableCell component="td" className="interface-table-cell">
                                        <div style={{ display: 'flex', padding: 5 }}>
                                            <Button variant="contained" color="primary" onClick={() => handleViewOpen(r)}>View</Button>
                                            {
                                                (parseInt(userState.userInfo.acc[0].RoleId) === 1 || (parseInt(departmentId) === parseInt(r.DepartmentId) && userState.userInfo.acc[0].RoleId === 3))
                                                &&
                                                <Button style={{marginLeft: 5}}  variant="contained" color="primary" onClick={() => handleViewEdit(r)}>Edit</Button>
                                            }
                                            {
                                                (parseInt(userState.userInfo.acc[0].RoleId) === 1 || (parseInt(departmentId) === parseInt(r.DepartmentId) && userState.userInfo.acc[0].RoleId === 3 && r.StatusId === 1))
                                                &&
                                                <Button  style={{marginLeft: 5}} variant="contained" color="primary" onClick={() => handleEditOutputStatus(1, r.OutputMajorHeaderId, 2)} >Approve</Button>
                                            }
                                        </div>
                                    </TableCell>

                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
            
            <CustomPagination perPage={perPage}
            total={
                SearchResult.length
            }
            paginate={(e, pageNumber) => setCurrentPage(pageNumber - 1)}
            currentPage={currentPage + 1} >

            </CustomPagination>
            </TableContainer>
    )
}