import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector } from "react-redux";
import { useState } from "react";
import ActionBar from "./ActionBar";
import { Box, Checkbox, Container, FormControlLabel, Paper } from "@material-ui/core";
import CommonModal from "../../../components/CommonModal";
import BAPIInformation from "./BAPIInformation";
import RelatedTickets from "./RelatedTickets";
import SVNRevisions from "./SVNRevisions";
import ErrorModule from "./Errors";
import Performance from "./Performance";
import { Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '& .super-app-theme--cell': {
      fontSize: 12,
      whiteSpace: 'normal',
      overflow:'auto',
    },
    '& .super-app-theme--header': {
      fontSize: 12
    }
  },
});
const columns = [
  {
    field: "id",
    headerName: "id",
    hide: true,
  },
  {
    field: "businessunit_name",
    headerName: "Market",
    flex: 0.1,
    minWidth: 130,
    cellClassName: "super-app-theme--cell",
    headerClassName: "super-app-theme--header",
    hide: true,
  },
  {
    field: "interface_id",
    headerName: "Interface Name",
    flex: 0.2,
    minWidth: 250,
    cellClassName: "super-app-theme--cell",
    headerClassName: "super-app-theme--header"
  },
  {
    field: "interface_name",
    headerName: "Interface Description",
    flex: 0.8,
    cellClassName: "super-app-theme--cell",
    headerClassName: "super-app-theme--header"
  },
];

export default function DataTable() {
  const classes = useStyles();
  const interfaceState = useSelector((state) => state.interfaceReducer);
  const [perPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(0);
  const [showOnlyActive, setShowOnlyActive] = useState(false);
  const [selectedInterfaceId, setSelectedInterface] = useState([]);
  const [activeSubModule, setActiveSubModule] = useState(0);
  const currentData = interfaceState.interfaces
    .filter((r) => (r.isActive === 1 && showOnlyActive) || !showOnlyActive)
    .slice(currentPage * perPage, currentPage * perPage + perPage);
  const getInterfaceDetails = (id) => {
    return interfaceState.interfaces.find((r) => r.id === id);
  };

  return (
    <div style={{ width: "100%", background: "#fff" }} className={classes.root}>
      <Paper
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
      >
        <Box style={{padding:3}}>
          <ActionBar
            setActiveSubModule={(e) => setActiveSubModule(e)}
            selectedInterfaces={selectedInterfaceId}
          />
        </Box>
        {/* <div>
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
        </div> */}
      </Paper>
      <DataGrid
        autoHeight
        rowHeight={40}
        loading={interfaceState.tableLoading}
        rows={!interfaceState.tableLoading ? interfaceState.interfaces : []}
        columns={columns}
        pageSize={perPage}
        checkboxSelection
        hideFooterSelectedRowCount
        onSelectionModelChange={(s) => setSelectedInterface(s)}
      />
      {activeSubModule > 0 && (
        <CommonModal
          open={activeSubModule > 0}
          handleClose={() => setActiveSubModule(0)}
          dialogTitle={
            activeSubModule === 1
              ? "SAP BAPI Parameter"
              : activeSubModule === 2
              ? getInterfaceDetails(selectedInterfaceId[0]).interface_id +
                " - Related Tickets"
              : activeSubModule === 3
              ? getInterfaceDetails(selectedInterfaceId[0]).interface_id +
                " - SVN Revisions"
              : activeSubModule === 4
              ? getInterfaceDetails(selectedInterfaceId[0]).interface_id +
                " - Errors"
              : activeSubModule === 5
              ? getInterfaceDetails(selectedInterfaceId[0]).interface_id +
                " - Performance Analysis"
              : ""
          }
          dialogContent={
            activeSubModule === 1 ? (
              <BAPIInformation
                serviceId={selectedInterfaceId}
              />
            ) : activeSubModule === 2 ? (
              <RelatedTickets interfaceName = {getInterfaceDetails(selectedInterfaceId[0]).interface_id} interfaceId = {getInterfaceDetails(selectedInterfaceId[0]).id} />
            ) : activeSubModule === 3 ? (
              <SVNRevisions
                url={getInterfaceDetails(selectedInterfaceId[0]).svn_path}
                service={
                  getInterfaceDetails(selectedInterfaceId[0]).interface_id
                }
              />
            ) : activeSubModule === 4 ? (
              <ErrorModule />
            ) : activeSubModule === 5 ? (
              <Performance />
            ) : (
              <Fragment />
            )
          }
        />
      )}
    </div>
  );
}
