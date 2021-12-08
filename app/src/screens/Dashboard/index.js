import {
  Container,
  Box,
  Link,
  Paper,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import { Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBUDeployments, getMostDeployed } from "../../actions/appActions";
import RelatedTickets from "../Interface/_components/RelatedTickets";
import CommonModal from "../../components/CommonModal";
import "./styles.css";
export default () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.app);
  const [mostDeployedPageSize, setmostDeployedPageSize] = useState(10);
  const [isInterfaceOpen, setOpen] = useState(false);
  const [selectedInterface, setSelectedInterface] = useState("");
  const hex2rgba = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  };
  var data = {
    datasets: [
      {
        data: state.marketDeployments.map((r) => r.deployment_count),
        backgroundColor: state.marketDeployments.map((r) => {
          return hex2rgba(
            `'#${Math.floor(Math.random() * 1677721512).toString(16)}`
          );
        }),
      },
    ],
    labels: state.marketDeployments.map((r) => r.market),
  };

  // useEffect(() => {
  //   dispatch(getBUDeployments());
  //   dispatch(getMostDeployed(mostDeployedPageSize));
  //   // eslint-disable-next-line
  // }, []);

  const handleMostDeployedPageSize = (ps) => {
    dispatch(getMostDeployed(ps));
    setmostDeployedPageSize(ps);
  };

  const handleInterfaceClick = (service) => {
    setSelectedInterface(service);
    setOpen(true);
  }

  return (
    <div>
      <div className="text">Dashboard</div>
      <div style={{ display: 'flex' }}>
        <Paper style={{ display: 'flex', marginTop: '25px', marginLeft: 25, maxHeight: '90vh', overflowY: 'auto' }}>
          <div style={{ margin: 5 }}>
            <Container style={{ padding: 5, margin: 5 }}>
              <h4>Most Deployed Services</h4>
            </Container>
            <Divider />
            <div style={{display:'flex', justifyContent:'end', lineHeight:'32px'}}>
              Showing:{" "}
              <Select
                value={mostDeployedPageSize}
                onChange={(e) => handleMostDeployedPageSize(e.target.value)}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={40}>40</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </div>
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
              }}
            >
              {state.mostDeployed &&
                Array.isArray(state.mostDeployed) &&
                state.mostDeployed.map((r) => {
                  return (
                    <div style={{ cursor: 'pointer' }} onClick={() => handleInterfaceClick(r.interface_name)}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <span className="badge badge-light" style={{padding:10}}>
                            {r.deployment_count}
                            <br />
                            <span style={{ fontSize: 9 }}>
                              {r.deployment_count > 1 ? 'Deployments' : 'Deployment'}
                            </span>
                          </span>
                        </ListItemAvatar>
                        <ListItemText primary={r.interface_name}
                          secondary={<React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              Recent Change: {r.reference_id}{" "}
                              {r.reference_no}
                            </Typography>
                          </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </div>
                  );
                })}
            </List>
          </div>
        </Paper>
        <Paper style={{ marginTop: '25px', marginLeft: '25px', height: '100%', padding: '5px 5px 20px 5px' }}>
          <Container style={{ padding: 5, margin: 5 }}>
            <h4>Deployed Services per Market</h4>
          </Container>
          <Divider />
          <Pie
            data={data}
            height={300}
            width={300}
            redraw={false}
            options={{ maintainAspectRatio: true }}
          />
        </Paper>
      </div>

      {setOpen && selectedInterface && (
        <CommonModal
          open={isInterfaceOpen > 0}
          handleClose={() => setOpen(0)}
          dialogTitle={
            selectedInterface + " - Related Tickets"
          }
          dialogContent={
            <RelatedTickets interfaceName={selectedInterface} interfaceId={state.mostDeployed.find(r => r.interface_name === selectedInterface).id}/>

          }
        />
      )}
    </div>
  );
};
