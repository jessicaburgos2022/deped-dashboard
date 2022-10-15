import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../../actions/userActions";
import { useHistory } from "react-router-dom";
import "../../../styles/global.css";
import Swal from "sweetalert2";
import ForgotPassword from "./ForgotPassword";
const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors, control, setValue, getValues } = useForm();
  //Forgot Password
  const [openForgot, setOpenForgot] = useState(false);
  const onSubmit = (data) => {
    const { Username, Password } = data;
    dispatch(login(cb, Username, Password));

    function cb(data) {
      console.log(data);
      if (data && data.res && data.res.result && data.res.result === "Success") {
        localStorage.setItem("token", data.token);
        history.push("/dashboard");
      }
      else {
        Swal.fire(
          data.res.result,
          data.res.message,
          data.res.result === "Success" ? "success" : "error"
        );
      }
    }
  };

  const handleForgotPassword = (ind) => {
    setOpenForgot(ind);
  };

  // var res = await dispatch(
  //   forgotPwd({
  //     username: data.Username,
  //     email: data.EmailAddress,
  //   })
  // );
  return (
    <form onSubmit={handleSubmit(onSubmit)} id="login-form">

      <div className="form-group">
        <Controller
          control={control}
          name="Username"
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          as={
            <TextField
              label="Username"
              variant="outlined"
              size="small"
              fullWidth
              error={errors.Username != null}
              helperText={errors.Username ? errors.Username.message : ""}
            />
          }
        />
      </div>
      <div className="form-group">
        <Controller
          control={control}
          name="Password"
          rules={{
            required: { value: true, message: "This field is required" },
          }}
          as={
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              size="small"
              fullWidth
              error={errors.Password != null}
              helperText={errors.Password ? errors.Password.message : ""}
            />
          }
        />
      </div>
      {/* <div className="form-group">
        <input
          className={`form-input-transition form-input ${
            errors.Password ? "form-input-error" : ""
          }`}
          type="password"
          placeholder="Password"
          name="Password"
          ref={register({
            required: { value: true, message: "This field is required" },
          })}
        />
        {errors.Password ? (
          <FormInputErrorLabel message={errors.Password.message} />
        ) : null}
      </div> */}
      <div className="d-sm-flex mb-3 align-items-center">
        <Button
          variant="contained"
          style={{ width: '100%' }}
          color="primary"
          type="submit"
        >
          Sign in
        </Button>
      </div>
      <div className="d-sm-flex mb-3 align-items-center">
        <Button
          variant="link"
          style={{ width: '100%' }}
          color="primary"
          type="button"
          onClick={() => setOpenForgot(!openForgot)}
        >
          Forgot Password
        </Button>
      </div>
      <ForgotPassword
        open={openForgot}
        handleClose={(ind) => handleForgotPassword(ind)}
      />
    </form>
  );
};
export default LoginForm;
