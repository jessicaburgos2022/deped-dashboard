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
    IconButton,
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
import { editMajorOutput, getTargetById, deleteTargetById } from "../../../../actions/outputActions";
import Target from "./Target";
import Swal from "sweetalert2";
import { Divider } from "@mui/material";
import { Grid } from "@mui/material";

import { CloseOutlined } from '@material-ui/icons';
export default (props) => {
    const majorOutputState = useSelector((state) => state.majorOutputManagement);
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const { open, handleClose, handleRefresh, data } = props;
    const [plannedtarget, setplannedtarget] = useState(data['PlannedTarget']);
    const [physicalaccomplishment, setphysicalaccomplishment] = useState(data['PhysicalAccomplishment']);
    const [financialrequirement, setfinancialrequirement] = useState(data['FinancialRequirement']);
    const [amountutilized, setamountutilized] = useState(data['AmountUtilized']);
    const [selectedFundingSource, setSelectedFundingSource] = useState("");
    const [selectedQuarter, setSelectedQuarter] = useState(1);

    const handleQuarterChange = async (event) => {
        setValue("Quarter", event.target.value);
        setSelectedQuarter(event.target.value);
    };
    useEffect(() => {
        setSelectedFundingSource(data["FundingSource"] === "MOOE" || data["FundingSource"] === "CO" || data["FundingSource"] === "Downloaded" ? data["FundingSource"] : "Other")
        dispatch(getTargetById(data["OutputMajorHeaderId"]));
    }, [])
    const [targets, setTargets] = useState(majorOutputState.targetByOutputId)
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

        Swal.fire({
            title: "Confirmation",
            text: "Do you want to remove the physical target?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: "No"
        }).then(async (r) => {
            if (r.isConfirmed) {
                if (targets[index].TargetId) {
                    var ret = await dispatch(deleteTargetById(targets[index].TargetId))
                    Swal.fire(
                        ret.result,
                        ret.message,
                        ret.result === "Success" ? "success" : "error"
                    );
                }

                let newList = [...targets]
                newList.splice(index, 1)
                setTargets(newList)
            }
        });
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
        if (input) {
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
                input.targets = targets;
                input.fundingsource = selectedFundingSource;
                input.balance = parseFloat(input.financialrequirement) - parseFloat(input.amountutilized);
                input.utilizationrate = (parseFloat(input['amountutilized']) / parseFloat(input['financialrequirement'])) * 100
                input.accomplishment1 = getTargetPercentage(targets) / targets.length;
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
                close
                fullWidth
            >
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        Edit Output
                        <IconButton onClick={() => handleClose()}><CloseOutlined></CloseOutlined> </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <Paper style={{ padding: "2rem" }}>
                        <form onSubmit={handleSubmit(onSubmit)} id="update-major-form">
                            <FormGroup>
                                <Grid container spacing={2} style={{ padding: '2rem' }}>
                                    <Grid item xs={12}>
                                        <FormControl variant="standard" className=" w-100">
                                            <InputLabel>
                                                Select which quarter should this output be
                                                reflected
                                            </InputLabel>
                                            <Select
                                                defaultValue={data["Quarter"]}
                                                className="output-category-margin"
                                                name="quarter"
                                                label="Select Which Quarter should this output be reflected"
                                                ref={register}
                                                onChange={handleQuarterChange}
                                            >
                                                <MenuItem value={1}>First Quarter</MenuItem>
                                                <MenuItem value={2}>Second Quarter</MenuItem>
                                                <MenuItem value={3}>Third Quarter</MenuItem>
                                                <MenuItem value={4}>Fourth Quarter</MenuItem>
                                            </Select>
                                            <FormHelperText>
                                                {errors.quarter ? errors.quarter.message : ""}
                                            </FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="KRA"
                                            disabled
                                            defaultValue={data["KRAName"]}
                                            rows={4}
                                            maxRows={4}
                                            className="output-margin"
                                            variant="outlined"
                                            size="small"

                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Project"
                                            disabled
                                            defaultValue={data["Project"]}
                                            rows={4}
                                            maxRows={4}
                                            className="output-margin"
                                            variant="outlined"
                                            size="small"

                                        />
                                    </Grid>
                                </Grid>

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
                                <Grid container spacing={2} style={{ padding: '2rem' }}>
                                    <Grid item xs={12}>
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
                                                    fullWidth
                                                    error={errors.objective != null}
                                                    helperText={errors.objective ? errors.objective.message : ""}
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
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
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Controller
                                            defaultValue={data["OutputIndicator"]}
                                            control={control}
                                            name="outputindicator"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "This field is required",
                                                },
                                            }}
                                            as={
                                                <TextField
                                                    autoComplete="off"
                                                    multiline
                                                    className="output-margin "
                                                    rows={3}
                                                    maxRows={3}
                                                    placeholder="Output Indicator"
                                                    label="Output Indicator"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    error={errors.outputindicator != null}
                                                    helperText={
                                                        errors.outputindicator
                                                            ? errors.outputindicator.message
                                                            : ""
                                                    }
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Controller
                                            defaultValue={data["Activity"]}
                                            control={control}
                                            name="activity"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "This field is required",
                                                },
                                            }}
                                            as={
                                                <TextField
                                                    autoComplete="off"
                                                    multiline
                                                    className="output-margin "
                                                    rows={3}
                                                    maxRows={3}
                                                    placeholder="Activity"
                                                    label="Activity"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    error={errors.activity != null}
                                                    helperText={
                                                        errors.activity ? errors.activity.message : ""
                                                    }
                                                />
                                            }
                                        />
                                    </Grid>
                                </Grid>
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

                                <Grid container spacing={3} style={{ padding: '2rem' }}>
                                    <Grid item xs={12} style={{ paddingTop: 25 }}>
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
                                            defaultValue={data["GainGap"]}
                                            control={control}
                                            name="gaingap"
                                            rules={{}}
                                            as={
                                                <TextField
                                                    multiline
                                                    rows={3}
                                                    maxRows={3}
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
                                <Grid container spacing={2} style={{ padding: '2rem' }}>
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

                                    <Grid item className="col-xl-6">
                                        <FormControl variant="standard" fullWidth>
                                            <InputLabel id="funding-source-label">
                                                Funding Source
                                            </InputLabel>
                                            <Select
                                                defaultValue={selectedFundingSource}
                                                variant="standard"
                                                className="output-margin"
                                                labelId="funding-source-label"
                                                value={selectedFundingSource === "MOOE" || selectedFundingSource === "CO" || selectedFundingSource === "Downloaded" ? selectedFundingSource : "Other"}
                                                onChange={(e) => setSelectedFundingSource(e.target.value)}
                                            >
                                                <MenuItem value="MOOE">MOOE</MenuItem>
                                                <MenuItem value="CO">CO</MenuItem>
                                                <MenuItem value="Downloaded">
                                                    Downloaded
                                                </MenuItem>
                                                <MenuItem value="Other">
                                                    Other
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item className="col-xl-6" hidden={(selectedFundingSource === "MOOE" || selectedFundingSource === "CO" || selectedFundingSource === "Downloaded")}>
                                        <Controller
                                            defaultValue={data["FundingSource"]}
                                            control={control}
                                            name="otherFundingSource"
                                            rules={{
                                                required: {
                                                    value: selectedFundingSource !== "MOOE" || selectedFundingSource !== "CO" || selectedFundingSource !== "Downloaded",
                                                    message: "This field is required",
                                                },
                                            }}
                                            as={
                                                <TextField
                                                    name="otherFundingSource"
                                                    autoComplete="off"
                                                    className="output-margin"
                                                    label="Please Specify Funding Source"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    error={errors.otherFundingSource != null}
                                                    helperText={
                                                        errors.otherFundingSource
                                                            ? errors.otherFundingSource.message
                                                            : ""
                                                    }
                                                />
                                            }
                                        />
                                    </Grid>
                                    <Grid item className="col-xl-6">
                                        <FormControl variant="standard" fullWidth>
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
                                        </FormControl>
                                    </Grid>
                                </Grid>

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
                                <Grid container style={{ padding: '2rem' }} spacing={2}>
                                    <Grid item className="col-xl-6">
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
                                    </Grid>
                                    <Grid item className="col-xl-6">
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
                                    </Grid>
                                    <Grid item className="col-xl-6">
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
                                    </Grid>
                                    <Grid item className="col-xl-6">
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
                                    </Grid>
                                    <Grid item className="col-xl-6">
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
                                    </Grid>
                                    <Grid item className="col-xl-6">
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
                                    </Grid>
                                    <Grid item className="col-xl-6">
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
                                    </Grid>
                                </Grid>


                                <Divider
                                    style={{ padding: "2rem 0 0 0" }}
                                    placeholder="OTHERS"
                                    label="others"
                                    variant="fullWidth"
                                    orientation="horizontal"
                                >
                                    <span>
                                        <b>Others</b>
                                    </span>
                                </Divider>
                                <Grid container style={{ padding: '2rem' }} spacing={2}>
                                    <Grid item className="col-xl-12">
                                        <Controller
                                            defaultValue={data["Remarks"]}
                                            control={control}
                                            name="remarks"
                                            rules={{}}
                                            as={
                                                <TextField
                                                    className="output-margin"
                                                    label="Remarks"
                                                    variant="outlined"
                                                    multiline
                                                    minRows={3}
                                                    fullWidth
                                                    error={errors.remarks != null}
                                                    helperText={
                                                        errors.remarks
                                                            ? errors.remarks.message
                                                            : ""
                                                    }
                                                />
                                            }
                                        />
                                    </Grid>
                                </Grid>
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
        </React.Fragment >
    )
}