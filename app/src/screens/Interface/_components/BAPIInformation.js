import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import ReactExport from "react-export-excel";
import Swal from "sweetalert2";

//
import Create from "./BAPIInformation_New";

import { getBapiByInterface } from "../../../actions/interfaceActions";

export default (props) => {
  const { serviceId } = props;
  const [createIsOpen, setCreateOpen] = useState(false);
  const [exportToExcelTriggered, setExport] = useState(false);
  const bapi = useSelector(s => s.interfaceReducer.bapiByInterface);
  const interfaces = useSelector(s => s.interfaceReducer.interfaces);
  const dispatch = useDispatch();
  async function fetchBapi(r) {
    dispatch(getBapiByInterface(r));
  }
  useEffect(() => {
    if (serviceId) {
      if (Array.isArray(serviceId)) {
        serviceId.map(r => {
          fetchBapi(r);
        })
      }
    }
  }, [dispatch, serviceId]);

  function exportHandler() {
    Swal.fire({
      title: "You are about to export selected Interface SAP BAPI Information",
      text: "Do you want to continue?",
      icon: "question",
      focusConfirm: true,
      buttons: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No"
    }).then(async (r) => {
      if (r.isConfirmed) {
        setExport(true);
        Swal.fire(
          "Success!",
          "File has been successfully downloaded"
        );
        setExport(false);
      }
    });
  };

  const BapiPerService = (sId) => {
    const bapiInformation = bapi && bapi.find(r => r.interface === sId);
    return (
      <Paper style={{ marginBottom: '25px' }} key={`service-${sId}`}>
        <h4 style={{ padding: '5px' }}>{bapiInformation && bapiInformation.interface && interfaces.find(r => r.id === bapiInformation.interface).interface_id}</h4>
        <TableContainer component={Paper}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>BU</TableCell>
                <TableCell>BAPI Name</TableCell>
                <TableCell>Parameter</TableCell>
                <TableCell>Parameter Type</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Data Type</TableCell>
                <TableCell>SQLite Table</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                bapiInformation && bapiInformation.data.map((row, id) => (
                  <React.Fragment key={id}>
                    <TableRow>
                      <TableCell>{row.business_unit_name}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.bapi_name}
                      </TableCell>
                      <TableCell>{row.bapi_param}</TableCell>
                      <TableCell>{row.param_type}</TableCell>
                      <TableCell>{row.value}</TableCell>
                      <TableCell>{row.data_type}</TableCell>
                      <TableCell>{row.sqlite_table}</TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              {
                !bapiInformation || (bapiInformation && bapiInformation.data.length === 0) &&
                <TableRow>
                  <TableCell><h4 style={{ padding: 5 }}>No BAPI parameter maintained</h4></TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    )
  }

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <Button variant="contained" color="primary" onClick={() => exportHandler()}>Export to Excel</Button>
      </div>
      {
        serviceId && Array.isArray(serviceId) &&
        serviceId.map(sId => {
          return BapiPerService(sId)
        })
      }
      {createIsOpen && (
        <Create open={createIsOpen} handleClose={() => setCreateOpen(false)} />
      )}
      {
        exportToExcelTriggered &&
        <ExcelFile filename="SAP BAPI Parameter" hideElement={true}>
          <ExcelSheet data={[].concat.apply([], serviceId.map(sId => bapi.find(r => r.interface === sId).data))} name="SAP BAPI Parameter">
            <ExcelColumn label="Market" value={(col) => col.business_unit_name} />
            <ExcelColumn label="Interface" value={(col) => col.interface_name} />
            <ExcelColumn label="BAPI" value={(col) => col.bapi_name} />
            <ExcelColumn label="Parameter" value={(col) => col.bapi_param} />
            <ExcelColumn label="Parameter Type" value={(col) => col.param_type} />
            <ExcelColumn label="Value" value={(col) => col.value} />
            <ExcelColumn label="Data Type" value={(col) => col.data_type} />
            <ExcelColumn label="SQLite Table" value={(col) => col.sqlite_table} />
          </ExcelSheet>
        </ExcelFile>
      }
    </React.Fragment>
  );
};
