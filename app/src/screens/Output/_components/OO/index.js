import {
  Button,
  Container,
  FormControl,
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
import { Controller, useForm } from "react-hook-form";
import {insertContributoryOutput } from "../../../../actions/outputActions";
import Swal from "sweetalert2";
import { Divider } from "@mui/material";
import MuiGrid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import "../../styles.css";

const Grid = styled(MuiGrid)(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  '& [role="separator"]': {
    margin: theme.spacing(0, 2),
  },
}));

export default () => {
  const appState = useSelector((state) => state.app);
  const userState = useSelector((state) => state.user);
  const ooState = useSelector((state) => state.ooManagement);
  const dispatch = useDispatch();
  const OutputTypeId = 3; // ID for Contributory output (refer to ref_outputtype table)
  //react hook form
  const { handleSubmit, errors, control, setValue, register } = useForm();
  const [indicatorInput, setIndicator] = useState([]);
  const handleIndicatorInput = (e) => {
    const input = e.target.value;
    const id = e.target.id;
    var cIndicator = indicatorInput;
    if(cIndicator.find(i=>i.id === id))
    {
      var index = cIndicator.findIndex(obj => obj.id === id);
      cIndicator[index].value = input;
    }
    else
    {
      cIndicator.push({ id, value: input })
    }
    setIndicator(cIndicator);
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
        data.indicators = indicatorInput;
        var ret = await dispatch(insertContributoryOutput(data));
        Swal.fire(
          ret.result,
          ret.message,
          ret.result === "Success" ? "success" : "error"
        );
      }
    }
  };
  return (
    <div style={{ height: "100vh"}}>
      <div className="text">Insert Contributory Output to OO</div>
      <Paper style={{ padding: "2rem" }}>
        <form onSubmit={handleSubmit(onSubmit)} id="insert-contributory-form">
          <FormGroup>
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
                      appState.projectsByDept &&
                      appState.projectsByDept.map((project, id) => {
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
            {/* <br/><br/> */}
            <Controller
              defaultValue=""
              control={control}
              name="outputs"
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              as={
                <TextField
                  multiline
                  rows={4}
                  maxRows={4}
                  className="output-margin"
                  label="Major and Minor Outputs"
                  variant="outlined"
                  size="small"
                  fullWidth
                  error={errors.outputs != null}
                  helperText={
                    errors.outputs ? errors.outputs.message : ""
                  }
                />
              }
            />

            {
              ooState.indicators &&
              [... new Set(ooState.indicators.map(i => i.OutcomeTypeId))].map(otype => {
                const outcomeType = ooState.indicators.find(ind => ind.OutcomeTypeId === otype).OutcomeType;
                return (
                  <React.Fragment>
                    <Divider
                      style={{ padding: "2rem" }}
                      variant="fullWidth"
                      orientation="horizontal"
                    >
                      <span>
                        <b> {outcomeType}</b>
                      </span>
                    </Divider>
                    {
                      [... new Set(ooState.indicators.filter(i => i.OutcomeTypeId === otype).map(ind => ind.OutcomeId))].map(outcomeId => {
                        const oTitle = ooState.indicators.find(ind => ind.OutcomeId === outcomeId).OutcomeTitle;
                        return (
                          <React.Fragment>
                            <Divider style={{ padding: "1rem 0 0 0" }} textAlign="left">
                              <i>{oTitle}</i>
                            </Divider>
                            {
                              ooState.indicators.filter(ind => ind.OutcomeId === outcomeId).map(indicator => {
                                return (
                                  <TextField
                                    multiline
                                    rows={2}
                                    maxRows={4}
                                    id={indicator.IndicatorId}
                                    className="output-category-margin"
                                    type="number"
                                    label={indicator.Indicator}
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    onChange={(e) => { handleIndicatorInput(e) }}
                                  />
                                )
                              })
                            }
                          </React.Fragment>
                        )
                      })
                    }
                  </React.Fragment>
                )
              })
            }
          </FormGroup>

          <Button
            variant="contained"
            style={{ width: "100%" }}
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
};
