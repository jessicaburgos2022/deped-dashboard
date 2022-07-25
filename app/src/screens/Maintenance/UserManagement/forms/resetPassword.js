import { Button, Dialog, DialogContent, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default (props) => {
    const dispatch = useDispatch();
    const store = useSelector((s) => s.roles);
    const { openResetPassword, setResetPasswordOpen } = props;
    const submitReset = () => {
    };
    return (
        <>
            <Dialog open={openResetPassword}>
                <div style={{ display: "flex", justifyContent: 'space-between', padding: "20px 30px 0 30px" }}>
                    <Typography variant="h5">
                        Reset Password
                    </Typography>
                </div>
                <DialogContent style={{ maxHeight: 600 }}>
                    <div>
                        <Paper style={{ padding: 10 }}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    Please specify the new password for the account below.<br />
                                    <TextField />
                                </Grid>
                            </Grid>
                        </Paper>
                        <br />
                    </div>
                    <div style={{ float: "right" }}>
                        <Button onClick={() => setResetPasswordOpen(false)}>Cancel</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: 20 }}
                            onClick={() => submitReset()}
                        >
                            Continue
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
