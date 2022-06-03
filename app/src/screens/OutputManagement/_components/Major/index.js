import {
  Button,
  FormControl,
  FormGroup,
  MenuItem,
  Select,
  Container,
  Grid,
  InputLabel,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { searchMajorOutput } from "../../../../actions/outputActions";
import Table from "./table";
import "./style.css";
import { hasAccess } from "../../../../helpers/common";
import { styled } from "@mui/material/styles";
// import Button2 from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
export default () => {
  const dispatch = useDispatch();
  const outputManagementState = useSelector(
    (state) => state.majorOutputManagement
  );
  const userState = useSelector((state) => state.user);
  const appState = useSelector((state) => state.app);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(0);
  const [selectedYear, setSelectedYear] = useState(0);
  const [kraName, setKraName] = useState("");
  const [outputTypeId, setOutputTypeId] = useState(0);
  const [departmentList, setdepartmentList] = useState(appState.departments);
  const currentYear = new Date().getFullYear();
  const [selectedKRA, setSelectedKRA] = useState(null);

  useEffect(() => {
    dispatch(searchMajorOutput(selectedYear, selectedDepartmentId, kraName));
  }, []);
  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 500,
    },
  });

  const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: "none",
    },
  });

  const longText = `
  Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
  Praesent non nunc mollis, fermentum neque at, semper arcu.
  Nullam eget est sed sem iaculis gravida eget vitae justo.
  `;
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <div style={{ display: "flex" }}>
                <h1 className="m-0">Major Output Management</h1>
                {/* <div> */}
                <CustomWidthTooltip
                  title={
                    <p style={{ fontSize: "12", color: "#FFF" }}>
                      <b>MAJOR OUTPUTS</b> - Programs, Project and
                      Activities(PPAs) with Funding Source from MOOE, CO,
                      Downloaded PPAs refer to:
                      <ul>
                        <p style={{ fontSize: "10px", color: "#FFF" }}>
                          <li>
                            <b>Program</b> - an integrated group of activities
                            that contribute to particular contunuing objective
                            of a department/agency.
                          </li>
                          <li>
                            <b>Project</b> - a special department or agency
                            undertaking carried out within a define time frame
                            and intended to result in some pre-determined
                            measure of goods and services.
                          </li>
                          <li>
                            <b>Activities</b> - a work process that contributes
                            to the implementation of a program or sub-program or
                            project.
                          </li>
                        </p>
                      </ul>
                    </p>
                  }
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "0.4rem 0 0 0.4rem",
                    }}
                  >
                    <HelpRoundedIcon
                      style={{ color: "#012060", width: "1.2rem" }}
                    ></HelpRoundedIcon>
                  </div>
                </CustomWidthTooltip>
                {/* </div> */}
              </div>
            </div>

            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Output Management</a>
                </li>
                <li className="breadcrumb-item active">
                  Major Output Management
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div className="container-fluid" style={{ marginTop: 20 }}>
          {hasAccess(userState, 2) && (
            <Link
              to="/insertoutputmajor"
              style={{ color: "#fff", margin: "auto" }}
            >
              <Button className="btn btn-primary">Insert Major Output </Button>
            </Link>
          )}
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="advance-search">
            <span className="desc">Search</span>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <FormControl variant="standard" className="w-100">
                  <InputLabel>Year</InputLabel>
                  <Select
                    fullWidth
                    label="Year"
                    name="selectedYear"
                    onChange={(e) => setSelectedYear(e.target.value)}
                    value={selectedYear}
                  >
                    <MenuItem value={0}>Any</MenuItem>
                    <MenuItem value={currentYear - 1}>
                      {currentYear - 1}
                    </MenuItem>
                    <MenuItem value={currentYear}>{currentYear}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl variant="standard" className="w-100">
                  <InputLabel>Department</InputLabel>
                  <Select
                    fullWidth
                    label="Department"
                    name="departmentId"
                    value={selectedDepartmentId}
                    onChange={(e) => setSelectedDepartmentId(e.target.value)}
                  >
                    <MenuItem value={0}>Any</MenuItem>
                    {departmentList.map((department, id) => {
                      return (
                        <MenuItem key={id} value={department.Id}>
                          {department.Name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <TextField
                  placeholder="KRA"
                  label="KRA"
                  variant="standard"
                  fullWidth
                  size="small"
                  onChange={(e) => setKraName(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    dispatch(
                      searchMajorOutput(
                        selectedYear,
                        selectedDepartmentId,
                        kraName
                      )
                    )
                  }
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </div>
          <Table SearchResult={outputManagementState.searchResult} />
        </div>
      </div>
    </div>
  );
};
