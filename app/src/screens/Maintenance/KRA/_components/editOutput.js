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
  editKRA
} from "../../../../actions/kraActions";
export default (props) => {
  const { open, handleClose, handleRefresh, data } = props;

  console.log(data);
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
        var ret = await dispatch(editKRA(input));
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
        <form onSubmit={handleSubmit(onSubmit)} id="edit-kra">
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Edit Output
          </DialogTitle>
          <DialogContent dividers>
            <Paper style={{ padding: "2rem" }}>
              <FormGroup>
                <Controller
                  control={control}
                  name="outputtypeid"
                  defaultValue={data["OutputTypeId"]}
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  as={
                    <Select
                      className="output-category-margin"
                      name="outputtypeid"
                      label="Select Output Type"
                    >
                      <MenuItem value={1}>Major Output</MenuItem>
                      <MenuItem value={2}>Minor Output</MenuItem>
                    </Select>
                  }
                />

                <Controller
                  control={control}
                  name="name"
                  defaultValue={data["KRAName"]}
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  as={
                    <TextField
                      label="Name"
                      defaultValue={data["KRAName"]}
                      rows={4}
                      maxRows={4}
                      name="name"
                      className="output-margin"
                      variant="outlined"
                      size="small"

                    />
                  }
                />

                <Controller
                  control={control}
                  name="description"
                  defaultValue={data["KRADescription"]}
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  as={
                    <TextField
                      label="Description"
                      name="description"
                      defaultValue={data["KRADescription"]}
                      rows={4}
                      maxRows={4}
                      className="output-margin"
                      variant="outlined"
                      size="small"
                    />
                  }
                />
              </FormGroup>
            </Paper>
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
  );
};
