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
          View Minor Output
        </DialogTitle>
        {/* <DialogContent dividers>
          <b>KRA:</b> {data.KRAName} <br />
          <b>Objective:</b> {data.Objective} <br />
          <b>Program/Project:</b> {data.Project} <br />
          <b>Program/Project:</b> {data.Output} <br />
          <b>Target:</b> {data.Target} <br />
          <b>Accomplishment:</b> {data.Accomplishment} <br />
          <b>Agency In-Charge(Internal/External) :</b> {data.Agency} <br />
          <b>Timeline :</b> {data.Timeline} <br />
          <b>Operational Issue :</b> {data.OpsIssue} <br />
          <b>Policy Issue :</b> {data.PolicyIssue} <br />
          <b>
            Issues that needing Management decision and recommendation :
          </b>{" "}
          {data.Recommendation} <br />
          <b>Others :</b> {data.Others} <br />
          <b>Score :</b> {data.Score} <br />
          <b>Descriptive Equivalent :</b> {data.ScoreDescription} <br />
          <b>Corrective Actions :</b> {data.CorrectiveAction} <br />
        </DialogContent> */}
        <DialogContent dividers className="p-4">
          <div class="table-responsive">
            <table className="table table-striped table-bordered">
              <tbody>
                {/* <tr>
                  <th className="w-25 text-nowrap">Department</th>
                  <td className="w-75">{data.Department}</td>
                </tr> */}

                <tr>
                  <th className="w-25 text-nowrap">KRA:</th>
                  <td className="w-75">{data.KRAName}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Objective:</th>
                  <td className="w-75">{data.Objective}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Program/Project:</th>
                  <td className="w-75">{data.Project}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Output:</th>
                  <td className="w-75">{data.Output}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Target:</th>
                  <td className="w-75">{data.Target}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Accomplishment:</th>
                  <td className="w-75">{data.Accomplishment}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">
                    Agency In-Charge(Internal/External):
                  </th>
                  <td className="w-75">{data.Agency}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Timeline:</th>
                  <td className="w-75">{data.Timeline}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Operational Issue:</th>
                  <td className="w-75">{data.Timeline}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Policy Issue:</th>

                  <td className="w-75">{data.PolicyIssue}</td>
                </tr>

                {/* <tr>
                  <th className="w-25 text-nowrap">Balance:</th>
                  <td className="w-75">
                    {data.Balance.toLocaleString("en-US")}
                  </td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">
                    Budget Utilization Rate (%):
                  </th>
                  <td className="w-75">
                    {data.UtilizationRate.toFixed(2) + "%"}
                  </td>
                </tr> */}

                <tr>
                  <th className="w-25 text-nowrap">
                    Issues that needing Management decision and recommendation:
                  </th>
                  <td className="w-75">{data.Recommendation}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Budget Structure:</th>
                  <td className="w-75">{data.BurdgetStructure}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">SCORE:</th>
                  <td className="w-75">{data.Score}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Descriptive Equivalent:</th>
                  <td className="w-75">{data.Description}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Operational Issue:</th>
                  <td className="w-75">{data.OpsIssue}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Policy Issue:</th>
                  <td className="w-75">{data.PolicyIssue}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Recommendation:</th>
                  <td className="w-75">{data.Recommendation}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Others:</th>
                  <td className="w-75">{data.Others}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Score:</th>
                  <td className="w-75">{data.Score}</td>
                </tr>
                <tr>
                  <th className="w-25 text-nowrap">Descriptive Equivalent:</th>
                  <td className="w-75">{data.ScoreDescription}</td>
                </tr>
                <tr>
                  <th className="w-25 text-nowrap">Corrective Actions:</th>
                  <td className="w-75">{data.CorrectiveAction}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus color="primary" onClick={() => handleClose()}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
