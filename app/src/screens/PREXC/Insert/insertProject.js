import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormGroup, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SvgIcon from '@mui/material/SvgIcon';
import { insertProject } from '../../../actions/prexcActions';


export default (props) => {
    const { orgOutcomeId } = props;
    const { open, handleClose, handleRefresh } = props;
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(0);
    //react hook form
    const { handleSubmit, errors, control, setValue, register } = useForm();
    const userState = useSelector((state) => state.user);
    const [selectedQuarter, setSelectedQuarter] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const onSubmit = async (input) => {
        if (input) {
            if (
                userState.userInfo &&
                userState.userInfo.acc &&
                userState.userInfo.acc[0] &&
                userState.userInfo.acc[0].Id
            ) {
                input.OrgOutcomeId = orgOutcomeId;
                var ret = await dispatch(insertProject(input));
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

    function PlusSquare(props) {
        return (
            <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
                {/* tslint:disable-next-line: max-line-length */}
                <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
            </SvgIcon>
        );
    }
    return (<React.Fragment>
        <PlusSquare onClick={() => setIsOpen(true)} />
        {isOpen && <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            maxWidth="sm"
            fullWidth
        >
            <form onSubmit={handleSubmit(onSubmit)} id="register-user">
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    New Project
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
        )
    </React.Fragment>)
}