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
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm, useWatch } from "react-hook-form";
import { insertMajorOutput } from "../../../../actions/outputActions";
import Swal from "sweetalert2";
import { Divider } from "@mui/material";
import { fetchProjectByKRAId } from "../../../../actions/appActions";
import "../../styles.css";
import { Grid } from "@mui/material";
import Target from './Target';
// import { Container, Row, Col } from 'reactstrap';
// import { Field }

export default () => {
  const appState = useSelector((state) => state.app);
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const OutputTypeId = 1; // ID for MAJOR output (refer to ref_outputtype table)
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
  const [KRAList, setKRAList] = useState(
    appState.KRA.filter((kra) => kra.OutputTypeId === OutputTypeId)
  );
  const [selectedKRA, setSelectedKRA] = useState(null);

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

  const handleKRAChange = async (event) => {
    setValue("kraid", event.target.value);
    setSelectedKRA(event.target.value);
    dispatch(fetchProjectByKRAId(event.target.value));
  };

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
            value={Number(parseFloat(utilization['financialrequirement']) - parseFloat(utilization['amountutilized'])).toFixed(2)}
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
            value={Number((parseFloat(utilization['amountutilized']) / parseFloat(utilization['financialrequirement'])) * 100).toFixed(2)}
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


  const onSubmit = async (data) => {
    if (data) {
      if (
        userState.userInfo &&
        userState.userInfo.acc &&
        userState.userInfo.acc[0] &&
        userState.userInfo.acc[0].Id
      ) {
        data.userId = userState.userInfo.acc[0].Id;
        data.kraid = selectedKRA;
        data.targets = targets;
        data.balance = parseFloat(data.financialrequirement) - parseFloat(data.amountutilized);
        data.utilizationrate = (parseFloat(data['amountutilized']) / parseFloat(data['financialrequirement'])) * 100;
        data.accomplishment1 = getTargetPercentage(targets) / targets.length;
        var ret = await dispatch(insertMajorOutput(data));
        Swal.fire(
          ret.result,
          ret.message,
          ret.result === "Success" ? "success" : "error"
        );
      }
    }
  };
  return (
    <div className='"' style={{ height: "100vh" }}>
      <div className="text">Insert Major Output</div>
      {/* <div className="container"> */}
      <Paper style={{ padding: "2rem" }}>
        <form onSubmit={handleSubmit(onSubmit)} id="insert-major-form">
          <FormGroup>
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
            <FormControl variant="standard">
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

            <FormControl variant="standard">
              <InputLabel>Project</InputLabel>
              <Controller
                control={control}
                name="projectid"
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                endAdornment={
                  appState.projectsByKRALoading &&
                  <InputAdornment position="end" style={{ marginRight: '3rem' }}>
                    <CircularProgress size={20} />
                  </InputAdornment>
                }
                as={
                  <Select className="output-margin" label="Select Project" disabled={appState.projectsByKRALoading}>
                    {appState.projectsByKRA &&
                      appState.projectsByKRA.map((project, id) => {
                        return (
                          <MenuItem key={id} value={project.Id}>
                            {project.Project}
                          </MenuItem>
                        );
                      })}
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
              defaultValue=""
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
              <Grid item xs={12} style={{paddingTop: 5}}>
                <Target data={targets} handleTargetRemove={handleTargetRemove} handleChange={handleChange} handleTargetIncrease={handleTargetIncrease}/>
              </Grid>
              <PhysicalTargetWatch control={control} />
              <Grid item xs={4}>
                <Controller
                  defaultValue=""
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
                  defaultValue=""
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
                  defaultValue=""
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
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  type="number"
                  defaultValue=""
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
                  defaultValue=""
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

              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="funding-source-label">
                    Funding Source
                  </InputLabel>
                  <Controller
                    defaultValue=""
                    control={control}
                    name="fundingsource"
                    defaultValue={0}
                    rules={{
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    }}
                    as={
                      <Select
                        variant="standard"
                        className="output-margin"
                        labelId="funding-source-label"
                      >
                        <MenuItem value="MOOE">MOOE</MenuItem>
                        <MenuItem value="CO">CO</MenuItem>
                        <MenuItem value="Downloaded">Downloaded</MenuItem>
                      </Select>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Budget Structure</InputLabel>
                  <Controller
                    defaultValue=""
                    control={control}
                    name="budgetstructure"
                    defaultValue={0}
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
              defaultValue=""
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
              defaultValue=""
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
              defaultValue=""
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
              defaultValue=""
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
              defaultValue=""
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
              defaultValue=""
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
              defaultValue=""
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
      {/* </div> */}
    </div>
  );
};
