import { Button, Container, FormControl, FormGroup, FormHelperText, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField } from '@material-ui/core';
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from "react-hook-form";
import { insertMinorOutput } from '../../../../actions/outputActions';
import Swal from 'sweetalert2';
import { Divider } from '@mui/material';
import { fetchProjectByKRAId } from "../../../../actions/appActions";

export default () => {

    const appState = useSelector(state => state.app);
    const userState = useSelector(state => state.user);
    const dispatch = useDispatch();
    const OutputTypeId = 2; // ID for MINOR output (refer to ref_outputtype table)
    const [KRAList, setKRAList] = useState(appState.KRA.filter(kra => kra.OutputTypeId === OutputTypeId));
    const [selectedKRA, setSelectedKRA] = useState(null);
    const [ProjectsByKRA, setProjectsByKRA] = useState([]);

    const handleKRAChange = (event) => {
        setValue('kraid', event.target.value)
        setSelectedKRA(event.target.value);
        dispatch(fetchProjectByKRAId(event.target.value));
        setProjectsByKRA(appState.projectsByKRA);
    }

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
            <div className="text">Insert Minor Output</div>
            <Paper style={{ padding: '2rem' }}>
                <form onSubmit={handleSubmit(onSubmit)} id="insert-minor-form">
                    <FormGroup>
                        <Divider
                            style={{padding:'2rem 0 0 0'}}
                            placeholder="OPCRF"
                            label="OPCRF"
                            variant="fullWidth"
                            orientation="horizontal"
                        ><span><b>Cross-Cutting KRAs not included in OPCRF</b></span>
                        </Divider>
                        <FormControl variant="standard">
                            <InputLabel>KRA</InputLabel>
                            <Select
                                className="output-category-margin"
                                name="kraid"
                                label="Select KRA"
                                ref={register}
                                onChange={handleKRAChange}
                            >
                                {
                                    KRAList.map((kra, id) => {
                                        return <MenuItem key={id} value={kra.Id}>{kra.Description}</MenuItem>
                                    })
                                }
                            </Select>
                            <FormHelperText>
                                {errors.kraid ? errors.kraid.message : ""}
                            </FormHelperText>
                        </FormControl>

                        <FormControl variant="standard">
                            <InputLabel>Project</InputLabel>
                            <Controller
                                control={control}
                                name="projectid"
                                rules={{
                                    required: { value: true, message: "This field is required" },
                                }}
                                as={
                                    <Select
                                    className="output-margin"
                                        label="Select Project"
                                    >
                                        {
                                            ProjectsByKRA &&
                                            ProjectsByKRA.map((project, id) => {
                                                return <MenuItem key={id} value={project.Id}>{project.Project}</MenuItem>
                                            })
                                        }
                                    </Select>
                                }
                            />
                            <FormHelperText>
                                {errors.projectid ? errors.projectid.message : ""}
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
                                    className="output-margin"
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
                        <Controller
                            defaultValue=""
                            control={control}
                            name="output"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextareaAutosize
                                className="output-margin"
                                    rows={4}
                                    placeholder="Ouput"
                                    label="Output"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.output != null}
                                    helperText={errors.output ? errors.output.message : ""}
                                />
                            }
                        />

                        <Controller
                            defaultValue=""
                            control={control}
                            name="target"
                            rules={{
                                required: { value: true, message: "This field is required" },
                            }}
                            as={
                                <TextField
                                className="output-margin"
                                    label="Target"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.target != null}
                                    helperText={errors.target ? errors.target.message : ""}
                                />
                            }
                        />


                        <Controller
                            defaultValue=""
                            control={control}
                            name="accomplishment"
                            rules={{
                            }}
                            as={
                                <TextField
                                className="output-margin"
                                    label="Accomplishment"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.accomplishment != null}
                                    helperText={errors.accomplishment ? errors.accomplishment.message : ""}
                                />
                            }
                        />

                        {/* <Controller
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
                        /> */}
                        <Controller
                            defaultValue=""
                            control={control}
                            name="agencyincharge"
                            rules={{
                            }}
                            as={
                                <TextField
                                className="output-margin"
                                    placeholder="Agency In-Charge"
                                    label="Agency In-Charge"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.timeline != null}
                                    helperText={errors.agencyincharge ? errors.agencyincharge.message : ""}
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
                                className="output-margin"
                                    label="Timeline"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.timeline != null}
                                    helperText={errors.timeline ? errors.timeline.message : ""}
                                />
                            }
                        />
                         <Divider
                        style={{padding:'2rem 0 0 0'}}
                            placeholder="Issues and Concerns Encountered"
                            label="Issues and Concerns Encountered"
                            variant="fullWidth"
                            orientation="horizontal"
                        ><span><b>Issues and Concerns Encountered</b></span></Divider>
                        
                        <Controller
                            defaultValue=""
                            control={control}
                            name="opsissue"
                            rules={{
                            }}
                            as={
                                <TextField
                                className="output-category-margin"
                                    label="Operational Issue"
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
                                className="output-margin"
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
                            name="managedecisionrecommendation"
                            rules={{
                            }}
                            as={
                                <TextField
                                className="output-margin"
                                    label="Management decision and Recommendation"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.managedecisionrecommendation != null}
                                    helperText={errors.managedecisionrecommendation ? errors.managedecisionrecommendation.message : ""}

                                />
                            }
                        />
                        
                        <Divider
                             style={{padding:'2rem 0 0 0'}}
                            placeholder="RATING"
                            label="Rating"
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
                                    className="output-category-margin"
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
                                className="output-margin"
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
                            name="correctiveaction"
                            rules={{
                            }}
                            as={
                                <TextField
                                 className="output-margin"
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
                    {/* <br/> */}

                    <Button
                          className="output-margin"
                        variant="contained"
                        style={{ width: '100%' }}
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                    <br/>
                </form>
            </Paper>
        </div>
    )
}