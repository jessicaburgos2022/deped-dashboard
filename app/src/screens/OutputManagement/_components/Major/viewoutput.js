import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
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
                    View Output
                </DialogTitle>
                <DialogContent dividers>
                    <b></b>KRA: {data.Department}
                </DialogContent>
                <DialogContent dividers>
                <b>Objective:</b> {data.Objective}
                </DialogContent>
                <DialogContent dividers>
                <b>Program/Project:</b> {data.Project}
                </DialogContent>
                <DialogContent dividers>
                <b>Output:</b>{data.Output}
                </DialogContent>
                <DialogContent dividers>
                <b>Planned Target:</b> {data.PlannedTarget}
                </DialogContent>
                <DialogContent dividers>
                <b>Timeline:</b> {data.Timeline}
                </DialogContent>
                <DialogContent dividers>
                <b>Physical Accomplishment:</b> {data.PhysicalAccomplishment}
                </DialogContent>
                <DialogContent dividers>
                <b>% of Accomplishment vs Targets:</b> {data.Accomplishment1 +'%'}
                </DialogContent>
                <DialogContent dividers>
                <b>% of Accomplishment according to Timeline :</b> {data.Accomplishment2 +'%'}
                </DialogContent>
                <DialogContent dividers>
                <b>Gains/Gaps:</b> {data.GainGap}
                </DialogContent>
                <DialogContent dividers>
                <b>Financial Requirement:</b> {data.FinancialRequirement.toLocaleString('en-US')}
                </DialogContent>
                <DialogContent dividers>
                <b>Amount Utilized:</b> {data.AmountUtilized.toLocaleString('en-US')}
                </DialogContent>
                <DialogContent dividers>
                <b>Balance:</b> {data.Balance.toLocaleString('en-US')}
                </DialogContent>
                <DialogContent dividers>
                <b>Budget Utilization Rate (%):</b> {data.UtilizationRate.toFixed(2) + '%'}
                </DialogContent>
                <DialogContent dividers>
                <b>Funding Source:</b> {data.FundingSource}
                </DialogContent>
                <DialogContent dividers>
                <b>Budget Structure:</b> {data.BurdgetStructure}
                </DialogContent>
                <DialogContent dividers>
                <b>SCORE:</b> {data.Score}
                </DialogContent>
                <DialogContent dividers>
                <b>DESCRIPTIVE EQUIVALENT:</b>  {data.ScoreDescription}
                </DialogContent>
                <DialogContent dividers>
                <b>Operational Issue:</b>  {data.OpsIssue}
                </DialogContent>
                <DialogContent dividers>
                <b>Policy Issue:</b>  {data.PolicyIssue}
                </DialogContent>
                <DialogContent dividers>
                <b>Recommendation:</b>  {data.PolicyIssue}
                </DialogContent>
                <DialogContent dividers>
                <b>Others:</b>  {data.Others}
                </DialogContent>
                <DialogContent dividers>
                <b>Corrective Action:</b>  {data.CorrectiveAction}
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