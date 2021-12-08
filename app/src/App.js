import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  CssBaseline,
  MuiThemeProvider,
  StylesProvider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import theme from "./theme";
import "./styles/sidebar-style.css";

import Interfaces from "./screens/Interface";
import Drawer from "./components/Drawer";
import PrivateRoute from "./components/PrivateRoute";
import LoginScreen from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Maintenance from "./screens/Maintenance";
import Output from "./screens/Output";

//Required States
// import { fetchOutputTypes } from "./actions/appActions";


const App = () => {
  // const dispatch = useDispatch();
  // const appState = useSelector(state => state.app)
  //load all required states
  // useEffect(() => {
  //   if (appState.OutputTypes.length === 0) {
  //     setInterval(dispatch(fetchOutputTypes(), 2000));
  //   }
  // });


  return (
    <Router>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Drawer />
        <div className="home_content">
          <StylesProvider injectFirst>
            <div
              style={{
                overflow: "auto"
              }}
            >
              <Switch>
                <Route exact path="/" component={LoginScreen} />
                <PrivateRoute path="/output" component={Output} />
                <Route path="/login" component={LoginScreen} />
                {/* <Route path="/interfaces/:bu?" component={Interfaces} /> */}
                <PrivateRoute path="/dashboard" component={Dashboard} />
                {/* <PrivateRoute path="/maintenance" component={Maintenance} /> */}
              </Switch>
            </div>
          </StylesProvider>
        </div>
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
