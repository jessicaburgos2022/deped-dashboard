import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { forgotPassword } from "../../../actions/userActions";

export default ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    Username: "",
    EmailAddress: "",
  });
  const handleOnchange = (field, value) => {
    setData({
      Username: field === "Username" ? value : "",
      EmailAddress: field === "EmailAddress" ? value : "",
    });
  };
  const handleSubmit = async () => {
    if (data.Username === "" && data.EmailAddress === "") {
      swal("Failed", "Please enter atleast one", "warning");
      return;
    }
    var res = await dispatch(
      forgotPassword({
        username: data.Username,
        email: data.EmailAddress,
      })
    );
    setData({
      Username: "",
      EmailAddress: "",
    });
    var msg = res.Message.split("|");
    if (msg[0] === "Success") {
      swal("Success", msg[1], "success");
    } else {
      swal("Failed", msg[1], "error");
    }
    handleClose(false);
  };

  return (
    <Dialog
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={"xl"}
    >
      <DialogTitle id="customized-dialog-title">Forgot Password</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>Please enter any of the following</Typography>
        <Container>
          <Box mt={3} width={400}>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                type="text"
                fullWidth={true}
                id="Username"
                label="Username"
                autoFocus={true}
                autoComplete="off"
                value={data.Username}
                onChange={(e) => handleOnchange(e.target.id, e.target.value)}
              />
            </FormControl>
          </Box>
          <Box mt={3} width={400}>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                type="text"
                fullWidth={true}
                id="EmailAddress"
                label="Registered Email Address"
                autoComplete="off"
                value={data.EmailAddress}
                onChange={(e) => handleOnchange(e.target.id, e.target.value)}
              />
            </FormControl>
          </Box>
        </Container>
      </DialogContent>
      <DialogActions>
        <Box display="flex" m={2}>
          <Button autoFocus onClick={() => handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={handleSubmit}
            color="primary"
            variant="contained"
          >
            Continue
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
