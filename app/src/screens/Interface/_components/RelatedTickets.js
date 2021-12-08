import { Button, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Create from "./RelatedTickets_New";
import { getTicketByInterface } from "../../../actions/ticketActions";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    '& .super-app-theme--cell': {
      fontSize: 12,
      whiteSpace: 'normal',
      overflow: 'auto',
      lineHeight: '20px!important'
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
    field: "reference_id",
    headerName: "Type",
    flex: .5,
    cellClassName: "super-app-theme--cell",
    headerClassName: "super-app-theme--header"
  },
  {
    field: "reference_no",
    headerName: "Ref. No.",
    flex: .5,
    cellClassName: "super-app-theme--cell",
    headerClassName: "super-app-theme--header"
  },
  {
    field: "interface_name",
    headerName: "Interface Name",
    flex: 1,
    cellClassName: "super-app-theme--cell",
    headerClassName: "super-app-theme--header"
  },
  {
    field: "dev_name",
    headerName: "Developer",
    flex: 0.6,
    cellClassName: "super-app-theme--cell",
    headerClassName: "super-app-theme--header"
  },
  {
    field: "remarks",
    headerName: "Remarks",
    flex: 1,
    cellClassName: "super-app-theme--cell",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <div dangerouslySetInnerHTML={{ __html: params.value }} />
    ),
  },
  {
    field: "error_issue",
    headerName: "Error/Issue",
    flex: 0.8,
    cellClassName: "super-app-theme--cell",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <div dangerouslySetInnerHTML={{ __html: params.value }} />
    ),
  },
  {
    field: "rootcause",
    headerName: "Root Cause",
    flex: 0.8,
    cellClassName: "super-app-theme--cell",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <div dangerouslySetInnerHTML={{ __html: params.value }} />
    ),
  },
  {
    field: "fix",
    headerName: "Fix",
    flex: 0.8,
    cellClassName: "super-app-theme--cell",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <div dangerouslySetInnerHTML={{ __html: params.value }} />
    ),
  },
  {
    field: "related_ticket",
    headerName: "Related Ticket",
    flex: 0.8,
    cellClassName: "super-app-theme--cell",
    headerClassName: "super-app-theme--header",
    renderCell: (params) => (
      <div dangerouslySetInnerHTML={{ __html: params.value }} />
    ),
  }
];

function DataTable(interface_name) {
  const classes = useStyles();
  const ticketState = useSelector((state) => state.tickets);
  const [pageSize] = useState(5);
  return (
    <div style={{ width: "100%" }} className={classes.root}>
      <DataGrid
        autoHeight
        rowHeight={50}
        rows={ticketState.interfaceTickets && ticketState.interfaceTickets.find((r) => (r.interface === interface_name)) && ticketState.interfaceTickets.find((r) => (r.interface === interface_name)).data ? ticketState.interfaceTickets.find((r) => (r.interface === interface_name)).data : []}
        columns={columns}
        pageSize={pageSize}
        hideFooterSelectedRowCount
      />
    </div>
  );
}
export default (props) => {
  const { interfaceName, interfaceId } = props;
  const [createIsOpen, setCreateOpen] = useState(false);
  const dispatch = useDispatch();
  const ticketState = useSelector((state) => state.tickets);
  async function reload() {
    await dispatch(getTicketByInterface(interfaceName));
  }
  useEffect(() => {
    async function fetchData() {
      await dispatch(getTicketByInterface(interfaceName));
    }
    if (
      !ticketState.interfaceTickets ||
      (ticketState.interfaceTickets &&
        !ticketState.interfaceTickets.find((r) => r.interface === interfaceName))
    ) {
      fetchData();
    }
  }, [dispatch, interfaceName, ticketState.interfaceTickets]);
  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: 'space-between' }}>
        <Button variant='contained' color="primary" onClick={() => reload()}>Reload</Button>
        <IconButton size="small" onClick={() => setCreateOpen(true)}>
          <AddCircleOutlineIcon color="primary" />
        </IconButton>
      </div>
      <div>
        {DataTable(interfaceName)}
      </div>
      {interfaceId && createIsOpen && (
        <Create open={createIsOpen} handleClose={() => setCreateOpen(false)} interfaceId={interfaceId} />
      )}
    </React.Fragment>
  );
};
