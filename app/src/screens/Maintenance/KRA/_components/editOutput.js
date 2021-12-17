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
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Checkbox, Divider } from "@mui/material";
import { Grid } from "@mui/material";

  
import { searchMinorOutput, editOutputStatus, editMinorOutput } from '../../../../actions/outputActions';
  export default (props) => {
    const { open, handleClose, handleRefresh, data } = props;

    console.log(data)
    //react hook form
    const { handleSubmit, errors, control, setValue, register } = useForm();
    const appState = useSelector((state) => state.app);
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const OutputTypeId = 2; // ID for MINOR output (refer to ref_outputtype table)
    const onSubmit = async (input) => {
        if (data) {
            if (
                userState.userInfo &&
                userState.userInfo.acc &&
                userState.userInfo.acc[0] &&
                userState.userInfo.acc[0].Id
            ) {
                input.userId = userState.userInfo.acc[0].Id;
                input.kraid = data.KRAId;
                input.projectid = data.projectId;
                input.outputminorheaderid = data.OutputMinorHeaderId;
                input.balance = parseFloat(input.financialrequirement) - parseFloat(input.amountutilized);
                input.utilizationrate = (parseFloat(input['amountutilized']) / parseFloat(input['financialrequirement'])) * 100
                input.accomplishment1 = (parseFloat(input['physicalaccomplishment']) / parseFloat(input['plannedtarget'])) * 100
                console.log(input);
                var ret = await dispatch(editMinorOutput(input));
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
            Edit Output
          </DialogTitle>
          <DialogContent dividers>
            <Paper style={{ padding: "2rem" }}>
          <form onSubmit={handleSubmit(onSubmit)} id="edit-interface">
          <FormGroup>
            
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
  