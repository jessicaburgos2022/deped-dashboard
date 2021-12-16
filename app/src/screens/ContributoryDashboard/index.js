
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
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
    const {data} = props;
    const filteredData = dashboardState.oo.filter(r=>r.OutcomeTypeId === data.OutcomeTypeId && r.OutcomeId === data.OutcomeId).filter(r=>r.IsComputed === 1);
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
    return <PolarArea data={ graphData } />

  }

  return (
    <div style={{ overflow: 'auto', padding: 25, height: "100vh" }}>
      <div className="text">Dashboard - OO</div>
      {
        dashboardState.oo &&
        [... new Set(dashboardState.oo.map(res => res.OutcomeTypeId))].map(otypeId => {
          var outcomeType = dashboardState.oo.find(res => res.OutcomeTypeId === otypeId);
          return (
            <Paper style={{ padding: '15px' }}>
              <h5 style={{ background: '#f0f0f0', padding: 5 }}>{outcomeType.OutcomeType}</h5>
              <Divider />
              <Grid container spacing={1}>
                {
                  [... new Set(dashboardState.oo.filter(i => i.OutcomeTypeId === outcomeType.OutcomeTypeId).map(ind => ind.OutcomeId))].map(outcomeId => {
                    var outcome = dashboardState.oo.find(res => res.OutcomeId === outcomeId)
                    return (
                      <Grid item xs={4} style={{ padding: 15 }}>
                        <Grid container spacing={2}>
                          <GenerateBarGraph data = {outcome} />
                          {/* {
                            dashboardState.oo.filter(res => res.OutcomeId === outcomeId).map(res => {
                              return (
                                <React.Fragment>
                                  <Grid item xs={6} style={{ fontSize: 10, textAlign: 'right' }}>
                                    <b>{res.IndicatorTitle}</b>
                                  </Grid>
                                  <Grid item xs={6} style={{ fontSize: 11 }}>
                                    {res.Result}
                                  </Grid>
                                </React.Fragment>
                              )
                            })
                          } */}
                        </Grid>
                      </Grid>
                    )
                  })
                }
              </Grid>
            </Paper>
          )
        })

      }

    </div>
  );
};