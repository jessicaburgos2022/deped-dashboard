import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import FormInputErrorLabel from "../../../components/FormInputErrorLabel";

export default (props) => {
  const { open, handleClose } = props;
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
      swal("Success!","Data saved!","success");
      handleClose();
  };
  return (
    <React.Fragment>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Insert New BAPI Parameter
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} id="login-form">
          <DialogContent dividers>
            <div className="form-group">
              <input
                className={`form-input-transition form-input  ${
                  errors.field ? "form-input-error" : ""
                }`}
                type="text"
                placeholder="Field"
                name="field"
                ref={register({
                  required: {
                    value: true,
                    message: "This field is required",
                  },
                })}
              />
              {errors.field ? (
                <FormInputErrorLabel message={errors.field.message} />
              ) : null}
            </div>
            <div className="form-group">
              <input
                className={`form-input-transition form-input ${
                  errors.field ? "form-input-error" : ""
                }`}
                type="text"
                placeholder="Field 1"
                name="field1"
                ref={register({
                  required: { value: true, message: "This field is required" },
                })}
              />
              {errors.field1 ? (
                <FormInputErrorLabel message={errors.field1.message} />
              ) : null}
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" type="submit">
              Save changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
};
