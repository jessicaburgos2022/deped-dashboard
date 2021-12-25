import {
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { insertOutcome } from "../../../actions/outcomeActions";

export default (props) => {
    const { open, handleClose, handleRefresh } = props;

    //react hook form
    const { handleSubmit, errors, control, setValue, register } = useForm();
    const appState = useSelector((state) => state.app);
    const outcomeState = useSelector((state) => state.outcome);
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [outputTypeId, setOutputTypeId] = useState(0);

    const onSubmit = async (input) => {
        if (input) {
            if (
                userState.userInfo &&
                userState.userInfo.acc &&
                userState.userInfo.acc[0] &&
                userState.userInfo.acc[0].Id
            ) {
                var ret = await dispatch(insertOutcome(input));
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
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add Output
                </DialogTitle>
                <DialogContent dividers>
                    <Paper style={{ padding: "2rem" }}>
                        <form onSubmit={handleSubmit(onSubmit)} id="add-kra">
                            <FormGroup>
                                <FormGroup>
                                    <InputLabel>Department</InputLabel>
                                    <Controller
                                        control={control}
                                        name="departmentid"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "This field is required",
                                            },
                                        }}
                                        as={
                                            <Select
                                                label="Department"
                                                fullWidth
                                                className="output-category-margin"
                                                name="departmentid"
                                                label="Select Department"
                                            >
                                                {appState.departments.map((department, id) => {
                                                    return (
                                                        <MenuItem key={id} value={department.Id}>
                                                            {department.Name}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        }
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <InputLabel>Outcome Type</InputLabel>
                                    <Controller
                                        control={control}
                                        name="outcometypeid"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "This field is required",
                                            },
                                        }}
                                        as={
                                            <Select
                                                label="Outcome Type"
                                                fullWidth
                                                className="output-category-margin"
                                                name="outcomeTypeId"
                                                label="Select Department"
                                            >
                                                {outcomeState.outcometypes && Array.isArray(outcomeState.outcometypes) && outcomeState.outcometypes.map((outcomeType, id) => {
                                                    return (
                                                        <MenuItem key={id} value={outcomeType.Id}>
                                                            {outcomeType.Outcome}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        } />
                                </FormGroup>
                                <Controller
                                    control={control}
                                    name="title"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "This field is required",
                                        },
                                    }}
                                    as={
                                        <TextField
                                            multiline
                                            label="Title"
                                            name="title"
                                            rows={4}
                                            maxRows={4}
                                            className="output-margin"
                                            variant="outlined"
                                            size="small"
                                        />
                                    }
                                />
                            </FormGroup>
                            <Button
                                className="output-margin"
                                variant="contained"
                                style={{ width: "100%" }}
                                color="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </form>
                    </Paper>
                </DialogContent>

                <DialogActions>
                    {/* <Button autoFocus color="primary" type="submit">
                    Save
                  </Button> */}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
