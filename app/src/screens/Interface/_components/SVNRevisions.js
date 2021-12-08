import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSVNInformation } from "../../../actions/interfaceActions";
import ReplayIcon from "@material-ui/icons/Replay";

export default (props) => {
  const { url, service } = props;
  const dispatch = useDispatch();
  const svnState = useSelector((state) => state.svnReducer);

  async function reload() {
    await dispatch(getSVNInformation(url, service));
  }

  useEffect(() => {
    if (url) {
      async function fetchData() {
        await dispatch(getSVNInformation(url, service));
      }
      if (
        !svnState.svnInfo ||
        (svnState.svnInfo &&
          !svnState.svnInfo.find((r) => r.interface === service))
      ) {
        fetchData();
      }
    }
  }, [dispatch, service, svnState.svnInfo, url]);
  return (
    <React.Fragment>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div>
          <IconButton size="small" onClick={() => reload()}>
            <ReplayIcon />
          </IconButton>
        </div>
      </div>
      <h6 style={{ marginTop: 0, marginBottom: 3 }}>{url}</h6>
      <Paper>
        <TableContainer component={Paper}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell className="interface-table-header">
                  Revision
                </TableCell>
                <TableCell className="interface-table-header">Author</TableCell>
                <TableCell className="interface-table-header">Date</TableCell>
                <TableCell className="interface-table-header">
                  Message
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!url &&
                svnState.svnInfo &&
                !svnState.svnInfo.find((r) => r.interface === service) && (
                  <TableRow>
                    <Box padding={4}>
                      <h2>SVN Path not yet specified..</h2>
                    </Box>
                  </TableRow>
                )}
              {url &&
                svnState.svnInfo &&
                svnState.svnInfo.find((r) => r.interface === service) &&
                svnState.svnInfo.find((r) => r.interface === service)
                  .loading && (
                  <TableRow>
                    <Box padding={4}>
                      <h2>Loading..</h2>
                    </Box>
                  </TableRow>
                )}
              {url &&
                svnState.svnInfo &&
                !svnState.svnInfo.find((r) => r.interface === service) && (
                  <TableRow>
                    <Box padding={4}>
                      <h2>Loading..</h2>
                    </Box>
                  </TableRow>
                )}
              {svnState.svnInfo &&
                svnState.svnInfo.find((r) => r.interface === service) &&
                !svnState.svnInfo.find((r) => r.interface === service)
                  .loading &&
                svnState.svnInfo
                  .find((r) => r.interface === service)
                  .data.map((rev, id) => {
                    return (
                      <React.Fragment key={id}>
                        <TableRow>
                          <TableCell className="interface-table-cell">
                            <b>{rev.$.revision}</b>
                          </TableCell>
                          <TableCell className="interface-table-cell">
                            <b>{rev.author.replace("@ZUELLIGPHARMA", "")}</b>
                          </TableCell>
                          <TableCell className="interface-table-cell">
                            {moment(rev.date).format("MM/DD/YYYY, hh:mm:ss A")}
                          </TableCell>
                          <TableCell className="interface-table-cell">
                            {rev.msg}
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </React.Fragment>
  );
};
