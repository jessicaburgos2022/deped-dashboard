import {
    Button,
    Checkbox,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
} from "@material-ui/core";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm, useWatch } from "react-hook-form";
import { editMajorOutput } from "../../../../actions/outputActions";
import Target from "../../../Output/_components/MajorOutput/Target";
import Swal from "sweetalert2";
import { Divider } from "@mui/material";
import { Grid } from "@mui/material";
export default (props) => {
    const appState = useSelector((state) => state.app);
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { open, handleClose, handleRefresh, data } = props;
    const [plannedtarget, setplannedtarget] = useState(data['PlannedTarget']);
    const [physicalaccomplishment, setphysicalaccomplishment] = useState(data['PhysicalAccomplishment']);
    const [financialrequirement, setfinancialrequirement] = useState(data['FinancialRequirement']);
    const [amountutilized, setamountutilized] = useState(data['AmountUtilized']);

    const [targets, setTargets] = useState(
        [
            {
                PlannedTarget: "",
                TargetType: "",
                TargetDescription: "",
                Accomplishment: "",
                AccomplishmentDescription: ""
            }
        ]
    )
    function handleChange(i, event) {
        const values = [...targets];
        values[i][event.target.name] = event.target.value;
        setTargets(values);
    }

    const handleTargetIncrease = () => {
        setTargets(oldArray => [...oldArray, {
            PlannedTarget: "",
            TargetType: "",
            TargetDescription: "",
            Accomplishment: "",
            AccomplishmentDescription: ""
        }]);
    }

    const handleTargetRemove = (index) => {
        let newList = [...targets]
        newList.splice(index, 1)
        setTargets(newList)
    }
    //react hook form
    const { handleSubmit, errors, control, setValue, getValues, register } = useForm();

    function getTargetPercentage(items) {
        return items.reduce(function (a, b) {
            return Number(a) + ((Number(b['Accomplishment']) / Number(b['PlannedTarget']) * 100));
        }, 0);
    };
    function PhysicalTargetWatch({ control }) {
        // const target = useWatch({
        //   control,
        //   name: ['plannedtarget', 'physicalaccomplishment'],
        //   defaultValue: "0"
        // });
        return (
            <Grid item xs={4}>
                <TextField
                    defaultValue={0}
                    disabled={true}
                    type="number"
                    className="output-margin"
                    label="% of Accomplishment vs Targets"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={getTargetPercentage(targets) / targets.length}
                    error={errors.accomplishment1 != null}
                    helperText={
                        errors.accomplishment1
                            ? errors.accomplishment1.message
                            : ""
                    }
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                        ),
                    }}
                />
            </Grid>
        )
    }
    function UtilizationWatch({ control }) {
        const utilization = useWatch({
            control,
            name: ['financialrequirement', 'amountutilized'],
            defaultValue: "0"
        });
        return (
            <React.Fragment>
                <Grid item xs={6}>
                    <TextField
                        defaultValue={0}
                        disabled={true}
                        className="output-margin"
                        type="number"
                        label="Balance"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={utilization['financialrequirement'] === undefined ? Number(financialrequirement - amountutilized).toFixed(2) : Number(parseFloat(utilization['financialrequirement']) - parseFloat(utilization['amountutilized'])).toFixed(2)}
                        error={errors.balance != null}
                        helperText={errors.balance ? errors.balance.message : ""}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">₱</InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        defaultValue={0}
                        disabled={true}
                        className="output-margin"
                        type="number"
                        label="Budget Utilization Rate (%)"
                        variant="outlined"
                        size="small"
                        fullWidth
                        value={utilization['financialrequirement'] === undefined ? Number((amountutilized / financialrequirement) * 100).toFixed(2) : Number((parseFloat(utilization['amountutilized']) / parseFloat(utilization['financialrequirement'])) * 100).toFixed(2)}
                        error={errors.utilizationrate != null}
                        helperText={
                            errors.utilizationrate
                                ? errors.utilizationrate.message
                                : ""
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">%</InputAdornment>
                            ),
                        }}
                    />
                </Grid>
            </React.Fragment>
        )
    }
    const onSubmit = async (input) => {
        if (data) {
            if (
                userState.userInfo &&
                userState.userInfo.acc &&
                userState.userInfo.acc[0] &&
                userState.userInfo.acc[0].Id
            ) {
                input.userId = userState.userInfo.acc[0].Id;
                input.outputmajorheaderid = data.OutputMajorHeaderId;
                input.kraid = data.KRAId;
                input.projectid = data.projectId;
                input.balance = parseFloat(input.financialrequirement) - parseFloat(input.amountutilized);
                input.utilizationrate = (parseFloat(input['amountutilized']) / parseFloat(input['financialrequirement'])) * 100
                input.accomplishment1 = (parseFloat(input['physicalaccomplishment']) / parseFloat(input['plannedtarget'])) * 100
                console.log(input);
                var ret = await dispatch(editMajorOutput(input));
                Swal.fire(
                    ret.result,
                    ret.message,
                    ret.result === "Success" ? "success" : "error"
                );
                handleRefresh();
                handleClose();
            }
        }
    };
    return (
        <React.Fragment>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Edit Output
                </DialogTitle>
                <DialogContent dividers>
                    <Paper style={{ padding: "2rem" }}>
                        <form onSubmit={handleSubmit(onSubmit)} id="update-major-form">
                            <FormGroup>
                                <TextField
                                    label="KRA"
                                    disabled
                                    defaultValue={data["KRAName"]}
                                    rows={4}
                                    maxRows={4}
                                    className="output-margin"
                                    variant="outlined"
                                    size="small"

                                />
                                <TextField
                                    label="Project"
                                    disabled
                                    defaultValue={data["Project"]}
                                    rows={4}
                                    maxRows={4}
                                    className="output-margin"
                                    variant="outlined"
                                    size="small"

                                />
                                <Divider
                                    style={{ padding: "2rem 0 0 0" }}
                                    placeholder="OPCRF"
                                    label="OPCRF"
                                    variant="fullWidth"
                                    orientation="horizontal"
                                >
                                    <span>
                                        <b>OPCRF</b>
                                    </span>
                                </Divider>

                                <Controller
                                    defaultValue={data["Objective"]}
                                    control={control}
                                    name="objective"
                                    rules={{
                                        required: { value: true, message: "This field is required" },
                                    }}
                                    as={
                                        <TextField
                                            multiline
                                            rows={4}
                                            maxRows={4}
                                            className="output-margin"
                                            placeholder="Objective"
                                            label="Objective"
                                            variant="outlined"
                                            size="small"
                                            error={errors.objective != null}
                                            helperText={errors.objective ? errors.objective.message : ""}
                                        />
                                    }
                                />
                                <Controller
                                    defaultValue={data["Output"]}
                                    control={control}
                                    name="output"
                                    rules={{
                                        required: { value: true, message: "This field is required" },
                                    }}
                                    as={
                                        <TextField
                                            multiline
                                            className="output-margin"
                                            rows={4}
                                            maxRows={4}
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

                                {/* <Divider
                            placeholder="OPCRF"
                            label="OPCRF"
                            variant="fullWidth"
                            orientation="horizontal"

                        ></Divider>
                        <br /><br /> */}

                                <Divider
                                    style={{ padding: "2rem 0 0 0" }}
                                    placeholder="OPCRF"
                                    label="OPCRF"
                                    variant="fullWidth"
                                    orientation="horizontal"
                                >
                                    <span>
                                        <b>PHYSICAL</b>
                                    </span>
                                </Divider>

                                <Grid container spacing={3}>
                                    <Grid item xs={12} style={{ paddingTop: 5 }}>
                                        <Target data={targets} handleTargetRemove={handleTargetRemove} handleChange={handleChange} handleTargetIncrease={handleTargetIncrease} />
                                    </Grid>
                                    <PhysicalTargetWatch control={control} />
                                    <Grid item xs={4}>
                                        <Controller
                                            defaultValue={data["Timeline"]}
                                            control={control}
                                            name="timeline"
                                            rules={{}}
                                            as={
                                                <TextField
                                                    className="output-margin"
                                                    label="Timeline"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    error={errors.timeline != null}
                                                    helperText={
                                                        errors.timeline ? errors.timeline.message : ""
                                                    }
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Controller
                                            type="number"
                                            defaultValue={data["Accomplishment2"]}
                                            control={control}
                                            name="accomplishment2"
                                            rules={{}}
                                            as={
                                                <TextField
                                                    className="output-margin"
                                                    label="% of Accomplishment according to Timeline"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    error={errors.accomplishment2 != null}
                                                    helperText={
                                                        errors.accomplishment2
                                                            ? errors.accomplishment2.message
                                                            : ""
                                                    }
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">%</InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Controller
                                            type="number"
                                            defaultValue={data["GainGap"]}
                                            control={control}
                                            name="gaingap"
                                            rules={{}}
                                            as={
                                                <TextField
                                                    className="output-margin"
                                                    label="Gains/Gaps"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    error={errors.gaingap != null}
                                                    helperText={errors.gaingap ? errors.gaingap.message : ""}
                                                />
                                            }
                                        />
                                    </Grid>

                                    <Grid item xs={4} hidden>
                                        <FormControlLabel
                                            control={
                                                <Controller
                                                    name="withinTimeframe"
                                                    defaultValue={true}
                                                    control={control}
                                                    render={(props) => (
                                                        <Checkbox
                                                            {...props}
                                                            checked={props.value}
                                                            onChange={(e) => props.onChange(e.target.checked)}
                                                        />
                                                    )}
                                                />
                                            }
                                            label="Conducted within timeframe"
                                        />
                                    </Grid>
                                </Grid>

                                <Divider
                                    style={{ padding: "2rem 0 0 00" }}
                                    placeholder="FINANCIAL"
                                    label="Financial"
                                    variant="fullWidth"
                                    orientation="horizontal"
                                >
                                    <span>
                                        <b>FINANCIAL</b>
                                    </span>
                                </Divider>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Controller
                                            type="number"
                                            defaultValue={data["FinancialRequirement"]}
                                            control={control}
                                            name="financialrequirement"
                                            rules={{}}
                                            as={
                                                <TextField
                                                    className="output-margin"
                                                    label="Financial Requirement"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    error={errors.financialrequirement != null}
                                                    helperText={
                                                        errors.financialrequirement
                                                            ? errors.financialrequirement.message
                                                            : ""
                                                    }
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">₱</InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Controller
                                            defaultValue={data["AmountUtilized"]}
                                            control={control}
                                            name="amountutilized"
                                            rules={{}}
                                            as={
                                                <TextField
                                                    className="output-margin"
                                                    type="number"
                                                    label="Amount Utilized"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    error={errors.amountutilized != null}
                                                    helperText={
                                                        errors.amountutilized
                                                            ? errors.amountutilized.message
                                                            : ""
                                                    }
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">₱</InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            }
                                        />
                                    </Grid>

                                    <UtilizationWatch control={control} />

                                    <Grid item xs={4}>
                                        <InputLabel >
                                            Funding Source
                                        </InputLabel>
                                        <Controller

                                            control={control}
                                            name="fundingsource"
                                            defaultValue={data["FundingSource"]}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "This field is required",
                                                },
                                            }}
                                            as={
                                                <Select
                                                    className="output-margin"
                                                    label="Select Funding Source"
                                                >
                                                    <MenuItem value="MOOE">MOOE</MenuItem>
                                                    <MenuItem value="CO">CO</MenuItem>
                                                    <MenuItem value="Downloaded">Downloaded</MenuItem>
                                                </Select>
                                            }
                                        />
                                        {/* </FormControl> */}
                                    </Grid>
                                    <Grid item xs={4}>
                                        {/* <FormControl variant="standard"> */}
                                        <InputLabel>Budget Structure</InputLabel>
                                        <Controller

                                            control={control}
                                            name="budgetstructure"
                                            defaultValue={data["BurdgetStructure"]}
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "This field is required",
                                                },
                                            }}
                                            as={
                                                <Select
                                                    className="output-margin"
                                                    label="Budget Structure"
                                                >
                                                    <MenuItem value="GASS">GASS</MenuItem>
                                                    <MenuItem value="STO">STO</MenuItem>
                                                    <MenuItem value="Operations">Operations</MenuItem>
                                                </Select>
                                            }
                                        />
                                        {/* </FormControl> */}
                                    </Grid>
                                </Grid>

                                {/* <br/> */}

                                <br />
                                <br />

                                <Divider
                                    style={{ padding: "2rem 0 0 0" }}
                                    placeholder="FINANCIAL"
                                    label="Financial"
                                    variant="fullWidth"
                                    orientation="horizontal"
                                >
                                    <span>
                                        <b>QAME RATING DURING IMPLEMENTATION OF ACTIVITY</b>
                                    </span>
                                </Divider>
                                <Controller
                                    defaultValue={data["Score"]}
                                    control={control}
                                    name="score"
                                    rules={{}}
                                    as={
                                        <TextField
                                            className="output-margin"
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
                                    defaultValue={data["ScoreDescription"]}
                                    control={control}
                                    name="scoredescription"
                                    rules={{}}
                                    as={
                                        <TextField
                                            className="output-margin"
                                            label="Descriptive Equivalent"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            error={errors.scoredescription != null}
                                            helperText={
                                                errors.scoredescription
                                                    ? errors.scoredescription.message
                                                    : ""
                                            }
                                        />
                                    }
                                />
                                <Controller
                                    defaultValue={data["OpsIssue"]}
                                    control={control}
                                    name="opsissue"
                                    rules={{}}
                                    as={
                                        <TextField
                                            multiline
                                            rows={4}
                                            maxRows={4}
                                            className="output-margin"
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
                                    defaultValue={data["PolicyIssue"]}
                                    control={control}
                                    name="policyissue"
                                    rules={{}}
                                    as={
                                        <TextField
                                            className="output-margin"
                                            label="Policy Issue"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            error={errors.policyissue != null}
                                            helperText={
                                                errors.policyissue ? errors.policyissue.message : ""
                                            }
                                        />
                                    }
                                />
                                <Controller
                                    defaultValue={data["Recommendation"]}
                                    control={control}
                                    name="recommendation"
                                    rules={{}}
                                    as={
                                        <TextField
                                            className="output-margin"
                                            label="Issues needing Management decision and recommendation"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            error={errors.recommendation != null}
                                            helperText={
                                                errors.recommendation ? errors.recommendation.message : ""
                                            }
                                        />
                                    }
                                />
                                <Controller
                                    defaultValue={data["Others"]}
                                    control={control}
                                    name="others"
                                    rules={{}}
                                    as={
                                        <TextField
                                            className="output-margin"
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
                                    defaultValue={data["CorrectiveAction"]}
                                    control={control}
                                    name="correctiveaction"
                                    rules={{}}
                                    as={
                                        <TextField
                                            className="output-margin"
                                            label="Planned corrective actions to address slippage before year ends."
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            error={errors.correctiveaction != null}
                                            helperText={
                                                errors.correctiveaction
                                                    ? errors.correctiveaction.message
                                                    : ""
                                            }
                                        />
                                    }
                                />
                            </FormGroup>

                            <Button
                                className="output-margin"
                                variant="contained"
                                style={{ width: "100%" }}
                                color="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </form>
                    </Paper>
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