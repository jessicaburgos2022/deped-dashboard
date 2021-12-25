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
                    View Major Output
                </DialogTitle>
                <DialogContent dividers>
                    <b>Department:</b> {data.Department} <br />
                    <b>KRA:</b> {data.KRAName} <br />
                    <b>Objective:</b> {data.Objective} <br />
                    <b>Program/Project:</b> {data.Project} <br />
                    <b>Output:</b>{data.Output} <br />
                    <b>Planned Target:</b> {data.PlannedTarget} <br />
                    <b>Timeline:</b> {data.Timeline} <br />
                    <b>Physical Accomplishment:</b> {data.PhysicalAccomplishment} <br />
                    <b>% of Accomplishment vs Targets:</b> {data.Accomplishment1 + '%'} <br />
                    <b>% of Accomplishment according to Timeline :</b> {data.Accomplishment2 + '%'} <br />
                    <b>Gains/Gaps:</b> {data.GainGap} <br />
                    <b>Financial Requirement:</b> {data.FinancialRequirement.toLocaleString('en-US')} <br />
                    <b>Amount Utilized:</b> {data.AmountUtilized.toLocaleString('en-US')} <br />
                    <b>Balance:</b> {data.Balance.toLocaleString('en-US')} <br />
                    <b>Budget Utilization Rate (%):</b> {data.UtilizationRate.toFixed(2) + '%'} <br />
                    <b>Funding Source:</b> {data.FundingSource} <br />
                    <b>Budget Structure:</b> {data.BurdgetStructure} <br />
                    <b>SCORE:</b> {data.Score} <br />
                    <b>DESCRIPTIVE EQUIVALENT:</b>  {data.ScoreDescription} <br />
                    <b>Operational Issue:</b>  {data.OpsIssue} <br />
                    <b>Policy Issue:</b>  {data.PolicyIssue} <br />
                    <b>Recommendation:</b>  {data.PolicyIssue} <br />
                    <b>Others:</b>  {data.Others} <br />
                    <b>Corrective Action:</b>  {data.CorrectiveAction} <br />
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