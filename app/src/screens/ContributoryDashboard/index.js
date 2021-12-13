
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { Card, CardContent, Container, Divider, Grid, Typography } from "@material-ui/core";

import { fetchDashboardOO } from "../../actions/dashboardActions";
import { Paper } from "@mui/material";
export default () => {
  const dispatch = useDispatch();
  const accState = useSelector((state) => state.user)
  const dashboardState = useSelector((state) => state.dashboard);
  useEffect(() => {
    // var departmentId = accState.userInfo.acc[0] ? accState.userInfo.acc[0].DepartmentId : 0;
    dispatch(fetchDashboardOO());
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ overflow: 'auto', padding: 25, height: "100vh" }}>
      <div className="text">Dashboard - OO</div>
      {
        dashboardState.oo &&
        [... new Set(dashboardState.oo.map(res => res.OutcomeTypeId))].map(otypeId => {
          var outcomeType = dashboardState.oo.find(res => res.OutcomeTypeId === otypeId);
          return (
            <Paper style={{ padding: '15px' }}>
              <h5 style={{background:'#f0f0f0', padding:5}}>{outcomeType.OutcomeType}</h5>
              <Divider />
              <Grid container spacing={1}>
                {
                  [... new Set(dashboardState.oo.filter(i => i.OutcomeTypeId === outcomeType.OutcomeTypeId).map(ind => ind.OutcomeId))].map(outcomeId => {
                    var outcome = dashboardState.oo.find(res => res.OutcomeId === outcomeId)
                    return (
                      <Grid item xs={4} style={{ padding: 15 }}>
                        <h6>{outcome.OutcomeTitle}</h6>
                        <Grid container spacing={2}>
                          {
                            dashboardState.oo.filter(res => res.OutcomeId === outcomeId).map(res => {
                              return (
                                <React.Fragment>
                                  <Grid item xs={6} style={{ fontSize: 10, textAlign:'right' }}>
                                    <b>{res.IndicatorTitle}</b>
                                  </Grid>
                                  <Grid item xs={6} style={{ fontSize: 11 }}>
                                    {res.Result}
                                  </Grid>
                                </React.Fragment>
                              )
                            })
                          }
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
