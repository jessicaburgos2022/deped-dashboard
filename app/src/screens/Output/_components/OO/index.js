import { Button, Container, FormControl, FormGroup, FormHelperText, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from "react-hook-form";
import { insertMinorOutput } from '../../../../actions/outputActions';
import Swal from 'sweetalert2';
import { Divider } from '@mui/material';
import MuiGrid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Grid = styled(MuiGrid)(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& [role="separator"]': {
        margin: theme.spacing(0, 2),
    },
}));

export default () => {

    const appState = useSelector(state => state.app);
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const OutputTypeId = 2; // ID for MINOR output (refer to ref_outputtype table)
    const [KRAList, setKRAList] = useState(appState.KRA.filter(kra => kra.OutputTypeId === OutputTypeId));

    //react hook form
    const { handleSubmit, errors, control, setValue, register } = useForm();
    const onSubmit = async (data) => {
        if (data) {
            if (userState.userInfo && userState.userInfo.acc && userState.userInfo.acc[0] && userState.userInfo.acc[0].Id) {
                data.userId = userState.userInfo.acc[0].Id;
                var ret = await dispatch(insertMinorOutput(data));
                console.log(ret)
                Swal.fire(
                    ret.result,
                    ret.message,
                    ret.result === "Success" ? "success" : "error"
                );
            }
        }
    };
    return (
        <div style={{ height: "100vh", overflow: "auto" }}>
            <div className="text">Insert Contributory Output</div>
            <Paper style={{ padding: '2rem' }}>
                <form onSubmit={handleSubmit(onSubmit)} id="insert-contributory-form">
                    <FormGroup>
                        <Controller
                            defaultValue=""
                            control={control}
                            name="program"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextField
                                    label="Program"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.program != null}
                                    helperText={errors.program ? errors.program.message : ""}
                                />
                            }
                        />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="majorminor"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextareaAutosize
                                    label="majorminor"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.majorminor != null}
                                    helperText={errors.majorminor ? errors.majorminor.message : ""}
                                />
                            }
                        />
                        <br /><br />

                        <Divider
                            placeholder="Strategic"
                            label="Stragegic"
                            variant="fullWidth"
                            orientation="horizontal"
                        ><span><b> Strategic Leadership and Management</b></span>
                        </Divider>
                        <br />
                        <Divider textAlign="left"><i>RBEB AIP FY 2021 (PPRD)</i></Divider>
                        <br />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="serviceapproved"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Number of services with approved PAPs and implementation strategies"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.serviceapproved != null}
                                    helperText={errors.serviceapproved ? errors.serviceapproved.message : ""}
                                />
                            }
                        /><br />

                        <Controller
                            defaultValue=""
                            control={control}
                            name="servicedel"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Percentage of Service Delivery Rated"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.servicedel != null}
                                    helperText={errors.servicedel ? errors.servicedel.message : ""}
                                />
                            }
                        /><br />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="serviceapproved"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Percentage of approved services achieving target within the semester"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.serviceapproved != null}
                                    helperText={errors.serviceapproved ? errors.serviceapproved.message : ""}
                                />
                            }
                        /><br />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="aveservice"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Average cost of service per implementatio"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.aveservice != null}
                                    helperText={errors.aveservice ? errors.aveservice.message : ""}
                                />
                            }
                        />

                        <br /><br />
                        <Divider textAlign="left"><i>MATURITY LEVEL III ACCREDITATION (HRDD)</i></Divider>
                        <br />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="serviceapproved"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Number of services with approved PAPs and implementation strategies"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.serviceapproved != null}
                                    helperText={errors.serviceapproved ? errors.serviceapproved.message : ""}
                                />
                            }
                        /><br />

                        <Controller
                            defaultValue=""
                            control={control}
                            name="servicedel"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Percentage of Service Delivery Rated"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.servicedel != null}
                                    helperText={errors.servicedel ? errors.servicedel.message : ""}
                                />
                            }
                        /><br />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="serviceapproved"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Percentage of approved services achieving target within the semester"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.serviceapproved != null}
                                    helperText={errors.serviceapproved ? errors.serviceapproved.message : ""}
                                />
                            }
                        /><br />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="aveservice"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Average cost of service per implementatio"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.aveservice != null}
                                    helperText={errors.aveservice ? errors.aveservice.message : ""}
                                />
                            }
                        /><br />

                        <br />

                        <br /><br />
                        <Divider textAlign="left"><i>PRIME NCR QMS MANUAL PREPARATORY STAGE (ASD)</i></Divider>
                        <br />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="serviceapproved"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Number of services with approved PAPs and implementation strategies"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.serviceapproved != null}
                                    helperText={errors.serviceapproved ? errors.serviceapproved.message : ""}
                                />
                            }
                        /><br />

                        <Controller
                            defaultValue=""
                            control={control}
                            name="servicedel"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Percentage of Service Delivery Rated"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.servicedel != null}
                                    helperText={errors.servicedel ? errors.servicedel.message : ""}
                                />
                            }
                        /><br />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="serviceapproved"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Percentage of approved services achieving target within the semester"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.serviceapproved != null}
                                    helperText={errors.serviceapproved ? errors.serviceapproved.message : ""}
                                />
                            }
                        /><br />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="aveservice"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Average cost of service per implementatio"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.aveservice != null}
                                    helperText={errors.aveservice ? errors.aveservice.message : ""}
                                />
                            }
                        /><br />

                        <Grid container>
                            <Grid item xs>
                               testing lang muna
                               testing lang muna
                               testing lang muna
                               testing lang muna
                               testing lang muna
                               testing lang muna
                               testing lang muna
                               testing lang muna
                               testing lang muna

                            </Grid>
                            <Divider 
                                orientation="vertical" 
                                variant="fullWidth"
                                
                            >
                            
                            </Divider>
                            <Grid item xs>
                            testing lang muna
                            testing lang muna
                            testing lang muna
                            testing lang muna
                            testing lang muna

                            </Grid>
                        </Grid>
                    </FormGroup>

                    <Button
                        variant="contained"
                        style={{ width: '100%' }}
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </div>
    )
}