import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';
export default (props) => {

    const { open, handleClose, data } = props;
    console.log(data)
    return (
        <React.Fragment>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    View Output
                </DialogTitle>
                <DialogContent dividers>
                    Objective: {data.Objective}
                </DialogContent>
                <DialogActions>
                    {/* <Button autoFocus color="primary" onClick={() => handleClose}>
                        Close
                    </Button> */}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}