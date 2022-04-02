import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  CssBaseline,
  MuiThemeProvider,
  StylesProvider,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import theme from "./theme";
import "./App.css";

// import Interfaces from "./screens/Interface";
// import Drawer from "./components/Drawer";
import PrivateRoute from "./components/PrivateRoute";
import LoginScreen from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import ContributoryDashboard from "./screens/ContributoryDashboard";
import Maintenance from "./screens/Maintenance";
import Output from "./screens/Output";
import OutputManagement from "./screens/OutputManagement";
import PREXC from "./screens/PREXC";


import NavBar from "./components/AdminLTE/navbar";
import SideBar from "./components/AdminLTE/sidebar";

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
        <NavBar />
        <SideBar />
        <Switch>
          <Route exact path="/" component={LoginScreen} />
          <PrivateRoute path="/insertoutputmajor" component={Output} />
          <PrivateRoute path="/insertoutputminor" component={Output} />
          <PrivateRoute path="/insertoutputoo" component={Output} />
          <Route path="/login" component={LoginScreen} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/contributorydashboard" component={ContributoryDashboard} />
          <PrivateRoute path="/outputmajor" component={OutputManagement} />
          <PrivateRoute path="/outputminor" component={OutputManagement} />
          <PrivateRoute path="/outputtokra" component={OutputManagement} />
          <PrivateRoute path="/prexc" component={PREXC} />
          <PrivateRoute path="/maintenance-kra" component={Maintenance} />
          <PrivateRoute path="/maintenance-project" component={Maintenance} />
          <PrivateRoute path="/maintenance-outcome" component={Maintenance} />
          <PrivateRoute path="/maintenance-indicator" component={Maintenance} />
          <PrivateRoute path="/maintenance-user" component={Maintenance} />
        </Switch>
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
