import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import swal from "sweetalert";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import FormInputErrorLabel from "../../../components/FormInputErrorLabel";

import {
  listActiveTicketTypes,
} from "../../../actions/ticketActions";

export default (props) => {
  const { open, handleClose } = props;
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, control, setValue, getValues } =
    useForm();
  const userState = useSelector((state) => state.user);
  const ticketState = useSelector((state) => state.tickets);
  const value = getValues("DateDeployed");
  const [date, setSelectedDate] = React.useState(new Date("2014-08-18"));
  const onSubmit = async (data) => {
    handleClose();
  };
  
  useEffect(() => {
      dispatch(listActiveTicketTypes());
  },[ticketState,listActiveTicketTypes]);
  return (
    <React.Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          New Ticket Related to
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} id="new-interface">
          <DialogContent dividers>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Type"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
