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
  
  import {
    addKRA
  } from "../../../../actions/kraActions";


  export default (props) => {
    const { open, handleClose, handleRefresh } = props;
  
    //react hook form
    const { handleSubmit, errors, control, setValue, register } = useForm();
    const appState = useSelector((state) => state.app);
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const OutputTypeId = 2; // ID for MINOR output (refer to ref_outputtype table)
  
    const onSubmit = async (input) => {
      if (input) {
        if (
          userState.userInfo &&
          userState.userInfo.acc &&
          userState.userInfo.acc[0] &&
          userState.userInfo.acc[0].Id
        ) {
          var ret = await dispatch(addKRA(input));
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
              <form onSubmit={handleSubmit(onSubmit)} id="edit-interface">
                <FormGroup>
                  <Controller
                    control={control}
                    name="outputype"
                    rules={{
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    }}
                    as={
                      <Select
                        className="output-category-margin"
                        label="Select Output Type"
                      >
                        <MenuItem value={1}>Major Output</MenuItem>
                        <MenuItem value={2}>Minor Output</MenuItem>
                      </Select>
                    }
                  />
                  
                  <TextField
                    label="Name"
                    name="name"
                
                    rows={4}
                    maxRows={4}
                    className="output-margin"
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    label="Description"
                    name="description"
                    rows={4}
                    maxRows={4}
                    className="output-margin"
                    variant="outlined"
                    size="small"
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
  