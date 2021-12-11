
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchKRAByDepartmentId, fetchOutputTypes } from "../../actions/appActions";
import RelatedTickets from "../Interface/_components/RelatedTickets";
import CommonModal from "../../components/CommonModal";
import "./styles.css";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@material-ui/core";
import { Box } from "@mui/system";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Doughnut, Line, Pie } from 'react-chartjs-2';


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
  const state = useSelector((state) => state.app);
  useEffect(() => {
    var departmentId = accState.userInfo.acc[0] ? accState.userInfo.acc[0].DepartmentId : 0;
    dispatch(fetchKRAByDepartmentId(departmentId));
    dispatch(fetchOutputTypes());
    // eslint-disable-next-line
  }, []);
  const data1 = {
    labels: ['ASD', 'CLMD', 'ESSD', 'FINANCE DIVISION', 'FTAD', 'HRDD', 'ORD', 'PPRD', 'QAD'],
    datasets: [
      {
        label: 'PAPs Monitored and Analyzed',
        data: [12, 19, 3, 5, 2, 3, 6, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  const labels3 = ['ASD', 'CLMD', 'ESSD', 'FINANCE DIVISION', 'FTAD', 'HRDD', 'ORD', 'PPRD', 'QAD'];

  const data3 = {
    labels3,
    datasets: [
      {
        label: 'Project',
        data: [12, 19, 3, 5, 2, 3, 6, 5, 2],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Within timeline',
        data: [8, 10, 2, 5, 1, 1, 4, 3, 1],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Number of PAPs Monitored and Analyzed
        </Typography>
        <Typography variant="h5" component="div">
          <Grid container spacing={2} style={{ padding: 20 }}>
            <Grid item xs={5}>
              <Pie data={data1} />
            </Grid>
            <Grid item xs={6}>
              Total: 213
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  const card2 = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Satisfactory accountability result on Physical and Financial Target
        </Typography>
        <Typography variant="h5" component="div">
          <Grid container spacing={2} style={{ padding: 20 }}>
            <Grid item xs={6}>
              <div style={{ width: '40%' }}>
                <Doughnut data={data1} />
              </div>
            </Grid>
            <Grid item xs={6}>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  const card3 = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          PAPs conducted within the defined timeline
        </Typography>
        <Typography variant="h5" component="div">
          <div style={{ width: '40%' }}>
            <Line options={options} data={data3} />
          </div>
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  const card4 = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Budget Utilization Rate
        </Typography>
        <Typography variant="h5" component="div">
          <div style={{ width: '40%' }}>
            <Doughnut data={data1} />
          </div>
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  return (
    <div>
      <div className="text">Physical and Financial Targets Dashboard</div>
      <Grid container spacing={2} style={{ padding: 20 }}>
        <Grid item xs={6}>
          <Card variant="outlined">{card}</Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined">{card2}</Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined">{card3}</Card>
        </Grid>
        <Grid item xs={6}>
          <Card variant="outlined">{card4}</Card>
        </Grid>
      </Grid>
    </div>
  );
};
