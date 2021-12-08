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

//Required States
import { listBusinessUnit } from "./actions/appActions";
import { listActiveTicketTypes } from "./actions/ticketActions";


const App = () => {
  const dispatch = useDispatch();
  const marketState = useSelector((s) => s.businessUnitReducer);
  const ticketState = useSelector((s) => s.tickets);
  //load all required states
  // useEffect(() => {
  //   if (
  //     marketState.businessUnits &&
  //     marketState.businessUnits.length === 0
  //   ) {
  //     dispatch(listBusinessUnit());
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
                <Route path="/login" component={LoginScreen} />
                <Route path="/interfaces/:bu?" component={Interfaces} />
                <Route path="/dashboard" component={Dashboard} />
                <PrivateRoute path="/maintenance" component={Maintenance} />
              </Switch>
            </div>
          </StylesProvider>
        </div>
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
