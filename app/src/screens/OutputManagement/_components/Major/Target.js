import { Button, Grid, IconButton, Paper, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

export default (props) => {
    const { data, handleTargetRemove, handleChange, handleTargetIncrease } = props;
    return (
        <React.Fragment>
            <Paper elevation={3} style={{ padding: 10, marginTop: 10 }}>
                <h6>
                    Targets
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => handleTargetIncrease()}>
                        <AddIcon />
                    </IconButton>
                </h6>
                {
                    data &&
                    Array.isArray(data) &&
                    data.map((i, index) => {
                        return (
                            <Grid container spacing={2}>
                                <Grid item>
                                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => handleTargetRemove(index)} >
                                        <DeleteIcon />
                                    </IconButton>
                                    {/* <Button className="output-margin" onClick={() => handleTargetRemove(index)} variant="contained" color="primary">Remove</Button> */}
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        placeholder='0'
                                        name="PlannedTarget"
                                        className="output-margin"
                                        type="number"
                                        label="Planned Target"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onChange={e => handleChange(index, e)}
                                        value={data[index]["PlannedTarget"]}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        name="TargetType"
                                        className="output-margin"
                                        label="Target Unit"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onChange={e => handleChange(index, e)}
                                        value={data[index]["TargetType"]}
                                    />
                                </Grid>
                                <Grid item xs={3}>
                                    <TextField
                                        name="TargetDescription"
                                        className="output-margin"
                                        label="Target Description"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onChange={e => handleChange(index, e)}
                                        value={data[index]["TargetDescription"]}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        placeholder='0'
                                        name="Accomplishment"
                                        type="number"
                                        className="output-margin"
                                        label="Physical Accomplishment"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onChange={e => handleChange(index, e)}
                                        value={data[index]["Accomplishment"]}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <TextField
                                        name="AccomplishmentDescription"
                                        className="output-margin"
                                        label="Accomplishment Description"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        onChange={e => handleChange(index, e)}
                                        value={data[index]["AccomplishmentDescription"]}
                                    />
                                </Grid>
                            </Grid>
                        )
                    })
                }
            </Paper>
        </React.Fragment>
    )
}