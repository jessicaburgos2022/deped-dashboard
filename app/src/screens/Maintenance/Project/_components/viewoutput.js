import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
export default (props) => {
    const { open, handleClose, data } = props;
    console.log(data)
    return (
        <React.Fragment>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    View Project
                </DialogTitle>
                <DialogContent dividers>
                    <b>KRA ID:</b> {data.KRAId} <br />
                    <b>Project ID Type:</b> {data.ProjectId} <br />
                    <b>Deparment:</b> {data.DepartmentDescription} <br />
                    <b>KRA Name:</b> {data.KRADescription} <br />
                    <b>Project Name:</b> {data.ProjectName} <br />
                </DialogContent>
                <DialogActions>
                    {/* <Button autoFocus color="primary" onClick={() => handleClose}>
                        Close
                    </Button> */}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}