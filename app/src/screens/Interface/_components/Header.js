import { Breadcrumbs, Link, Typography } from "@material-ui/core";
import React from "react";

export default () => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/dashboard">
        E2E Interface Management System and Dashboard
      </Link>
      <Typography color="textPrimary">E2E Interfaces</Typography>
    </Breadcrumbs>
  );
};
