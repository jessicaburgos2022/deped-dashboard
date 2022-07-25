import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import CustomPagination from '../../../components/CustomPagination';
import ResetPasswordModal from './forms/resetPassword';
import { resetPassword } from '../../../actions/userActions';


export default () => {
    const dispatch = useDispatch();
    const perPage = 15;
    const [currentPage, setCurrentPage] = useState(0);
    const userState = useSelector(state => state.user);
    const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

    const currentData = userState.users ? userState.users
        .slice(currentPage * perPage, currentPage * perPage + perPage) : [];

    const handleResetPassword = (accountId) => {
        Swal.fire({
            title: 'Please input your preferred password',
            input: 'text',
            icon: 'warning',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Continue',
            showLoaderOnConfirm: true,
            preConfirm: (newpassword) => {
                dispatch(resetPassword({ accountId: accountId, newpassword: newpassword }))
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: `Account has been updated`
                })
            }
        })
    }

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
                                        <div style={{ display: 'flex', padding: 5 }}>
                                            <Button className="btn btn-secondary" onClick={() => handleResetPassword(r.AccountId)} >Reset Password</Button>
                                        </div>
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
                    userState.length
                }
                paginate={(e, pageNumber) => setCurrentPage(pageNumber - 1)}
                currentPage={currentPage + 1}
            />

            {isResetPasswordOpen && <ResetPasswordModal openResetPassword={isResetPasswordOpen} setResetPasswordOpen={setIsResetPasswordOpen} />}
        </TableContainer >
    )
}