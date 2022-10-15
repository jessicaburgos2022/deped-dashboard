import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormGroup,
    FormHelperText,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { insertOrgOutcome } from '../../../actions/prexcActions';
import { fetchUnitByDepartmentId } from '../../../actions/appActions';
import { CloseOutlined } from "@material-ui/icons";


export default (props) => {
    const { open, handleClose, handleRefresh } = props;
    const currentYear = new Date().getFullYear();
    const [selectedYear, setSelectedYear] = useState(0);
    //react hook form
    const { handleSubmit, errors, control, setValue, register } = useForm();
    const userState = useSelector((state) => state.user);
    const [selectedQuarter, setSelectedQuarter] = useState(0);
    const dispatch = useDispatch();
    const onSubmit = async (input) => {
        if (input) {
            if (
                userState.userInfo &&
                userState.userInfo.acc &&
                userState.userInfo.acc[0] &&
                userState.userInfo.acc[0].Id
            ) {
                input.Year = selectedYear;
                input.Quarter = 0;
                var ret = await dispatch(insertOrgOutcome(input));
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
    return (
        <React.Fragment>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="sm"
                fullWidth
            >
                <form onSubmit={handleSubmit(onSubmit)} id="register-user">
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex' }}>
                                New Organizational Outcome
                            </div>
                            <IconButton onClick={() => handleClose()}><CloseOutlined></CloseOutlined> </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent dividers>
                        <FormGroup>
                            <FormControl variant="standard" className="w-100">
                                <InputLabel>Year</InputLabel>
                                <Select
                                    fullWidth
                                    label="Year"
                                    name="selectedYear"
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                    value={selectedYear}
                                >
                                    <MenuItem value={0}>
                                        Any
                                    </MenuItem>
                                    <MenuItem value={currentYear - 1}>
                                        {currentYear - 1}
                                    </MenuItem>
                                    <MenuItem value={currentYear}>
                                        {currentYear}
                                    </MenuItem>
                                </Select>
                            </FormControl>
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
            </Dialog>
        </React.Fragment>
    )
}