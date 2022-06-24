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
import exportFromJSON, { ExportType } from 'export-from-json'
import { ReactComponent as ExcelSvg } from '../../../../media/svg/excel-svgrepo-com.svg'
import { getTargetById } from '../../../../actions/outputActions';
import ReactExport from "react-data-export";
import Download from "./ExcelReport";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
export default (props) => {
  const dispatch = useDispatch();
  const outputStore = useSelector(state => state.majorOutputManagement);
  const targetState = outputStore ? outputStore.targetByOutputId : [];
  const { open, handleClose, data } = props;
  const [report, setReport] = useState([]);
  const [report2, setReport2] = useState([])
  useEffect(() => {
    console.log(data)
    dispatch(getTargetById(data.OutputMajorHeaderId))
    setReport2(targetState)
    // setReport([{
    //   Department: ['KRA', 'Objective', 'Program/Project:', 'Output:', 'Output Indicator:', 'Activity:', 'Planned Target:', 'Timeline:', '% of Accomplishment vs Targets:', '% of Accomplishment according to Timeline:', 'Gains/Gaps:', 'Financial Requirement:', 'Amount Utilized:', 'Balance:', 'Budget Utilization Rate (%):', 'Funding Source:', 'Budget Structure:',
    //     'SCORE:', 'Descriptive Equivalent:', 'Operational Issue:', 'Policy Issue:', 'Recommendation:', 'Others:', 'Corrective Action:']
    // },
    setReport([
      {
        field: "Department",
        value: data.DepartmentDescription
      },
      {
        field: "KRA",
        value: data.KRAName
      },
      {
        field: "Objective",
        value: data.Objective
      },
      {
        field: "Program/Project",
        value: data.Project
      },
      {
        field: "Output",
        value: data.Output
      },
      {
        field: "Output Indicator",
        value: data.OutputIndicator
      },
      {
        field: "Activity",
        value: data.Activity
      },
      {
        field: "Timeline",
        value: data.Timeline
      },
      {
        field: "% of Accomplishment vs Targets",
        value: data.Accomplishment1
      },
      {
        field: "% of Accomplishment according to Timeline",
        value: data.Accomplishment2
      },
      {
        field: "Gains/Gaps",
        value: data.GainGap
      },
      {
        field: "Financial Requirement",
        value: data.FinancialRequirement.toLocaleString("en-US")
      },
      {
        field: "Amount Utilized",
        value: data.AmountUtilized.toLocaleString("en-US")
      },
      {
        field: "Balance",
        value: data.Balance.toLocaleString("en-US")
      },
      {
        field: "Budget Utilization Rate (%)",
        value: data.UtilizationRate ? data.UtilizationRate.toFixed(2) + "%" : "Data Unavailable"
      },
      {
        field: "Funding Source",
        value: data.FundingSource
      },
      {
        field: "Budget Structure",
        value: data.BurdgetStructure
      },
      {
        field: "Score",
        value: data.Score
      },
      {
        field: "Descriptive Equivalent",
        value: data.Description
      },
      {
        field: "Operational Issue",
        value: data.OpsIssue
      },
      {
        field: "Policy Issue",
        value: data.PolicyIssue
      },
      {
        field: "Recommendation",
        value: data.Recommendation
      },
      {
        field: "Others",
        value: data.Others
      },
      {
        field: "Corrective Action",
        value: data.CorrectiveAction
      }
    ])
  }, []);
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
          <li class="nav-item c-pointer pr-5">
            <Download dataSet={report} dataSet2={report2} element={<ExcelSvg onClick={() => { return }} style={{ height: 30 }} />} />
          </li>
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
                  <th className="w-25 text-nowrap">Output Indicator:</th>
                  <td className="w-75">{data.OutputIndicator}</td>
                </tr>
                <tr>
                  <th className="w-25 text-nowrap">Activity:</th>
                  <td className="w-75">{data.Activity}</td>
                </tr>
                {/* <tr>
                  <th className="w-25 text-nowrap">Planned Target:</th>
                  <td className="w-75">{data.PlannedTarget}</td>
                </tr> */}

                <tr>
                  <th className="w-25 text-nowrap">Timeline:</th>
                  <td className="w-75">{data.Timeline}</td>
                </tr>

                <tr>
                  <th className="w-25 text-nowrap">Physical Accomplishment/s:</th>
                  <td className="w-75">
                    <table>
                      <thead>
                        <tr>
                          <th>Accomplishment</th>
                          <th>Description</th>
                          <th>Planned Target</th>
                          <th>Target Type</th>
                          <th>Target Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {targetState && Array.isArray(targetState) && targetState.map((r) => {
                          return (
                            <tr>
                              <td>{r.Accomplishment}</td>
                              <td>{r.AccomplishmentDescription}</td>
                              <td>{r.PlannedTarget}</td>
                              <td>{r.TargetDescription}</td>
                              <td>{r.TargetType}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </td>
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
                    {data.UtilizationRate ? data.UtilizationRate.toFixed(2) + "%" : "Data Unavailable"}
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
                  <th className="w-25 text-nowrap">Score:</th>
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
          <Button autoFocus color="primary" onClick={() => handleClose()}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
