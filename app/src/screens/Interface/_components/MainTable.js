import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

//Sub Modules
import BapiInformation from "./BAPIInformation";
import RelatedTickets from "./RelatedTickets";
import SVNRevisions from "./SVNRevisions";
import ErrorModule from "./Errors";
import Performance from "./Performance";
import ActionBar from "./ActionBar";

import {
  deleteInterface,
  searchInterface,
} from "../../../actions/interfaceActions";

import {
  Avatar,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import CustomPagination from "./CustomPagination";
import EditInterface from "./EditInterface";
import { Fragment } from "react";
import moment from "moment";
import swal from "sweetalert";
import { Skeleton } from "@material-ui/lab";
import TableLoadingSkeleton from "./TableLoadingSkeleton";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
function ChildRowMenu(props) {
  const { selectedModule } = props;
  const [selected, setSelected] = useState(1);
  const handleOnListClick = (item) => {
    selectedModule(item);
    setSelected(item);
  };
  return (
    <List component="nav" style={{ paddingTop: 0 }}>
      <ListItem
        button
        selected={selected === 1 ? true : false}
        onClick={() => handleOnListClick(1)}
        className="interface-table-list-menu-item"
      >
        <ListItemAvatar>
          <Avatar>
            <ViewModuleIcon
              color={selected === 1 ? "primary" : "action"}
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="SAP BAPI" secondary="Parameters" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem
        button
        selected={selected === 2 ? true : false}
        onClick={() => handleOnListClick(2)}
        className="interface-table-list-menu-item"
      >
        <ListItemAvatar>
          <Avatar>
            <ConfirmationNumberIcon
              color={selected === 2 ? "primary" : "action"}
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Related Tickets"
          secondary="ALM/eZSupport Ticket"
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem
        button
        selected={selected === 3 ? true : false}
        onClick={() => handleOnListClick(3)}
        className="interface-table-list-menu-item"
      >
        <ListItemAvatar>
          <Avatar>
            <AccountTreeIcon
              color={selected === 3 ? "primary" : "action"}
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Subversion" secondary="Revision Information" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem
        button
        selected={selected === 4 ? true : false}
        onClick={() => handleOnListClick(4)}
        className="interface-table-list-menu-item"
      >
        <ListItemAvatar>
          <Avatar>
            <ErrorOutlineIcon
              color={selected === 4 ? "primary" : "action"}
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Errors" secondary="Interface Exceptions" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem
        button
        selected={selected === 5 ? true : false}
        onClick={() => handleOnListClick(5)}
        className="interface-table-list-menu-item"
      >
        <ListItemAvatar>
          <Avatar>
            <DataUsageIcon
              color={selected === 5 ? "primary" : "action"}
            />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Performance Analysis" />
      </ListItem>
    </List>
  );
}
function ChildRow(props) {
  const { data } = props;
  const [subModule, setSubModule] = useState(props.subModule > 0 ? props.subModule : 1);
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={2}>
          <ChildRowMenu selectedModule={(mod) => setSubModule(mod)} />
        </Grid>
        <Grid
          item
          xs={10}
          style={{
            borderLeft: "solid 1px #f2f2f2",
            borderTop: "solid 1px #f2f2f2",
          }}
        >
          <Box
            paddingLeft={3}
            paddingRight={3}
            paddingBottom={3}
            overflow="auto"
            maxHeight="50vh"
          >
            {subModule === 1 && (
              <BapiInformation
                serviceName={data.interface_name}
                serviceId={data.id}
              />
            )}

            {subModule === 2 && <RelatedTickets interfaceName={data.interface_name} interfaceId={data.id} />}

            {subModule === 3 && (
              <SVNRevisions url={data.svn_path} service={data.interface_name} />
            )}

            {subModule === 4 && <ErrorModule />}

            {subModule === 5 && <Performance />}
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

function Row(props) {
  const dispatch = useDispatch();
  const userState = useSelector((s) => s.user);
  const classes = useRowStyles();
  const [selectedIdForEdit, setSelectedIdForEdit] = useState(0);
  const [isEditOpen, setEditOpen] = useState(false);
  const { row, setSelected, subModule } = props;
  const [open, setOpen] = React.useState(false);
  const deleteHandler = async (interfaceId) => {
    swal({
      title: "Do you want to delete the interface?",
      text: "Once deleted, this will not be recoverable",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (r) => {
      if (r) {
        var ret = await dispatch(
          deleteInterface({
            InterfaceId: interfaceId,
            UserId: userState.userInfo.user_id,
          })
        );
        swal(
          ret.Message.split("|")[0],
          ret.Message.split("|")[1],
          ret.Message.split("|")[0] === "Success" ? "success" : "error"
        );

        dispatch(
          searchInterface({
            BusinessUnit: "",
            ObjectId: "",
            InterfaceId: "",
            InterfaceName: "",
          })
        );
      }
    });
  };
  return (
    <React.Fragment>
      {isEditOpen && selectedIdForEdit !== 0 && (
        <EditInterface
          interfaceId={selectedIdForEdit}
          open={isEditOpen}
          handleClose={() => setEditOpen(false)}
        />
      )}
      <TableRow
        className={classes.root}
        style={{ backgroundColor: row.isActive ? "#fff" : "#f0f0f0" }}
        onClick={() => setSelected(row.id)}
      >
        <TableCell component="th" className="interface-table-cell">
          <Checkbox></Checkbox>
          {/* <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton> */}
        </TableCell>
        <TableCell component="th" className="interface-table-cell">
          {row.businessunit_name}
        </TableCell>
        <TableCell component="th" className="interface-table-cell">
          <b>{row.interface_id}</b>
        </TableCell>
        <TableCell component="th" className="interface-table-cell">
          {row.interface_name}
        </TableCell>
        <TableCell component="th" className="interface-table-cell">
          <IconButton
            size="small"
            onClick={() => {
              setSelectedIdForEdit(row.id);
              setEditOpen(true);
            }}
          >
            <EditIcon color="primary" />
          </IconButton>
          <IconButton size="small" onClick={() => deleteHandler(row.id)}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </TableCell>
      </TableRow>
      {/* <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>{<ChildRow data={row} subModule={subModule} />}</Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}
export default function CollapsibleTable() {
  const interfaceState = useSelector((state) => state.interfaceReducer);
  const [perPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(0);
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [selectedInterfaceId, setSelectedInterface] = useState(0);
  const [activeSubModule, setActiveSubModule] = useState(0);
  const currentData = interfaceState.interfaces
    .filter((r) => (r.isActive === 1 && showOnlyActive) || !showOnlyActive)
    .slice(currentPage * perPage, currentPage * perPage + perPage);

  // change page
  const paginate = (e, pageNumber) => {
    setCurrentPage(pageNumber - 1);
  };

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div>
          {selectedInterfaceId !== 0 && (
            <ActionBar interfaceId={selectedInterfaceId} setActiveSubModule={setActiveSubModule}/>
          )}
        </div>
        <div>
          <FormControlLabel
            control={
              <Checkbox
                name="checkedB"
                color="primary"
                checked={showOnlyActive}
                onChange={(e) => {
                  setShowOnlyActive(e.target.checked);
                  setCurrentPage(0);
                }}
              />
            }
            label="Show Active Interfaces Only"
          />
        </div>
      </div>

      <TableContainer component={Paper}>
      <Table aria-label="collapsible table" className='table table-bordered'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell className="interface-table-header">Market</TableCell>
              <TableCell className="interface-table-header">
                Interface Name
              </TableCell>
              <TableCell className="interface-table-header">
                Description
              </TableCell>
              <TableCell className="interface-table-header">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interfaceState.tableLoading && (
              <TableRow>
                <TableCell colSpan={7}>
                  <TableLoadingSkeleton row={perPage} />
                </TableCell>
              </TableRow>
            )}
            {!interfaceState.tableLoading &&
              currentData.map((row, e) => (
                <Row key={e} row={row} setSelected={setSelectedInterface} subModule = {activeSubModule}/>
              ))}
          </TableBody>
        </Table>
        <CustomPagination
          perPage={perPage}
          total={
            interfaceState.interfaces.filter(
              (r) => (r.isActive === 1 && showOnlyActive) || !showOnlyActive
            ).length
          }
          paginate={paginate}
          currentPage={currentPage + 1}
        />
      </TableContainer>
    </Fragment>
  );
}
