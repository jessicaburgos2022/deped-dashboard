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
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";

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
  const currentYear = new Date().getFullYear();
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
    setTotalPPACount(dashboardState.MonitoredPPA && Array.isArray(dashboardState.MonitoredPPA) && Array.isArray(dashboardState.MonitoredPPA.map(item => item.PPACount)) && dashboardState.MonitoredPPA.map(item => item.PPACount).length > 0 ? dashboardState.MonitoredPPA.map(item => item.PPACount).reduce((prev, cur) => prev + cur) : 0);
  }, [dashboardState.MonitoredPPA])

  const colors = ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'cyan'];
  const graph1Colors = [];
  const data1 = {
    labels: dashboardState.MonitoredPPA.map((r) => {
      return r.DepartmentName;
    }),
    datasets: [
      {
        label: "PAPs Monitored and Analyzed",
        data: dashboardState.MonitoredPPA.map((r) => {
          var color = colors[Math.floor(Math.random() * colors.length)];
          while (graph1Colors.filter(c => c === color).length > 0) {
            color = colors[Math.floor(Math.random() * colors.length)];
          }
          graph1Colors.push(color)
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
  const BudgetUtilizationRate = {
    labels: dashboardState.BudgetUtilizationRate.map((r) => {
      return r.DepartmentName;
    }),
    datasets: [
      {
        label: "Utilization Rate",
        fill: false,
        data: dashboardState.BudgetUtilizationRate.map((r) => {
          return r.AverageUtilizationRate ? r.AverageUtilizationRate : 0;
        }),
        borderColor: "rgb(1,32,96)",
        backgroundColor: "rgb(255,192,0)",
      },
    ],
  };

  const SatisfactoryResult = {
    labels: dashboardState.SatisfactoryResult.map((r) => {
      return r.DepartmentName;
    }),
    datasets: [
      {
        label: "Satisfactory Rate - Physical",
        data: dashboardState.SatisfactoryResult.map((r) => {
          return r.AverageAccomplishmentRatePhysical
            ? r.AverageAccomplishmentRatePhysical
            : 0;
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Satisfactory Rate - Financial",
        data: dashboardState.SatisfactoryResult.map((r) => {
          return r.AverageAccomplishmentRateFinancial
            ? r.AverageAccomplishmentRateFinancial
            : 0;
        }),
        borderColor: "rgb(1,32,96)",
        backgroundColor: "rgb(255,192,0)",
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
          Satisfactory Accountability Result on Physical and Financial Target
        </Typography>
        <Typography variant="h5" component="div">
          <div style={{ width: "100%" }}>
            <Bar options={options} data={SatisfactoryResult} />
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
          PAPs Conducted Within The Defined Timeline
        </Typography>
        <Typography variant="h5" component="div">
          <div style={{ width: "100%" }}>
            <Bar options={options} data={data} />
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
        <Bar options={options} data={BudgetUtilizationRate} />
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
                <li className="breadcrumb-item active">Physical and Financial Targets Dashboard</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{totalPPACount}</h3>
                  <p>Approved PPAs</p>
                </div>
                <div className="icon">
                  <AccessibilityNewIcon />
                  <i className="ion ion-bag"></i>
                </div>
                <a href="/outputmanagement/major" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
          </div>
          <div className="row">
            <section className="col-lg-7 connectedSortable ui-sortable">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-chart-pie mr-1"></i>
                    Approved PPA
                  </h3>
                  <div class="card-tools">
                    <ul class="nav nav-pills ml-auto">
                      <li class="nav-item">
                        <a class="nav-link active" href="#revenue-chart" data-toggle="tab">{currentYear - 1}</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="#sales-chart" data-toggle="tab">{currentYear}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="tab-content p-0">
                    <div className="chart tab-pane active" id="revenue-chart"
                      style={{ position: 'relative', display: 'flex' }}>
                      <div className="col-md-5">
                        <Pie data={data1} />
                      </div>
                      <div className="col-md-7">
                        {
                          dashboardState.MonitoredPPA.map((item, i) => {
                            return (
                              <div className="progress-group" style={{ marginBottom: '0.1rem' }}>
                                {item.DepartmentName}
                                <span className="float-right">{item.PPACount}</span>
                                <div className="progress progress-sm">
                                  <div className={`progress-bar bg-${graph1Colors[i]} progress-bar-striped`} style={{ width: (item.PPACount / totalPPACount) * 100 + '%' }}></div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                    <div className="chart tab-pane" id="sales-chart" style={{ position: 'relative', height: 300 }}>
                      {/* <canvas id="sales-chart-canvas" height="300" style={{height:300}}></canvas> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="col-lg-5 connectedSortable">
              <div className="card">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    <i className="fas fa-th mr-1"></i>
                    Budget Utilization Rate
                  </h3>
                </div>
                <div className="card-body" style={{ height: 340 }}>
                  <div className="tab-content p-0">
                    <div className="chart tab-pane active" id="utilization-chart"
                      style={{ position: 'relative', display: 'flex' }}>
                      <div className="col-md-12">
                        <Bar options={options} data={BudgetUtilizationRate} />
                      </div>
                    </div>

                    <div className="chart tab-pane" id="sales-chart" style={{ position: 'relative', height: 300 }}>
                      {/* <canvas id="sales-chart-canvas" height="300" style={{height:300}}></canvas> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="col-lg-6 connectedSortable">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-chart-pie mr-1"></i>
                    Satisfactory Accountability Result on Physical and Financial Target
                  </h3>
                </div>
                <div className="card-body">
                  <div className="tab-content p-0">
                    <div className="chart tab-pane active" id="revenue-chart"
                      style={{ position: 'relative', display: 'flex' }}>
                      <div className="col-md-12">
                        <Bar options={options} data={SatisfactoryResult} />
                      </div>
                    </div>
                    <div className="chart tab-pane" id="sales-chart" style={{ position: 'relative', height: 300 }}>
                      {/* <canvas id="sales-chart-canvas" height="300" style={{height:300}}></canvas> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="col-lg-6 connectedSortable">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-chart-pie mr-1"></i>
                    PPAs Conducted Within The Defined Timeline
                  </h3>
                </div>
                <div className="card-body">
                  <div className="tab-content p-0">
                    <div className="chart tab-pane active" id="revenue-chart"
                      style={{ position: 'relative', display: 'flex' }}>
                      <div className="col-md-12">
                        <Bar options={options} data={data} />
                      </div>
                    </div>
                    <div className="chart tab-pane" id="sales-chart" style={{ position: 'relative', height: 300 }}>
                      {/* <canvas id="sales-chart-canvas" height="300" style={{height:300}}></canvas> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div >
    </div>
  );
};
