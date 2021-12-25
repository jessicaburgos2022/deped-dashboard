import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
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

import { Doughnut, Line, Pie } from "react-chartjs-2";

import {
  fetchKRAByDepartmentId,
  fetchOutputTypes,
  fetchProjectByDepartment,
  fetchDepartmentList
} from "../../actions/appActions";

import {
  fetchChart1,
  fetchChart2,
  fetchChart3,
  fetchChart4,
} from "../../actions/dashboardActions";

import { fetchIndicatorsByDeptId } from "../../actions/outputActions";

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
    var departmentId = accState.userInfo.acc[0]
      ? accState.userInfo.acc[0].DepartmentId
      : 0;
    dispatch(fetchKRAByDepartmentId(departmentId));
    dispatch(fetchOutputTypes());
    dispatch(fetchChart1());
    dispatch(fetchChart2());
    dispatch(fetchChart3());
    dispatch(fetchChart4());
    dispatch(fetchIndicatorsByDeptId(departmentId));
    dispatch(fetchProjectByDepartment(departmentId));
    dispatch(fetchDepartmentList());
    // eslint-disable-next-line
  }, []);
  const [totalPPACount, setTotalPPACount] = useState(0);
  useEffect(() => {
    setTotalPPACount(dashboardState.MonitoredPPA && Array.isArray(dashboardState.MonitoredPPA) && Array.isArray(dashboardState.MonitoredPPA.map(item => item.PPACount)) ? dashboardState.MonitoredPPA.map(item => item.PPACount).reduce((prev, cur) => prev + cur) : 0);
  }, [])
  
  const colors = ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'teal', 'cyan' ];
  const graph1Colors = [];
  const data1 = {
    labels: dashboardState.MonitoredPPA.map((r) => {
      return r.DepartmentName;
    }),
    datasets: [
      {
        label: "PAPs Monitored and Analyzed",
        data: dashboardState.MonitoredPPA.map((r) => {
          graph1Colors.push(colors[Math.floor(Math.random() * colors.length)])
          return r.PPACount;
        }),
        backgroundColor: graph1Colors,
        borderColor: graph1Colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
    },
  };

  const data = {
    labels: dashboardState.ConductedWithinTimeframe.map((r) => {
      return r.DepartmentName;
    }),
    datasets: [
      {
        label: "Major Output Rate",
        data: dashboardState.ConductedWithinTimeframe.map((r) => {
          return r.AverageAccomplishmentRateMajor;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Minor Output Rate",
        data: dashboardState.ConductedWithinTimeframe.map((r) => {
          return r.AverageAccomplishmentRateMinor;
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const data2 = {
    labels: ["ASD", "CLMD", "ESSD", "FD", "FTAD", "HRDD", "ORD", "PPRD", "QAD"],
    datasets: [
      {
        label: "Satisfactory Result",
        data: [12, 19, 3, 5, 2, 3, 6, 5, 2],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const BudgetUtilizationRateOptions = {
    plugins: {
      datalabels: {
        color: '#36A2EB'
      }
    }
  };
  const BudgetUtilizationRate = {
    labels: dashboardState.BudgetUtilizationRate.map((r) => {
      return r.DepartmentName;
    }),
    datasets: [
      {
        label: "Averate Utilization Rate (%)",
        fill: false,
        borderColor: "rgb(255, 255, 255)",
        backgroundColor: "rgba(255, 255, 255, 1)", 
        datalabels: {
          color: '#FFCE56'
        },
        data: dashboardState.BudgetUtilizationRate.map((r) => {
          return r.AverageUtilizationRate ? r.AverageUtilizationRate : 0;
        })
      },
    ],
  };

  const SatisfactoryResult = {
    labels: dashboardState.SatisfactoryResult.map((r) => {
      return r.DepartmentName;
    }),
    datasets: [
      {
        label: "Satisfactory Rate (%) - Physical",
        data: dashboardState.SatisfactoryResult.map((r) => {
          return r.AverageAccomplishmentRatePhysical
            ? r.AverageAccomplishmentRatePhysical
            : 0;
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Satisfactory Rate (%) - Financial",
        data: dashboardState.SatisfactoryResult.map((r) => {
          return r.AverageAccomplishmentRateFinancial
            ? r.AverageAccomplishmentRateFinancial
            : 0;
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
          style={{ textAlign: "center" }}
        >
          Number of PAPs Monitored and Analyzed
        </Typography>
        <Typography
          component="div"
          style={{
            display: "flex",
            justifyContent: "center",
            width: "50%",
            margin: "auto",
          }}
        >
          <Pie data={data1} />
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  const card2 = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
          style={{ textAlign: "center" }}
        >
          Satisfactory accountability result on Physical and Financial Target
        </Typography>
        <Typography variant="h5" component="div">
          <div style={{ width: "100%" }}>
            <Line options={options} data={SatisfactoryResult} />
          </div>
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  const card3 = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
          style={{ textAlign: "center" }}
        >
          PAPs conducted within the defined timeline
        </Typography>
        <Typography variant="h5" component="div">
          <div style={{ width: "100%" }}>
            <Line options={options} data={data} />
          </div>
        </Typography>
      </CardContent>
    </React.Fragment>
  );
  const card4 = (
    <React.Fragment>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
          style={{ textAlign: "center" }}
        >
          Budget Utilization Rate
        </Typography>
        <Line options={options} data={BudgetUtilizationRate} />
      </CardContent>
    </React.Fragment>
  );
  

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Physical and Financial Targets Dashboard</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">PPA Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div class="row">
            <div class="col-lg-3 col-6">
              <div class="small-box bg-info">
                <div class="inner">
                  <h3>{totalPPACount}</h3>
                  <p>Monitored PPA</p>
                </div>
                <div class="icon">
                  <i class="ion ion-bag"></i>
                </div>
                <a href="/outputmanagement/major" class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
          </div>
          <div class="row">
            <section class="col-lg-7 connectedSortable">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title">
                    <i class="fas fa-chart-pie mr-1"></i>
                    Monitored PPA per office
                  </h3>
                </div>
                <div class="card-body">
                  <div class="tab-content p-0">
                    <div class="chart tab-pane active" id="revenue-chart"
                      style={{ position: 'relative', display: 'flex' }}>
                      <div class="col-md-6">
                        <Pie data={data1} />
                      </div>
                      <div class="col-md-6">
                        <p class="text-center">
                          <strong>Offices</strong>
                        </p>
                        {
                          dashboardState.MonitoredPPA.map((item,i) => {
                            return (
                              <div class="progress-group">
                                {item.DepartmentName}
                                <span class="float-right">{item.PPACount}</span>
                                <div class="progress progress-sm">
                                  <div class={`progress-bar bg-${graph1Colors[i]}`} style={{ width: (item.PPACount / totalPPACount) * 100 + '%' }}></div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                    <div class="chart tab-pane" id="sales-chart" style={{ position: 'relative', height: 300 }}>
                      {/* <canvas id="sales-chart-canvas" height="300" style={{height:300}}></canvas> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="col-lg-5 connectedSortable">
              <div class="card bg-gradient-info">
                <div class="card-header border-0">
                  <h3 class="card-title">
                    <i class="fas fa-th mr-1"></i>
                    Budget Utilization Rate
                  </h3>
                  <div class="card-tools">
                    <button type="button" class="btn bg-info btn-sm" data-card-widget="collapse">
                      <i class="fas fa-minus"></i>
                    </button>
                    <button type="button" class="btn bg-info btn-sm" data-card-widget="remove">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <Line options={options} data={BudgetUtilizationRate} />
                </div>
              </div>
            </section>
          </div>
          <div class="row">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card variant="outlined">{card2}</Card>
              </Grid>
              <Grid item xs={6}>
                <Card variant="outlined">{card3}</Card>
              </Grid>
            </Grid>
          </div>
        </div>
      </div >
    </div>
  );
};
