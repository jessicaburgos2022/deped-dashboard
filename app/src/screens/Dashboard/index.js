import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.css";
import exportFromJSON, { ExportType } from 'export-from-json'
import { ReactComponent as ExcelSvg } from '../../media/svg/excel-svgrepo-com.svg'
import { ReactComponent as PDFSvg } from '../../media/svg/pdf-svgrepo-com.svg'
import { Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core";
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

import { Bar, Pie } from "react-chartjs-2";

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
  const [totalPPACount, setTotalPPACount] = useState(0);
  const [Chart1ActiveYear, setChart1ActiveYear] = useState(currentYear);
  const [Chart2ActiveYear, setChart2ActiveYear] = useState(currentYear);
  const [Chart3ActiveYear, setChart3ActiveYear] = useState(currentYear);
  const [Chart4ActiveYear, setChart4ActiveYear] = useState(currentYear);
  const [Chart1ActiveQuarter, setChart1ActiveQuarter] = useState(1);
  const [Chart2ActiveQuarter, setChart2ActiveQuarter] = useState(1);
  const [Chart3ActiveQuarter, setChart3ActiveQuarter] = useState(1);
  const [Chart4ActiveQuarter, setChart4ActiveQuarter] = useState(1);


  useEffect(() => {
    var departmentId = accState.userInfo.acc[0]
      ? accState.userInfo.acc[0].DepartmentId
      : 0;
    dispatch(fetchKRAByDepartmentId(departmentId));
    dispatch(fetchOutputTypes());
    dispatch(fetchChart1(currentYear, Chart1ActiveQuarter));
    dispatch(fetchChart2(currentYear, Chart2ActiveQuarter));
    dispatch(fetchChart3(currentYear, Chart3ActiveQuarter));
    dispatch(fetchChart4(currentYear, Chart4ActiveQuarter));
    dispatch(fetchIndicatorsByDeptId(departmentId));
    dispatch(fetchProjectByDepartment(departmentId));
    dispatch(fetchDepartmentList());
    // eslint-disable-next-line
  }, []);


  useEffect(() => {
    setTotalPPACount(dashboardState.MonitoredPPA && Array.isArray(dashboardState.MonitoredPPA) && Array.isArray(dashboardState.MonitoredPPA.map(item => item.PPACount)) && dashboardState.MonitoredPPA.map(item => item.PPACount).length > 0 ? dashboardState.MonitoredPPA.map(item => item.PPACount).reduce((prev, cur) => prev + cur) : 0);
  }, [dashboardState.MonitoredPPA])

  const chart1YearOnChange = (year) => {
    setChart1ActiveYear(year);
    dispatch(fetchChart1(year, Chart1ActiveQuarter));
  }

  const chart2YearOnChange = (year) => {
    setChart2ActiveYear(year);
    dispatch(fetchChart4(year, Chart2ActiveQuarter));
  }

  const chart3YearOnChange = (year) => {
    setChart3ActiveYear(year);
    dispatch(fetchChart2(year, Chart3ActiveQuarter));
  }

  const chart4YearOnChange = (year) => {
    setChart4ActiveYear(year);
    dispatch(fetchChart3(year, Chart4ActiveQuarter));
  }

  const chart1QuarterOnChange = (quarter) => {
    setChart1ActiveQuarter(quarter);
    dispatch(fetchChart1(Chart1ActiveYear, quarter));
  }

  const chart2QuarterOnChange = (quarter) => {
    setChart2ActiveQuarter(quarter);
    dispatch(fetchChart4(Chart2ActiveYear, quarter));
  }

  const chart3QuarterOnChange = (quarter) => {
    setChart3ActiveQuarter(quarter);
    dispatch(fetchChart2(Chart3ActiveYear, quarter));
  }

  const chart4QuarterOnChange = (quarter) => {
    setChart4ActiveQuarter(quarter);
    dispatch(fetchChart3(Chart4ActiveYear, quarter));
  }


  const colors = ['blue', 'indigo', 'purple', 'pink', 'red', 'orange', 'yellow', 'green', 'cyan'];
  const graph1Colors = [];
  const data1 = {
    labels: dashboardState.MonitoredPPA && Array.isArray(dashboardState.MonitoredPPA) ? dashboardState.MonitoredPPA.map((r) => {
      return r.DepartmentName;
    }) : [],
    datasets: [
      {
        label: "PAPs Monitored and Analyzed",
        data: dashboardState.MonitoredPPA && Array.isArray(dashboardState.MonitoredPPA) ? dashboardState.MonitoredPPA.map((r) => {
          var color = colors[Math.floor(Math.random() * colors.length)];
          while (graph1Colors.filter(c => c === color).length > 0) {
            color = colors[Math.floor(Math.random() * colors.length)];
          }
          graph1Colors.push(color)
          return r.PPACount;
        }) : [],
        backgroundColor: graph1Colors,
        borderColor: graph1Colors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
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
        label: "Other Output Rate",
        data: dashboardState.ConductedWithinTimeframe.map((r) => {
          return r.AverageAccomplishmentRateMinor;
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const footer = (tooltipItems) => {
    return 'Total Amount Utilized (Php): ' + dashboardState.BudgetUtilizationRate.find(ur => ur.DepartmentName === tooltipItems[0].label).TotalAmountUtilized;
  };
  const BudgetUtilizationRateOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        callbacks: {
          footer: footer,
        }
      }
    },
  }));
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
        options: {
          interaction: {
            intersect: false,
            mode: 'index',
          },
          plugins: {
            tooltip: {
              callbacks: {
                footer: footer,
              }
            }
          }
        },
        borderColor: "rgb(1,32,96)",
        backgroundColor: "rgb(255,192,0)",
      },
    ],
  };

  const SatisfactoryResult = {
    labels: dashboardState.SatisfactoryResult  && Array.isArray(dashboardState.SatisfactoryResult) && dashboardState.SatisfactoryResult.map((r) => {
      return r.DepartmentName;
    }),
    datasets: [
      {
        label: "Satisfactory Rate - Physical",
        data: dashboardState.SatisfactoryResult  && Array.isArray(dashboardState.SatisfactoryResult) && dashboardState.SatisfactoryResult.map((r) => {
          return r.AverageAccomplishmentRatePhysical
            ? r.AverageAccomplishmentRatePhysical
            : 0;
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Satisfactory Rate - Financial",
        data: dashboardState.SatisfactoryResult  && Array.isArray(dashboardState.SatisfactoryResult) && dashboardState.SatisfactoryResult.map((r) => {
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
                <a href="/outputmajor" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
              </div>
            </div>
          </div>
          <div className="row">
            <section className="col-lg-6 connectedSortable ui-sortable">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                    <i className="fas fa-chart-pie mr-1"></i>
                    Approved PPAs
                  </h3>
                  <div class="card-tools">
                    <ul class="nav nav-pills ml-auto">
                      <li class="nav-item c-pointer pr-5">
                        <ExcelSvg onClick={() => exportFromJSON({ data: dashboardState.MonitoredPPA, fileName: 'Approved PPAs', exportType: 'xls' })} style={{ height: 30 }} />
                      </li>
                      <li class="nav-item c-pointer">
                        <a class={`nav-link ${Chart1ActiveYear === currentYear ? 'active' : ''}`} onClick={() => chart1YearOnChange(currentYear)}>{currentYear}</a>
                      </li>
                      <li class="nav-item c-pointer">
                        <a class={`nav-link ${Chart1ActiveYear === currentYear - 1 ? 'active' : ''}`} onClick={() => chart1YearOnChange(currentYear - 1)}>{currentYear - 1}</a>
                      </li>
                      <li class="nav-item c-pointer">
                        <FormControl variant="standard" className="w-100">
                          <Select
                            fullWidth
                            label="Quarter"
                            name="selectedQuarter"
                            onChange={(e) => chart1QuarterOnChange(e.target.value)}
                            value={Chart1ActiveQuarter}
                          >
                            <MenuItem value={1}>Quarter 1</MenuItem>
                            <MenuItem value={2}>Quarter 2</MenuItem>
                            <MenuItem value={3}>Quarter 3</MenuItem>
                            <MenuItem value={4}>Quarter 4</MenuItem>
                          </Select>
                        </FormControl>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="tab-content p-0">
                    <div className="chart tab-pane active" id="revenue-chart"
                      style={{ position: 'relative', display: 'flex' }}>
                      <div className="col-md-7">
                        <Pie data={data1} options={options} />
                      </div>
                      <div className="col-md-5">
                        {
                          dashboardState.MonitoredPPA && Array.isArray(dashboardState.MonitoredPPA) && dashboardState.MonitoredPPA.map((item, i) => {
                            return (
                              <div className="progress-group" style={{ marginBottom: '0.1rem' }}>
                                {item.DepartmentName}
                                <span className="float-right text-muted"> | {Math.round(((item.PPACount / totalPPACount) * 100) * 100) / 100 ? Math.round(((item.PPACount / totalPPACount) * 100) * 100) / 100 : 0}%</span>
                                <span className="float-right">{item.PPACount}&nbsp;</span>
                                <div className="progress progress-sm">
                                  <div className={`progress-bar bg-${graph1Colors[i]} progress-bar-striped`} style={{ width: (item.PPACount / totalPPACount) * 100 + '%' }}></div>
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                    <div className="chart tab-pane" id="sales-chart" style={{ position: 'relative', display: 'flex' }}>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="col-lg-6 connectedSortable ui-sortable">
              <div className="card">
                <div className="card-header border-0">
                  <h3 className="card-title">
                    <i className="fas fa-th mr-1"></i>
                    Budget Utilization Rate
                  </h3>
                  <div class="card-tools">
                    <ul class="nav nav-pills ml-auto">
                      <li class="nav-item c-pointer pr-5">
                        <ExcelSvg onClick={() => exportFromJSON({ data: dashboardState.BudgetUtilizationRate, fileName: 'Budget Utilization Rate', exportType: 'xls' })} style={{ height: 30 }} />
                      </li>
                      <li class="nav-item c-pointer">
                        <a class={`nav-link ${Chart2ActiveYear === currentYear ? 'active' : ''}`} onClick={() => chart2YearOnChange(currentYear)}>{currentYear}</a>
                      </li>
                      <li class="nav-item c-pointer">
                        <a class={`nav-link ${Chart2ActiveYear === currentYear - 1 ? 'active' : ''}`} onClick={() => chart2YearOnChange(currentYear - 1)}>{currentYear - 1}</a>
                      </li>
                      <li class="nav-item c-pointer">
                        <FormControl variant="standard" className="w-100">
                          <Select
                            fullWidth
                            label="Quarter"
                            name="selectedQuarter"
                            onChange={(e) => chart2QuarterOnChange(e.target.value)}
                            value={Chart2ActiveQuarter}
                          >
                            <MenuItem value={0}>Annual</MenuItem>
                            <MenuItem value={1}>Quarter 1</MenuItem>
                            <MenuItem value={2}>Quarter 2</MenuItem>
                            <MenuItem value={3}>Quarter 3</MenuItem>
                            <MenuItem value={4}>Quarter 4</MenuItem>
                          </Select>
                        </FormControl>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body">
                  <div className="tab-content p-0">
                    <div className="chart tab-pane active" id="utilization-chart"
                      style={{ position: 'relative', display: 'flex' }}>
                      <div className="col-md-12">
                        <Bar options={{ ...BudgetUtilizationRateOptions }} data={BudgetUtilizationRate} />
                      </div>
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
                  <div class="card-tools">
                    <ul class="nav nav-pills ml-auto">
                      <li class="nav-item c-pointer pr-5">
                        <ExcelSvg onClick={() => exportFromJSON({ data: dashboardState.SatisfactoryResult, fileName: 'Satisfactory Accountability Result on Targets', exportType: 'xls' })} style={{ height: 30 }} />
                      </li>
                      <li class="nav-item c-pointer">
                        <a class={`nav-link ${Chart3ActiveYear === currentYear ? 'active' : ''}`} onClick={() => chart3YearOnChange(currentYear)}>{currentYear}</a>
                      </li>
                      <li class="nav-item c-pointer">
                        <a class={`nav-link ${Chart3ActiveYear === currentYear - 1 ? 'active' : ''}`} onClick={() => chart3YearOnChange(currentYear - 1)}>{currentYear - 1}</a>
                      </li>
                      <li class="nav-item c-pointer">
                        <FormControl variant="standard" className="w-100">
                          <Select
                            fullWidth
                            label="Quarter"
                            name="selectedQuarter"
                            onChange={(e) => chart3QuarterOnChange(e.target.value)}
                            value={Chart3ActiveQuarter}
                          >
                            <MenuItem value={0}>Annual</MenuItem>
                            <MenuItem value={1}>Quarter 1</MenuItem>
                            <MenuItem value={2}>Quarter 2</MenuItem>
                            <MenuItem value={3}>Quarter 3</MenuItem>
                            <MenuItem value={4}>Quarter 4</MenuItem>
                          </Select>
                        </FormControl>
                      </li>
                    </ul>
                  </div>
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
                  <div class="card-tools">
                    <ul class="nav nav-pills ml-auto">
                      <li class="nav-item c-pointer pr-5">
                        <ExcelSvg onClick={() => exportFromJSON({ data: dashboardState.ConductedWithinTimeframe, fileName: 'PPAs Conducted within the defined timeline', exportType: 'xls' })} style={{ height: 30 }} />
                      </li>
                      <li class="nav-item c-pointer">
                        <a class={`nav-link ${Chart4ActiveYear === currentYear ? 'active' : ''}`} onClick={() => chart4YearOnChange(currentYear)}>{currentYear}</a>
                      </li>
                      <li class="nav-item c-pointer">
                        <a class={`nav-link ${Chart4ActiveYear === currentYear - 1 ? 'active' : ''}`} onClick={() => chart4YearOnChange(currentYear - 1)}>{currentYear - 1}</a>
                      </li>
                      <li class="nav-item c-pointer">
                        <FormControl variant="standard" className="w-100">
                          <Select
                            fullWidth
                            label="Quarter"
                            name="selectedQuarter"
                            onChange={(e) => chart4QuarterOnChange(e.target.value)}
                            value={Chart4ActiveQuarter}
                          >
                            <MenuItem value={0}>Annual</MenuItem>
                            <MenuItem value={1}>Quarter 1</MenuItem>
                            <MenuItem value={2}>Quarter 2</MenuItem>
                            <MenuItem value={3}>Quarter 3</MenuItem>
                            <MenuItem value={4}>Quarter 4</MenuItem>
                          </Select>
                        </FormControl>
                      </li>
                    </ul>
                  </div>
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
