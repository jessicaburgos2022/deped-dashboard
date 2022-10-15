import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormGroup, IconButton, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SvgIcon from '@mui/material/SvgIcon';
import { insertIndicator } from '../../../actions/prexcActions';
import { CloseOutlined } from '@material-ui/icons';


export default (props) => {
    const { programId } = props;
    const { open, handleRefresh } = props;
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(0);
    //react hook form
    const { handleSubmit, errors, control, setValue, register } = useForm();
    const userState = useSelector((state) => state.user);
    const [selectedQuarter, setSelectedQuarter] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const handleClose = () => {
        setIsOpen(false)
    }
    const onSubmit = async (input) => {
        if (input) {
            if (
                userState.userInfo &&
                userState.userInfo.acc &&
                userState.userInfo.acc[0] &&
                userState.userInfo.acc[0].Id
            ) {
                input.DepartmentId = userState.userInfo.acc[0].DepartmentId;
                input.ProgramId = programId;
                var ret = await dispatch(insertIndicator(input));
                Swal.fire(
                    ret.result,
                    ret.message,
                    ret.result === "Success" ? "success" : "error"
                );
                if (ret.result === "Success") {
                    handleRefresh();
                    handleClose();
                }
            }
        }
    };

    return (<React.Fragment>
        <Button className="btn btn-secondary" onClick={() => setIsOpen(true)} >Insert Indicator</Button>
        {isOpen && <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            maxWidth="sm"
            fullWidth
        >
            <form onSubmit={handleSubmit(onSubmit)} id="register-user">

                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex' }}>
                            New Indicator
                        </div>
                        <IconButton onClick={() => handleClose()}><CloseOutlined></CloseOutlined> </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <FormGroup>
                        <FormControl variant="standard" className="w-100">
                            <Controller
                                control={control}
                                name="Title"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                }}
                                as={
                                    <TextField
                                        label="Title"
                                        name="title"
                                        className="output-margin"
                                        variant="outlined"
                                        size="small"
                                        error={errors.username != null}
                                        helperText={errors.username ? errors.username.message : ""}
                                    />
                                }
                            />
                        </FormControl>
                        <FormControl variant="standard" className="w-100">
                            <Controller
                                control={control}
                                name="PhysicalTarget"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                }}
                                as={
                                    <TextField
                                        label="Physical Target"
                                        name="PhysicalTarget"
                                        className="output-margin"
                                        variant="outlined"
                                        size="small"
                                        error={errors.username != null}
                                        helperText={errors.username ? errors.username.message : ""}
                                    />
                                }
                            />
                        </FormControl>
                        <FormControl variant="standard" className="w-100">
                            <Controller
                                control={control}
                                name="Accountable"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                }}
                                as={
                                    <TextField
                                        label="Accountable Office/Unit"
                                        name="Accountable"
                                        className="output-margin"
                                        variant="outlined"
                                        size="small"
                                        error={errors.username != null}
                                        helperText={errors.username ? errors.username.message : ""}
                                    />
                                }
                            />
                        </FormControl>

                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button
                        className="output-margin"
                        variant="contained"
                        style={{ width: "100%" }}
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>}
    </React.Fragment>)
}