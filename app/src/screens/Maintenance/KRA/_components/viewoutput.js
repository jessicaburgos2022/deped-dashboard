import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default (props) => {
  const { open, handleClose, data } = props;
  console.log(data);
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
          View Output
        </DialogTitle>
        <DialogContent dividers>
          <div class="table-responsive">
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th className="w-25 text-nowrap">Department</th>
                  <td className="w-75">{data.DepartmentDescription}</td>
                </tr>
                <tr>
                  <th className="w-25 text-nowrap">Output Type:</th>
                  <td className="w-75">{data.OutputTypeDescription} </td>
                </tr>
                <tr>
                  <th className="w-25 text-nowrap">KRA:</th>
                  <td className="w-75">{data.KRAName} </td>
                </tr>
                <tr>
                  <th className="w-25 text-nowrap">Description:</th>
                  <td className="w-75">{data.KRADescription} </td>
                </tr>
              </tbody>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus color="primary" onClick={() => handleClose}>
                        Close
                    </Button> */}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
