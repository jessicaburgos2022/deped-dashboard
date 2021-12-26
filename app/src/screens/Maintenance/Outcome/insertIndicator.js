import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, Paper, TextField } from '@material-ui/core';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { insertIndicator } from "../../../actions/outcomeActions";
import Swal from 'sweetalert2';
import { Container } from '@material-ui/core';

export default (props) => {
    const { open, handleClose, handleRefresh, outcomeid } = props;
    const userState = useSelector((state) => state.user);
    const { handleSubmit, control, register } = useForm();
    const dispatch = useDispatch();
    const onSubmit = async (input) => {
        if (input) {
            if (
                userState.userInfo &&
                userState.userInfo.acc &&
                userState.userInfo.acc[0] &&
                userState.userInfo.acc[0].Id
            ) {
                input.outcomeid = outcomeid;
                var ret = await dispatch(insertIndicator(input));
                Swal.fire(
                    ret.result,
                    ret.message,
                    ret.result === "Success" ? "success" : "error"
                );
                handleRefresh();
                handleClose();
            }
        }
    };
    return (
        <React.Fragment>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="sm"
                fullWidth
            >
                <form onSubmit={handleSubmit(onSubmit)} id="add-outcome">
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        Add Indicator
                    </DialogTitle>
                    <DialogContent dividers>
                        <Container>
                            <Controller
                                control={control}
                                name="indicator"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "This field is required",
                                    },
                                }}
                                as={
                                    <TextField
                                        label="Indicator"
                                        name="indicator"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                    />
                                }
                            />
                        </Container>

                        <FormControlLabel inputRef={register} name="iscomputed" control={<Checkbox defaultChecked />} label="Graph Data" />
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
        </React.Fragment >
    )
}