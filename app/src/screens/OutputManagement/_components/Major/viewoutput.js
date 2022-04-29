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
          View Major Output
        </DialogTitle>

        <DialogContent dividers className="p-4">
          <div class="table-responsive">
            <table className="table table-striped table-bordered">
              <tbody>
                <tr>
                  <th className="w-25 text-nowrap">Department</th>
                  <td className="w-75">{data.Department}</td>
                </tr>

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
                  <th className="w-25 text-nowrap">Planned Target:</th>
                  <td className="w-75">{data.PlannedTarget}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Timeline:</th>
                  <td className="w-75">{data.PlannedTarget}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Physical Accomplishment:</th>
                  <td className="w-75">{data.PhysicalAccomplishment}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">
                    % of Accomplishment vs Targets:
                  </th>
                  <td className="w-75">{data.Accomplishment1 + "%"}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">
                    % of Accomplishment according to Timeline:
                  </th>
                  <td className="w-75">{data.Accomplishment2 + "%"}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Gains/Gaps:</th>
                  <td className="w-75">{data.GainGap}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Financial Requirement:</th>
                  <td className="w-75">
                    {data.FinancialRequirement.toLocaleString("en-US")}
                  </td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Amount Utilized:</th>
                  <td className="w-75">
                    {data.AmountUtilized.toLocaleString("en-US")}
                  </td>
                </tr>

                <tr>
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
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Funding Source:</th>
                  <td className="w-75">{data.FundingSource}</td>
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
                  <th className="w-25 text-nowrap">Corrective Action:</th>
                  <td className="w-75">{data.CorrectiveAction}</td>
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
