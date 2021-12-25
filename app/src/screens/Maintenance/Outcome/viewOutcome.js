import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, MenuItem } from '@material-ui/core';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchIndicatorsByOutcomeId, updateGraphData } from '../../../actions/outcomeActions';
import { Checkbox, Divider } from '@mui/material';
export default (props) => {
    const { open, handleClose, data } = props;
    const dispatch = useDispatch();
    const [indicators, setIndicators] = useState([]);
    console.log(data)

    useEffect(() => {
        async function fetchData() {
            var ret = await dispatch(fetchIndicatorsByOutcomeId(data.Id));
            setIndicators(ret);
        }
        fetchData();
    }, [])

    const handleGraphDataUpdate = async (indicatorid, newdata) => {
        var ret = await dispatch(updateGraphData({ indicatorid: indicatorid, status: newdata }));
        if (ret && ret.result && ret.result === "Success") {
            var ret = await dispatch(fetchIndicatorsByOutcomeId(data.Id));
            setIndicators(ret);
        }
    }

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
                    Outcome
                </DialogTitle>
                <DialogContent dividers>
                    <b>Department:</b> {data.DepartmentName} <br />
                    <b>Outcome Type:</b> {data.OutcomeType} <br />
                    <b>Outcome:</b> {data.OutcomeTitle} <br />

                    <Divider
                        style={{ padding: "2rem 0 0 0" }}
                        label="Indicators"
                        variant="fullWidth"
                        orientation="horizontal"
                    >
                        <span>
                            <b>Indicators</b>
                        </span>
                    </Divider>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableBody>
                                {
                                    indicators && Array.isArray(indicators) && indicators.map((indicator, key) => {
                                        return (
                                            <TableRow>
                                                <TableCell component="th" className="interface-table-cell">
                                                    {indicator.Indicator}
                                                </TableCell>
                                                <TableCell component="th" className="interface-table-cell">
                                                    <FormControlLabel control={<Checkbox checked={indicator.IsComputed} onChange={(e) => handleGraphDataUpdate(indicator.IndicatorId, e.target.checked ? 1 : 0)} />} label="Graph Data" />
                                                    <Button>Edit</Button>
                                                    <Button>Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}