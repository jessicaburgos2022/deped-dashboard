import React from "react";
import { useHistory } from "react-router-dom";
import LoginForm from "./_components/LoginForm";
import {
  Paper,
  Container
} from "@material-ui/core";
import "./_css/login.css";
export default () => {
  const history = useHistory();
  if (localStorage.getItem("token")) {
    history.push("/interfaces");
  }
  return (
    <div className="contents">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="w-100">
            <Paper className="form-block mx-auto">
              <div className="text-center mb-5">
                <h3>
                  User Login
                </h3>
              </div>
              <div id="login-screen" >
                <Container id="login-form-container">
                  <LoginForm />
                </Container>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};
