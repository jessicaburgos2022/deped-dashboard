import {
  Button,
  Checkbox,
  CircularProgress,
  Container,
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
import { Redirect } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm, useWatch } from "react-hook-form";
import { getPreviousData, insertMajorOutput } from "../../../../actions/outputActions";
import Swal from "sweetalert2";
import { Divider } from "@mui/material";
import { fetchProjectByKRAId } from "../../../../actions/appActions";
import "../../styles.css";
import { Grid } from "@mui/material";
import Target from "./Target";
import { padding } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
// import { Container, Row, Col } from 'reactstrap';
// import { Field }

export default () => {
  const appState = useSelector((state) => state.app);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const OutputTypeId = 1; // ID for MAJOR output (refer to ref_outputtype table)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [targets, setTargets] = useState([
    {
      PlannedTarget: "",
      TargetType: "",
      TargetDescription: "",
      Accomplishment: "",
      AccomplishmentDescription: "",
    },
  ]);
  const [KRAList, setKRAList] = useState(
    appState.KRA.filter((kra) => kra.OutputTypeId === OutputTypeId)
  );
  const [selectedKRA, setSelectedKRA] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState(1);
  const [selectedFundingSource, setSelectedFundingSource] = useState("");
  const [otherFundingSource, setOtherFundingSource] = useState("");

  function handleChange(i, event) {
    const values = [...targets];
    values[i][event.target.name] = event.target.value;
    setTargets(values);
  }

  const handleTargetIncrease = () => {
    setTargets((oldArray) => [
      ...oldArray,
      {
        PlannedTarget: "",
        TargetType: "",
        TargetDescription: "",
        Accomplishment: "",
        AccomplishmentDescription: "",
      },
    ]);
  };

  const handleTargetRemove = (index) => {
    let newList = [...targets];
    newList.splice(index, 1);
    setTargets(newList);
  };

  const handleKRAChange = async (event) => {
    setValue("kraid", event.target.value);
    setSelectedKRA(event.target.value);
    dispatch(fetchProjectByKRAId(event.target.value));
  };

  const handleQuarterChange = async (event) => {
    setValue("quarter", event.target.value);
    setSelectedQuarter(event.target.value);
  };
  const handleProjectChange = async (event) => {
    setSelectedProject(event.target.value)
    const data = await dispatch(getPreviousData(selectedKRA, event.target.value));
    if (data && data.length > 0) {
      Swal.fire({
        title: "Confirmation",
        text: "Do you want to use previous data?",
        icon: "question",
        buttons: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }).then(async (r) => {
        if (r.isConfirmed) {
          setSelectedKRA(data[0].KRAId);
          setSelectedProject(data[0].ProjectId);
          setValue("kraid", data[0].KRAId);
          setValue("projectid", data[0].ProjectId);
          setValue("objective", data[0].Objective);
          setValue("output", data[0].Output);
          setValue("outputindicator", data[0].OutputIndicator);
          setValue("activity", data[0].Activity);
          setValue("score", data[0].Score);
          setValue("scoredescription", data[0].ScoreDescription);
          setValue("opsissue", data[0].OpsIssue);
          setValue("policyissue", data[0].PolicyIssue);
          setValue("recommendation", data[0].Recommendation);
          setValue("others", data[0].Others);
          setValue("correctiveaction", data[0].CorrectiveAction);
          setValue("correctiveaction", data[0].CorrectiveAction);
          setValue("financialrequirement", data[0].FinancialRequirement);
          setValue("amountutilized", data[0].AmountUtilized);
          setValue("timeline", data[0].Timeline);
          setValue("accomplishment2", data[0].Accomplishment2);
          setValue("gaingap", data[0].GainGap);
          setValue("budgetstructure", data[0].BurdgetStructure);
        }
      });
    }
  }

  //react hook form
  const {
    handleSubmit,
    errors,
    control,
    setValue,
    getValues,
    register,
    reset,
  } = useForm();

  function getTargetPercentage(items) {
    return items.reduce(function (a, b) {
      return (
        Number(a) +
        (Number(b["Accomplishment"]) / Number(b["PlannedTarget"])) * 100
      );
    }, 0);
  }
  function PhysicalTargetWatch({ control }) {
    // const target = useWatch({
    //   control,
    //   name: ['plannedtarget', 'physicalaccomplishment'],
    //   defaultValue: "0"
    // });

    // handleChange
    return (
      // <Grid item xs={4}>
      <Grid item className="col-xl-6">
        <TextField
          autoComplete="off"
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
            errors.accomplishment1 ? errors.accomplishment1.message : ""
          }
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </Grid>
    );
  }
  function UtilizationWatch({ control }) {
    const utilization = useWatch({
      control,
      name: ["financialrequirement", "amountutilized"],
      defaultValue: "0",
    });
    return (
      <React.Fragment>
        <Grid item xs={6}>
          <TextField
            autoComplete="off"
            defaultValue={0}
            disabled={true}
            className="output-margin"
            type="number"
            label="Balance"
            variant="outlined"
            size="small"
            fullWidth
            value={Number(
              parseFloat(utilization["financialrequirement"]) -
              parseFloat(utilization["amountutilized"])
            ).toFixed(2)}
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
            autoComplete="off"
            defaultValue={0}
            disabled={true}
            className="output-margin"
            type="number"
            label="Budget Utilization Rate (%)"
            variant="outlined"
            size="small"
            fullWidth
            value={Number(
              (parseFloat(utilization["amountutilized"]) /
                parseFloat(utilization["financialrequirement"])) *
              100
            ).toFixed(2)}
            error={errors.utilizationrate != null}
            helperText={
              errors.utilizationrate ? errors.utilizationrate.message : ""
            }
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
        </Grid>
      </React.Fragment>
    );
  }

  const handleFormReset = () => {
    reset(
      {},
      {
        keepErrors: true,
        keepDirty: true,
        keepIsSubmitted: false,
        keepTouched: false,
        keepIsValid: false,
        keepSubmitCount: false,
      }
    );
  };

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Confirmation",
      text: "Do you want to continue?",
      icon: "question",
      buttons: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }).then(async (r) => {
      if (r.isConfirmed) {
        setIsSubmitted(true);
        if (data) {
          if (
            userState.userInfo &&
            userState.userInfo.acc &&
            userState.userInfo.acc[0] &&
            userState.userInfo.acc[0].Id
          ) {
            data.userId = userState.userInfo.acc[0].Id;
            data.quarter = selectedQuarter;
            data.kraid = selectedKRA;
            data.projectid = selectedProject;
            data.fundingSource = selectedFundingSource;
            data.targets = targets;
            data.balance =
              parseFloat(data.financialrequirement) -
              parseFloat(data.amountutilized);
            data.utilizationrate =
              (parseFloat(data["amountutilized"]) /
                parseFloat(data["financialrequirement"])) *
              100;
            data.accomplishment1 = getTargetPercentage(targets) / targets.length;
            var ret = await dispatch(insertMajorOutput(data));
            setIsSubmitted(false);
            Swal.fire(
              ret.result,
              ret.message,
              ret.result === "Success" ? "success" : "error"
            ).finally((r) => {
              return <Redirect to="/outputmanagement/major" />;
            });
            handleFormReset();
          }
        }
      }
    });
  };
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Insert Major Output</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Insert Output</a>
                </li>
                <li className="breadcrumb-item active">Major</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <Paper className="p-3 p-lg-5">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  id="insert-major-form"
                  className="custom-form"
                >
                  <FormGroup>
                    <div className="row">
                      {/* ***** OPCRF ***** */}
                      <div className="col-xl-6 border-end-1">
                        <div style={{ paddingRight: "1.5rem" }}>
                          <Divider
                            // style={{ padding: "2rem 0 0 0" }}
                            placeholder="OPCRF"
                            label="OPCRF"
                            variant="fullWidth"
                            orientation="horizontal"
                          >
                            <span>
                              <b>OPCRF</b>
                            </span>
                          </Divider>

                          <FormControl variant="standard" className=" w-100">
                            <InputLabel>
                              Select which quarter should this output be
                              reflected
                            </InputLabel>
                            <Select
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

                          <FormControl variant="standard" className=" w-100">
                            <InputLabel>KRA</InputLabel>
                            <Select
                              className="output-category-margin"
                              name="kraid"
                              label="Select KRA"
                              ref={register}
                              onChange={handleKRAChange}
                            >
                              {KRAList.map((kra, id) => {
                                return (
                                  <MenuItem key={id} value={kra.Id}>
                                    {kra.Name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                            <FormHelperText>
                              {errors.kraid ? errors.kraid.message : ""}
                            </FormHelperText>
                          </FormControl>

                          <FormControl variant="standard" className=" w-100">
                            <InputLabel>Program/Project</InputLabel>
                            <Select
                              className="output-margin"
                              label="Select Program/Project"
                              disabled={appState.projectsByKRALoading}
                              rules={{
                                required: {
                                  value: true,
                                  message: "This field is required",
                                },
                              }}
                              onChange={handleProjectChange}
                              value={selectedProject}
                              endAdornment={
                                appState.projectsByKRALoading && (
                                  <InputAdornment
                                    position="end"
                                    style={{ marginRight: "3rem" }}
                                  >
                                    <CircularProgress size={20} />
                                  </InputAdornment>
                                )
                              }
                            >
                              {appState.projectsByKRA &&
                                appState.projectsByKRA.map(
                                  (project, id) => {
                                    return (
                                      <MenuItem key={id} value={project.Id}>
                                        {project.Project}
                                      </MenuItem>
                                    );
                                  }
                                )}
                            </Select>
                            <FormHelperText>
                              {errors.projectid ? errors.projectid.message : ""}
                            </FormHelperText>
                          </FormControl>

                          <Controller
                            defaultValue=""
                            control={control}
                            name="objective"
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
                                rows={3}
                                maxRows={3}
                                className="output-margin w-100"
                                placeholder="Objective"
                                label="Objective"
                                variant="outlined"
                                size="small"
                                error={errors.objective != null}
                                helperText={
                                  errors.objective
                                    ? errors.objective.message
                                    : ""
                                }
                              />
                            }
                          />
                          <Controller
                            defaultValue=""
                            control={control}
                            name="output"
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
                                placeholder="Output"
                                label="Output"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={errors.output != null}
                                helperText={
                                  errors.output ? errors.output.message : ""
                                }
                              />
                            }
                          />
                          <Controller
                            defaultValue=""
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
                          <Controller
                            defaultValue=""
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
                        </div>
                      </div>
                      <div className="col-xl-6">
                        {/* ***** QAME RATING ***** */}
                        <div style={{ paddingLeft: "1.5rem" }}>
                          <Divider
                            className="group-title"
                            placeholder="FINANCIAL"
                            label="Financial"
                            variant="fullWidth"
                            orientation="horizontal"
                          >
                            <span>
                              <b>
                                QAME RATING DURING IMPLEMENTATION OF ACTIVITY
                              </b>
                            </span>
                          </Divider>
                          <Controller
                            defaultValue=""
                            control={control}
                            name="score"
                            rules={{}}
                            as={
                              <TextField
                                autoComplete="off"
                                className="output-margin"
                                type="number"
                                label="Score"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={errors.score != null}
                                helperText={
                                  errors.score ? errors.score.message : ""
                                }
                              />
                            }
                          />

                          <Controller
                            defaultValue=""
                            control={control}
                            name="scoredescription"
                            rules={{}}
                            as={
                              <TextField
                                autoComplete="off"
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
                            defaultValue=""
                            control={control}
                            name="opsissue"
                            rules={{}}
                            as={
                              <TextField
                                autoComplete="off"
                                multiline
                                rows={2}
                                maxRows={2}
                                className="output-margin"
                                placeholder="Operational Issue"
                                label="Operational Issue"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={errors.opsissue != null}
                                helperText={
                                  errors.opsissue ? errors.opsissue.message : ""
                                }
                              />
                            }
                          />
                          <Controller
                            defaultValue=""
                            control={control}
                            name="policyissue"
                            rules={{}}
                            as={
                              <TextField
                                autoComplete="off"
                                className="output-margin"
                                label="Policy Issue"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={errors.policyissue != null}
                                helperText={
                                  errors.policyissue
                                    ? errors.policyissue.message
                                    : ""
                                }
                              />
                            }
                          />
                          <Controller
                            defaultValue=""
                            control={control}
                            name="recommendation"
                            rules={{}}
                            as={
                              <TextField
                                autoComplete="off"
                                className="output-margin"
                                label="Issues needing Management decision and recommendation"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={errors.recommendation != null}
                                helperText={
                                  errors.recommendation
                                    ? errors.recommendation.message
                                    : ""
                                }
                              />
                            }
                          />
                          <Controller
                            defaultValue=""
                            control={control}
                            name="others"
                            rules={{}}
                            as={
                              <TextField
                                autoComplete="off"
                                className="output-margin"
                                label="Others"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={errors.others != null}
                                helperText={
                                  errors.others ? errors.others.message : ""
                                }
                              />
                            }
                          />
                          <Controller
                            defaultValue=""
                            control={control}
                            name="correctiveaction"
                            rules={{}}
                            as={
                              <TextField
                                autoComplete="off"
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
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      {/* ***** PHYSICAL ***** */}
                      <div className="col-xl-6 border-end-1">
                        <div style={{ paddingRight: "1.5rem" }}>
                          <Divider
                            // style={{ padding: "2rem 0" }}
                            className="group-title"
                            placeholder="OPCRF"
                            label="OPCRF"
                            variant="fullWidth"
                            orientation="horizontal"
                          >
                            <span>
                              <b>PHYSICAL</b>
                            </span>
                          </Divider>
                          <Target
                            data={targets}
                            handleTargetRemove={handleTargetRemove}
                            handleChange={handleChange}
                            handleTargetIncrease={handleTargetIncrease}
                          />
                          <Grid container spacing={3}>
                            {/* <Grid item xs={12} style={{ paddingTop: 5 }}> */}
                            <PhysicalTargetWatch control={control} />
                            {/* <Grid item xs={4}> */}
                            <Grid item className="col-xl-6">
                              <Controller
                                defaultValue=""
                                control={control}
                                name="timeline"
                                rules={{}}
                                as={
                                  <TextField
                                    autoComplete="off"
                                    className="output-margin"
                                    label="Timeline"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.timeline != null}
                                    helperText={
                                      errors.timeline
                                        ? errors.timeline.message
                                        : ""
                                    }
                                  />
                                }
                              />
                            </Grid>
                            {/* <Grid item xs={4}> */}
                            <Grid item className="col-xl-6">
                              <Controller
                                type="number"
                                defaultValue=""
                                control={control}
                                name="accomplishment2"
                                rules={{}}
                                as={
                                  <TextField
                                    autoComplete="off"
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
                                        <InputAdornment position="end">
                                          %
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                }
                              />
                            </Grid>
                            {/* <Grid item xs={4}> */}
                            <Grid item className="col-xl-6">
                              <Controller
                                defaultValue=""
                                control={control}
                                name="gaingap"
                                rules={{}}
                                as={
                                  <TextField
                                    autoComplete="off"
                                    multiline
                                    rows={3}
                                    maxRows={3}
                                    className="output-margin"
                                    label="Gains/Gaps"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={errors.gaingap != null}
                                    helperText={
                                      errors.gaingap
                                        ? errors.gaingap.message
                                        : ""
                                    }
                                  />
                                }
                              />
                            </Grid>
                            {/* <Grid item xs={4} hidden> */}
                            <Grid item className="col-xl-6" hidden>
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
                                        onChange={(e) =>
                                          props.onChange(e.target.checked)
                                        }
                                      />
                                    )}
                                  />
                                }
                                label="Conducted within timeframe"
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </div>

                      {/* ***** FINANCIAL ***** */}
                      <div className="col-xl-6">
                        <div style={{ paddingLeft: "1.5rem" }}>
                          <Divider
                            className="group-title"
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
                            <Grid item className="col-xl-6">
                              <Controller
                                type="number"
                                defaultValue=""
                                control={control}
                                name="financialrequirement"
                                rules={{}}
                                as={
                                  <TextField
                                    autoComplete="off"
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
                                        <InputAdornment position="start">
                                          ₱
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                }
                              />
                            </Grid>
                            <Grid item className="col-xl-6">
                              <Controller
                                defaultValue=""
                                control={control}
                                name="amountutilized"
                                rules={{}}
                                as={
                                  <TextField
                                    autoComplete="off"
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
                                        <InputAdornment position="start">
                                          ₱
                                        </InputAdornment>
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
                                  variant="standard"
                                  className="output-margin"
                                  labelId="funding-source-label"
                                  value={selectedFundingSource}
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
                            <Grid item className="col-xl-6" hidden={selectedFundingSource !== 'Other'}>
                              <Controller
                                defaultValue=""
                                control={control}
                                name="otherFundingSource"
                                rules={{
                                  required: {
                                    value: selectedFundingSource === 'Other',
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
                                  defaultValue=""
                                  control={control}
                                  name="budgetstructure"
                                  rules={{
                                    required: {
                                      value: true,
                                      message: "This field is required",
                                    },
                                  }}
                                  as={
                                    <Select
                                      variant="outlined"
                                      className="output-margin"
                                      label="Budget Structure"
                                    >
                                      <MenuItem value="GASS">GASS</MenuItem>
                                      <MenuItem value="STO">STO</MenuItem>
                                      <MenuItem value="Operations">
                                        Operations
                                      </MenuItem>
                                    </Select>
                                  }
                                />
                              </FormControl>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </div>
                  </FormGroup>
                  <hr />
                  <div className="row mb-3 justify-content-center">
                    <div className="col-auto col-xl-2">
                      {!isSubmitted ? (
                        <Button
                          className="output-margin"
                          variant="contained"
                          disabled={isSubmitted}
                          style={{ width: "100%", padding: ".75rem" }}
                          color="primary"
                          type="submit"
                        >
                          Submit
                        </Button>
                      ) : (
                        <LoadingButton
                          loading
                          loadingPosition="start"
                          // startIcon={<SaveIcon />}
                          variant="outlined"
                        >
                          Save
                        </LoadingButton>
                      )}
                    </div>

                    <div className="col-auto col-xl-2">
                      <Button
                        className="output-margin btn-cancel"
                        variant="contained"
                        style={{ width: "100%", padding: ".75rem" }}
                        onClick={() => handleFormReset()}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </form>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
