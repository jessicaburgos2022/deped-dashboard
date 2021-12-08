import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@material-ui/core";
import React from "react";

import CloseIcon from "@material-ui/icons/Close";


export default (props) => {
  const { open, handleClose, dialogTitle, dialogContent } = props;
  return (
    <React.Fragment>
      <Dialog
        aria-labelledby="common-dialog-title"
        open={open}
        onClose={handleClose}
        maxWidth="false"
        fullWidth
      >
        <DialogTitle id="common-dialog-title">{dialogTitle}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#9e9e9e",
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers style={{ minHeight: "50vh" }}>
          {dialogContent}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
