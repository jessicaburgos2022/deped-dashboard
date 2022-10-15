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
  IconButton,
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
import { insertOpexRecord } from '../../../actions/opexActions';
import Swal from "sweetalert2";
import { CloseOutlined } from "@material-ui/icons";

export default (props) => {
  const { open, handleClose, handleRefresh } = props;
  //react hook form
  const { handleSubmit, errors, control, setValue, register } = useForm();
  const appState = useSelector((state) => state.app);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedQuarter, setSelectedQuarter] = useState(1);

  const onSubmit = async (input) => {
    if (input) {
      if (
        userState.userInfo &&
        userState.userInfo.acc &&
        userState.userInfo.acc[0] &&
        userState.userInfo.acc[0].Id
      ) {
        input.departmentid = userState.userInfo.acc[0].DepartmentId;
        input.year = selectedYear;
        input.quarter = selectedQuarter;
        input.userId = userState.userInfo.userid
        var ret = await dispatch(insertOpexRecord(input));
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
        <form onSubmit={handleSubmit(onSubmit)} id="add-kra">
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              Add OP EX record
              <IconButton onClick={() => handleClose()}><CloseOutlined></CloseOutlined> </IconButton>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            <div className="row">
              <div className="col-12 mb-3">
                <Select
                  className="form-control"
                  placeholder="Year"
                  name="year"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <MenuItem value={new Date().getFullYear()}>{new Date().getFullYear()}</MenuItem>
                </Select>
              </div>

              <div className="col-12 mb-3">
                <Select
                  className="form-control"
                  placeholder="Quarter"
                  name="quarter"
                  value={selectedQuarter}
                  onChange={(e) => setSelectedQuarter(e.target.value)}
                >
                  <MenuItem value={1}>First Quarter</MenuItem>
                  <MenuItem value={2}>Second Quarter</MenuItem>
                  <MenuItem value={3}>Third Quarter</MenuItem>
                  <MenuItem value={4}>Fourth Quarter</MenuItem>
                </Select>
              </div>
              <div className="col-12 mb-3">
                <Controller
                  control={control} name="title"
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
                      rows={4}
                      maxRows={4}
                      className="output-margin form-control"
                      variant="outlined"
                      size="small"
                    />
                  }
                />
              </div>
              <div className="col-12 mb-3">
                <Controller
                  control={control}
                  name="budget"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  as={
                    <TextField
                      label="Budget"
                      name="budget"
                      type="number"
                      rows={4}
                      maxRows={4}
                      className="output-margin form-control"
                      variant="outlined"
                      size="small"
                    />
                  }
                />
              </div>
              <div className="col-12 mb-3">
                <Controller
                  control={control}
                  name="utilizedamount"
                  rules={{
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }}
                  as={
                    <TextField
                      label="Utilized Amount"
                      name="utilizedamount"
                      type="number"
                      rows={4}
                      maxRows={4}
                      className="output-margin form-control"
                      variant="outlined"
                      size="small"
                    />
                  }
                />
              </div>
            </div>
            <DialogActions>
              <div class="float-right d-inline-flex">
                <Button
                  className="output-margin btn mr-3"
                  variant="contained"

                  color="primary"
                  type="submit">
                  Submit
                </Button>
              </div>

            </DialogActions>
          </DialogContent>
        </form>
      </Dialog>
    </React.Fragment >
  );
};
