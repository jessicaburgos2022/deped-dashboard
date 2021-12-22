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

import { addProject } from "../../../../actions/projectActions";

export default (props) => {
  const { open, handleClose, handleRefresh } = props;

  //react hook form
  const { handleSubmit, errors, control, setValue, register } = useForm();
  const appState = useSelector((state) => state.app);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [KRAList, setKRAList] = useState(
    appState.KRA
  );

  const onSubmit = async (input) => {
    if (input) {
      if (
        userState.userInfo &&
        userState.userInfo.acc &&
        userState.userInfo.acc[0] &&
        userState.userInfo.acc[0].Id
      ) {
        var ret = await dispatch(addProject(input));
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
          Add Project
        </DialogTitle>
        <DialogContent dividers>
          <Paper style={{ padding: "2rem" }}>
            <form onSubmit={handleSubmit(onSubmit)} id="add-kra">
              <FormGroup>
                <FormControl variant="standard">
                  <InputLabel>KRA</InputLabel>
                  <Controller
                    control={control}
                    name="kraid"
                    rules={{
                      required: { value: true, message: "This field is required" },
                    }}
                    as={
                      <Select
                        className="output-category-margin"
                        name="kraid"
                        label="Select KRA"
                        ref={register}
                      >
                        {KRAList.map((kra, id) => {
                          return (
                            <MenuItem key={id} value={kra.Id}>
                              {kra.Name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    } />
                  <FormHelperText>
                    {errors.kraid ? errors.kraid.message : ""}
                  </FormHelperText>
                </FormControl>
                <Controller
                  control={control}
                  name="project"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  as={
                    <TextField
                    multiline
                      label="Name"
                      name="name"
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
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
