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
import { fetchIndicatorsByOutcomeId, updateGraphData, deleteIndicator } from '../../../actions/outcomeActions';
import { Checkbox, Divider } from '@mui/material';

import InsertIndicator from './insertIndicator';
import Swal from 'sweetalert2';
export default (props) => {
    const { open, handleClose, data } = props;
    const dispatch = useDispatch();
    const [indicators, setIndicators] = useState([]);
    const [isAddIndicatorOpen, setIsAddIndicatorOpen] = useState(false);

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
    const handleRefreshIndicator = async () => {
        var ret = await dispatch(fetchIndicatorsByOutcomeId(data.Id));
        setIndicators(ret);
    }
    const handleNewClick = () => {
        setIsAddIndicatorOpen(true);
    }
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Confirmation",
            text: "Do you want to delete this indicator?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No"
        }).then(async (r) => {
            if (r.isConfirmed) {
                var ret = await dispatch(deleteIndicator(id));
                Swal.fire(
                    ret.result,
                    ret.message,
                    ret.result === "Success" ? "success" : "error"
                );
                handleRefreshIndicator();
            }
        });
    }
    return (
        <React.Fragment>
            {
                isAddIndicatorOpen &&
                <InsertIndicator open={isAddIndicatorOpen} handleRefresh={() => handleRefreshIndicator()} handleClose={() => setIsAddIndicatorOpen(false)} outcomeid={data.Id} />
            }
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
                    <Button onClick={() => handleNewClick()} variant="contained" color="primary">
                        New
                    </Button>
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
                                                    <Button onClick={() => handleDelete(indicator.IndicatorId)}>Delete</Button>
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