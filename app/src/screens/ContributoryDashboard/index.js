import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import DashboardCard from './dashboardcard';
// import "../../styles";
import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";

import { Doughnut, Line, Pie } from "react-chartjs-2";

import { fetchDashboardOO } from "../../actions/dashboardActions";
import { Paper } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, PolarArea } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default () => {
  const dispatch = useDispatch();
  const accState = useSelector((state) => state.user);
  const dashboardState = useSelector((state) => state.dashboard);
  useEffect(() => {
    // var departmentId = accState.userInfo.acc[0] ? accState.userInfo.acc[0].DepartmentId : 0;
    dispatch(fetchDashboardOO());
    // eslint-disable-next-line
  }, []);
  const GenerateBarGraph = (props) => {
    const { data, type } = props;
    const filteredData = dashboardState.oo
      .filter(
        (r) =>
          r.OutcomeTypeId === data.OutcomeTypeId &&
          r.OutcomeId === data.OutcomeId
      )
      .filter((r) => r.IsComputed === 1);
    const graphData = {
      labels: filteredData.map((r) => r.IndicatorTitle + " (%)"),
      datasets: [
        {
          label: data.OutcomeTitle,
          data: filteredData.map((r) => parseInt(r.Result)),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return type === "polar" ? (
      <PolarArea data={graphData} />
    ) : (
      <Bar data={graphData} />
    );
  };

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">
                Target Outputs Along Key Result Areas (KRAs)
              </h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item active">
                  Target Outputs Along Key Result Areas (KRAs)
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          {dashboardState &&
            dashboardState.oo &&
            Array.isArray(dashboardState.oo) &&
            [...new Set(dashboardState.oo.map((res) => res.OutcomeTypeId))].map(
              (otypeId) => {
                var outcomeType = dashboardState.oo.find(
                  (res) => res.OutcomeTypeId === otypeId
                );
                return (
                  <Paper style={{ padding: "15px", marginBottom: 25 }}>
                    <h5 className="mb-3" style={{ padding: 5 }}>
                      {outcomeType.OutcomeType}
                    </h5>

                    <div className="row">
                      {
                        [
                          ...new Set(
                            dashboardState.oo
                              .filter(
                                (i) =>
                                  i.OutcomeTypeId === outcomeType.OutcomeTypeId
                              )
                              .map((ind) => ind.OutcomeId)
                          ),
                        ].map((outcomeId) => {
                          var outcome = dashboardState.oo.find(
                            (res) => res.OutcomeId === outcomeId
                          );
                          return (
                            <div className={`col-${12 / [
                              ...new Set(
                                dashboardState.oo
                                  .filter(
                                    (i) =>
                                      i.OutcomeTypeId === outcomeType.OutcomeTypeId
                                  )
                                  .map((ind) => ind.OutcomeId)
                              ),
                            ].length}`}>
                              <div className="card">
                                <div className="card-header">
                                  <h5 className="card-title">
                                    {outcome.OutcomeTitle}
                                  </h5>
                                </div>
                                <div className="card-body">
                                  <div className="tab-content p-0">
                                    <div className="row">
                                      {/* <div className="col-12 mb-3">
                                        <div
                                          className="chart tab-pane active"
                                          id="revenue-chart"
                                        >
                                          <GenerateBarGraph
                                            data={outcome}
                                            type="polar"
                                          />
                                        </div>
                                      </div> */}

                                      <div className={`col-12`}>
                                        <div className="row justify-content-center">
                                          {dashboardState.oo
                                            .filter(
                                              (r) =>
                                                r.OutcomeTypeId ===
                                                outcome.OutcomeTypeId &&
                                                r.OutcomeId ===
                                                outcome.OutcomeId
                                            )
                                            // .filter((r) => r.IsComputed === 0)
                                            .map((row) => {
                                              // return (

                                              //   <div className="col-sm-6">
                                              //     <div className="description-block">
                                              //       <div className="description-percentage text-success">
                                              //         <h3>{row.Result}</h3>
                                              //       </div>
                                              //       <div className="description-text">
                                              //         {row.IndicatorTitle}
                                              //       </div>
                                              //     </div>
                                              //   </div>
                                              // );
                                              return (
                                                <DashboardCard columnSize={
                                                  12 / dashboardState.oo.filter(
                                                    (r) =>
                                                      r.OutcomeTypeId ===
                                                      outcome.OutcomeTypeId &&
                                                      r.OutcomeId ===
                                                      outcome.OutcomeId
                                                  ).length} result={row.Result} title={row.IndicatorTitle} />
                                              )
                                            })}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }) // end of iteration
                      }
                    </div>
                  </Paper>
                );
              }
            )}
        </div>
      </div>
    </div >
  );
};
