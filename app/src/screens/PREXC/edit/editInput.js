import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormGroup, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { editIndicatorValue } from '../../../actions/prexcActions';


export default (props) => {
    const { IndicatorId, Quarter, open, handleRefresh, handleClose } = props;
    //react hook form
    const { handleSubmit, errors, control, setValue, register } = useForm();
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const onSubmit = async (input) => {
        if (input) {
            if (
                userState.userInfo &&
                userState.userInfo.acc &&
                userState.userInfo.acc[0] &&
                userState.userInfo.acc[0].Id
            ) {
                input.indicatorid = IndicatorId;
                input.quarter = Quarter;
                var ret = await dispatch(editIndicatorValue(input));
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
        <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="sm"
            fullWidth
        >
            <form onSubmit={handleSubmit(onSubmit)} id="register-user">
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edit Indicator - Q{Quarter}
                </DialogTitle>
                <DialogContent dividers>
                    <FormGroup>
                        <FormControl variant="standard" className="w-100">
                            <Controller
                                control={control}
                                name="value"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                }}
                                as={
                                    <TextField
                                        label="Value"
                                        name="value"
                                        className="output-margin"
                                        variant="outlined"
                                        size="small"
                                        error={errors.value != null}
                                        helperText={errors.value ? errors.value.message : ""}
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
        </Dialog>
    </React.Fragment>)
}