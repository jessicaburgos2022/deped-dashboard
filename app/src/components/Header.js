import React from "react";
import {
  AppBar,
  Box,
  Button,
  Link,
  Toolbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useLocation } from "react-router-dom";
const styles = (theme) => ({
  brandText: {
    fontSize: "1.2rem",
    fontWeight: 100,
  },
});

const Header = (props) => {
  const { classes, handleDrawerOpen } = props;
  const user = localStorage.getItem("token");
  const location = useLocation();
  const handleLogout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("state", "");
    document.location = "/login";
  };
  return (
    <Box mb={1}>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Box display="flex" justifyContent="space-between" width="100%">
            <div style={{ display: "flex" }}>
              <Box display="flex" alignItems="center">
                <Typography className={classes.brandText}>
                  PRIME NCR PID
                </Typography>
              </Box>
            </div>
            {!user && location.pathname !== "/login" && (
              <div style={{ display: "flex", float: "right" }}>
                <Link href="/login" style={{ color: "#fff", margin: "auto" }}>
                  Login
                </Link>
              </div>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default withStyles(styles, { withTheme: true })(Header);
