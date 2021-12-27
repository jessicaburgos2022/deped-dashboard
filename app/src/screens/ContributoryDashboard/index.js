
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
// import "../../styles";
import { Card, CardContent, Container, Divider, Grid, Typography } from "@material-ui/core";

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
  const accState = useSelector((state) => state.user)
  const dashboardState = useSelector((state) => state.dashboard);
  useEffect(() => {
    // var departmentId = accState.userInfo.acc[0] ? accState.userInfo.acc[0].DepartmentId : 0;
    dispatch(fetchDashboardOO());
    // eslint-disable-next-line
  }, []);
  const GenerateBarGraph = (props) => {
    const { data } = props;
    const filteredData = dashboardState.oo.filter(r => r.OutcomeTypeId === data.OutcomeTypeId && r.OutcomeId === data.OutcomeId).filter(r => r.IsComputed === 1);
    const graphData = {
      labels: filteredData.map(r => r.IndicatorTitle + " (%)"),
      datasets: [{
        label: data.OutcomeTitle,
        data: filteredData.map(r => parseInt(r.Result)),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    };
    return <PolarArea data={graphData} />

  }

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Contributory Dashboard to Organizational Outcome</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Contributory Dashboard to Organizational Outcome</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          {
            dashboardState &&
            dashboardState.oo &&
            Array.isArray(dashboardState.oo) &&
            [... new Set(dashboardState.oo.map(res => res.OutcomeTypeId))].map(otypeId => {
              var outcomeType = dashboardState.oo.find(res => res.OutcomeTypeId === otypeId);
              return (
                <Paper style={{ padding: '15px', marginBottom: 25 }}>
                  <h5 style={{ background: '#f1faee', padding: 5 }}>{outcomeType.OutcomeType}</h5>
                  <Divider />
                  <div className="row">
                    {
                      [... new Set(dashboardState.oo.filter(i => i.OutcomeTypeId === outcomeType.OutcomeTypeId).map(ind => ind.OutcomeId))].map(outcomeId => {
                        var outcome = dashboardState.oo.find(res => res.OutcomeId === outcomeId)
                        return (
                          <div className="col-xl-4">
                            <div className="card card-danger">
                              <div className="card-header">
                                <h3 className="card-title">Chart {outcome.OutcomeId}</h3>

                                <div className="card-tools">
                                  <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus"></i>
                                  </button>
                                  <button type="button" className="btn btn-tool" data-card-widget="remove">
                                    <i className="fas fa-times"></i>
                                  </button>
                                </div>
                              </div>
                              <div className="card-body">
                                {/* <canvas id="pieChart" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas> */}
                                <GenerateBarGraph data={outcome} />
                              </div>
                            </div>
                          </div>

                        )
                      }) // end of iteration
                    }
                  </div>
                </Paper>
              )
            })

          }
        </div>
      </div>
    </div>
  );
};
