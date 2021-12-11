import { Button, Container, FormControl, FormGroup, FormHelperText, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from "react-hook-form";
import { insertMajorOutput } from '../../../../actions/outputActions';
import Swal from 'sweetalert2';
import { Divider } from '@mui/material';
// import { Container, Row, Col } from 'reactstrap';
// import { Field }

export default () => {
    const appState = useSelector(state => state.app);
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const OutputTypeId = 1; // ID for MAJOR output (refer to ref_outputtype table)
    const [KRAList, setKRAList] = useState(appState.KRA.filter(kra => kra.OutputTypeId === OutputTypeId));

    //react hook form
    const { handleSubmit, errors, control, setValue, register } = useForm();
    const onSubmit = async (data) => {
        if (data) {
            if (userState.userInfo && userState.userInfo.acc && userState.userInfo.acc[0] && userState.userInfo.acc[0].Id) {
                data.userId = userState.userInfo.acc[0].Id;
                var ret = await dispatch(insertMajorOutput(data));
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
        <div className='"' style={{ height: "100vh", overflow: "auto" }}>
            <div className="text">Insert Major Output</div>
            {/* <div className="container"> */}
            <Paper style={{ padding: '2rem' }}>
                <form onSubmit={handleSubmit(onSubmit)} id="insert-major-form">
                    <FormGroup>
                        <Divider
                            placeholder="OPCRF"
                            label="OPCRF"
                            variant="fullWidth"
                            orientation="horizontal"
                        ><span><b>OPCRF</b></span></Divider>
                        <FormControl variant="standard">
                            <InputLabel>Select KRA</InputLabel>
                            <Controller
                                control={control}
                                name="kraid"
                                rules={{
                                    required: { value: true, message: "This field is required" },
                                }}
                                as={
                                    <Select
                                        label="Select KRA"
                                    >
                                        {
                                            KRAList.map((kra, id) => {
                                                return <MenuItem key={id} value={kra.Id}>{kra.Description}</MenuItem>
                                            })
                                        }
                                    </Select>
                                }
                            />
                            <FormHelperText>
                                {errors.kraid ? errors.kraid.message : ""}
                            </FormHelperText>
                        </FormControl>

                        <Controller
                            defaultValue=""
                            control={control}
                            name="objective"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextareaAutosize
                                    rows={4}
                                    placeholder="Objective"
                                    label="Objective"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.objective != null}
                                    helperText={errors.objective ? errors.objective.message : ""}
                                />
                            }
                        />

                        <TextareaAutosize
                            rows={4}
                            placeholder="Program/Project"
                            label="Program"
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
                            name="output"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextareaAutosize
                                    rows={3}
                                    placeholder="Output"
                                    label="Output"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.output != null}
                                    helperText={errors.output ? errors.output.message : ""}
                                />
                            }
                        />
                        <br />
                        <Divider
                            placeholder="OPCRF"
                            label="OPCRF"
                            variant="fullWidth"
                            orientation="horizontal"

                        ></Divider>
                        <br /><br />

                        <Divider
                            placeholder="OPCRF"
                            label="OPCRF"
                            variant="fullWidth"
                            orientation="horizontal"

                        ><span><b>PHYSICAL</b></span></Divider>
                        <Controller
                            defaultValue=""
                            control={control}
                            name="plannedtarget"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Planned Target"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.plannedtarget != null}
                                    helperText={errors.plannedtarget ? errors.plannedtarget.message : ""}
                                />
                            }
                        />


                        <Controller
                            defaultValue=""
                            control={control}
                            name="timeline"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Timeline"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.timeline != null}
                                    helperText={errors.timeline ? errors.timeline.message : ""}
                                />
                            }
                        />

                        <Controller
                            type="number"
                            defaultValue=""
                            control={control}
                            name="physicalaccomplishment"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Physical Accomplishment"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.physicalaccomplishment != null}
                                    helperText={errors.physicalaccomplishment ? errors.physicalaccomplishment.message : ""}
                                />
                            }
                        />
                        <Controller
                            type="number"
                            defaultValue=""
                            control={control}
                            name="accomplishment1"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="% of Accomplishment vs Targets"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.accomplishment1 != null}
                                    helperText={errors.accomplishment1 ? errors.accomplishment1.message : ""}
                                />
                            }
                        />
                        <Controller
                            type="number"
                            defaultValue=""
                            control={control}
                            name="accomplishment2"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="% of Accomplishment according to Timeline"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.accomplishment2 != null}
                                    helperText={errors.accomplishment2 ? errors.accomplishment2.message : ""}
                                />
                            }
                        />
                        <Controller
                            type="number"
                            defaultValue=""
                            control={control}
                            name="gaingap"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Gains/Gaps"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.gaingap != null}
                                    helperText={errors.gaingap ? errors.gaingap.message : ""}
                                />
                            }
                        />
                        <br /><br />

                        {/* <Divider
                            placeholder="PHYSICAL"
                            label="Physical"
                            variant="fullWidth"
                            orientation="horizontal"

                        ></Divider>
                        <br/><br/> */}



                        <Divider
                            placeholder="FINANCIAL"
                            label="Financial"
                            variant="fullWidth"
                            orientation="horizontal"

                        ><span><b>FINANCIAL</b></span></Divider>
                        <Controller
                            type="number"
                            defaultValue=""
                            control={control}
                            name="financialrequirement"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Financial Requirement"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.financialrequirement != null}
                                    helperText={errors.financialrequirement ? errors.financialrequirement.message : ""}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                                    }}
                                />
                            }
                        />
                      
                        <Controller
                            defaultValue=""
                            control={control}
                            name="amountutilized"
                            rules={{
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Amount Utilized"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.amountutilized != null}
                                    helperText={errors.amountutilized ? errors.amountutilized.message : ""}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                                    }}
                                />
                            }
                        />
                        
                        <Controller
                            defaultValue=""
                            control={control}
                            name="balance"
                            rules={{
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Balance"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.balance != null}
                                    helperText={errors.balance ? errors.balance.message : ""}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₱</InputAdornment>,
                                    }}
                                />
                            }
                        />
                            {/* <br/> */}
                        <Controller
                            defaultValue=""
                            control={control}
                            name="utilizationrate"
                            rules={{
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Budget Utilization Rate (%)"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.utilizationrate != null}
                                    helperText={errors.utilizationrate ? errors.utilizationrate.message : ""}
                                />
                            }
                        />
                        <br /><br />
                        <FormControl variant="standard">

                            <InputLabel>Funding Source</InputLabel>
                            <Controller
                                defaultValue=""
                                control={control}
                                name="fundingsource"
                                defaultValue={0}
                                rules={{
                                    required: { value: true, message: "This field is required" },
                                }}
                                as={
                                    <Select
                                        label="Select KRA"
                                    >
                                        <MenuItem value="MOOE">MOOE</MenuItem>
                                        <MenuItem value="CO">CO</MenuItem>
                                        <MenuItem value="Downloaded">Downloaded</MenuItem>
                                    </Select>
                                }
                            />
                        </FormControl>

                        <FormControl variant="standard">
                            <InputLabel>Budget Structure</InputLabel>
                            <Controller
                                defaultValue=""
                                control={control}
                                name="budgetstructure"
                                defaultValue={0}
                                rules={{
                                    required: { value: true, message: "This field is required" },
                                }}
                                as={
                                    <Select
                                        label="Budget Structure"
                                    >
                                        <MenuItem value="GASS">GASS</MenuItem>
                                        <MenuItem value="STO">STO</MenuItem>
                                        <MenuItem value="Operations">Operations</MenuItem>
                                    </Select>
                                }
                            />
                        </FormControl>
                        <br /><br />

                        <Divider
                            placeholder="FINANCIAL"
                            label="Financial"
                            variant="fullWidth"
                            orientation="horizontal"

                        ><span><b>QAME RATING DURING IMPLEMENTATION OF ACTIVITY</b></span></Divider>
                        <Controller
                            defaultValue=""
                            control={control}
                            name="score"
                            rules={{
                            }}
                            as={
                                <TextField
                                    type="number"
                                    label="Score"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.score != null}
                                    helperText={errors.score ? errors.score.message : ""}
                                />
                            }
                        />

                        <Controller
                            defaultValue=""
                            control={control}
                            name="scoredescription"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Descriptive Equivalent"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.scoredescription != null}
                                    helperText={errors.scoredescription ? errors.scoredescription.message : ""}
                                />
                            }
                        />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="opsissue"
                            rules={{
                            }}
                            as={
                                <TextareaAutosize
                                    rows={3}
                                    placeholder="Operational Issue"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.opsissue != null}
                                    helperText={errors.opsissue ? errors.opsissue.message : ""}
                                />
                            }
                        />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="policyissue"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Policy Issue"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.policyissue != null}
                                    helperText={errors.policyissue ? errors.policyissue.message : ""}
                                />
                            }
                        />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="recommendation"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Issues needing Management decision and recommendation"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.recommendation != null}
                                    helperText={errors.recommendation ? errors.recommendation.message : ""}
                                />
                            }
                        />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="others"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Others"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.others != null}
                                    helperText={errors.others ? errors.others.message : ""}
                                />
                            }
                        />
                        <Controller
                            defaultValue=""
                            control={control}
                            name="correctiveaction"
                            rules={{
                            }}
                            as={
                                <TextField
                                    label="Planned corrective actions to address slippage before year ends."
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.correctiveaction != null}
                                    helperText={errors.correctiveaction ? errors.correctiveaction.message : ""}
                                />
                            }
                        />
                    </FormGroup>
                    <br /><br />
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
            {/* </div> */}
        </div>
    )
}