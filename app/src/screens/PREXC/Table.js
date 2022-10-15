import * as React from "react";
import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
// web.cjs is required for IE11 support
import { useSpring, animated } from "react-spring";
import { useSelector, useDispatch } from "react-redux";
import paginationFactory from "react-bootstrap-table2-paginator";
import InserProjectButton from "./Insert/insertProject";
import InsertIndicatorButton from "./Insert/insertIndicator";

import BootstrapTable from "react-bootstrap-table-next";
import { Dropdown, Row } from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-json-pretty/themes/monikai.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import EditIndicator from "./edit/editInput";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import "./styles.css";
import { updateIndicatorStatus } from "../../actions/prexcActions";
import Check from "@mui/icons-material/Check";
import {
  hasAccess,
  isOfficeAccessible,
  isUserSuperAdmin,
} from "../../helpers/common";
import { Tooltip } from "@material-ui/core";

function TransitionComponent(props) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: "translate3d(20px,0,0)",
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

export default function CustomizedTreeView(props) {
  const { handleRefresh } = props;
  const prexcState = useSelector((state) => state.prexc);
  const userState = useSelector((state) => state.user);
  const [isEditIndicatorOpen, setIsEditIndicatorOpen] = React.useState(false);
  const [selectedIndicator, setSelectedIndicator] = React.useState({});
  const [quarterForEdit, setQuarterForEdit] = React.useState(0);
  const deleteConfirmationRef = React.createRef();
  const dispatch = useDispatch();
  const handleApproveValue = (resultid) => {
    const modal = deleteConfirmationRef.current;
    setTimeout(async () => {
      try {
        await modal.show();
        dispatch(updateIndicatorStatus(resultid, 2));
        handleRefresh();
        await modal.hide();
      } catch (err) {
        await modal.hide();
      }
    }, 100);
  };

  const distinctProject = (array) => {
    const result = [];
    const map = new Map();
    for (const item of array) {
      if (!map.has(item.ProgramId)) {
        map.set(item.ProgramId, true); // set any value to Map
        result.push({
          ...item,
        });
      }
    }
    return result;
  };
  const columns = [
    {
      dataField: "OrganizationalOutcomeId",
      text: "Id",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "80px" };
      },
      hidden: true,
    },
    {
      dataField: "OrganizationalOutcomeYear",
      text: "Year",
      headerStyle: (column, colIndex) => {
        return { width: "80px", textAlign: "center" };
      },
    },
    {
      dataField: "OrganizationalOutcomeTitle",
      text: "Organizational Outcome",
      formatter: (value, row) => (
        <span>
          <span className="mr-3">{value}</span>
          {hasAccess(userState, 9) && (
            <InserProjectButton
              orgOutcomeId={row.OrganizationalOutcomeId}
              handleRefresh={() => handleRefresh()}
            />
          )}
        </span>
      ),
    },
  ];
  const indicatorColumns = [
    {
      dataField: "IndicatorId",
      text: "Id",
      sort: true,
      headerStyle: (column, colIndex) => {
        return { width: "80px" };
      },
      hidden: true,
    },
    {
      dataField: "IndicatorTitle",
      text: "Indicator",
      headerStyle: (column, colIndex) => {
        return { width: "70vh" };
      },
      formatter: (value, row) => (
        <Tooltip title={value}>
          <span>{value}</span>
        </Tooltip>
      )
    },
    {
      dataField: "PhysicalTarget",
      text: "P. Target",
      headerStyle: (column, colIndex) => {
        return { width: "50" };
      },
      formatter: (value, row) => (
        <Tooltip title={value}>
          <span>{value}</span>
        </Tooltip>
      )
    },
    {
      dataField: "DepartmentName",
      text: "Office",
      headerStyle: (column, colIndex) => {
        return { width: "50" };
      },
      formatter: (value, row) => (
        <Tooltip title={value}>
          <span>{value}</span>
        </Tooltip>
      )
    },
    {
      dataField: "AccountableOffice",
      text: "Unit",
      headerStyle: (column, colIndex) => {
        return { width: "50" };
      },
      formatter: (value, row) => (
        <Tooltip title={value}>
          <span>{value}</span>
        </Tooltip>
      )
    },
    {
      dataField: "Quarter1",
      text: "Quarter 1",
      style: (value, quarter1) => ({
        padding: "0.75rem .25rem .75rem .75rem",
        backgroundColor:
          quarter1.Q1StatusId && quarter1.Q1StatusId === 1
            ? "#FFF8E8"
            : quarter1.Q1StatusId && quarter1.Q1StatusId === 2
              ? "#E6F8F3"
              : "#FFEBF1",
      }),

      formatter: (value, row) => (
        <span className="d-block position-relative quarter-column">
          <Tooltip title={row.Q1Result}>
            <span>{row.Q1Result}</span>
          </Tooltip>
          <span className="button-wrapper">
            {isOfficeAccessible(userState, row.DepartmentId) &&
              hasAccess(userState, 11) && (
                <EditIcon
                  className="c-pointer edit-icon"
                  onClick={() => {
                    setQuarterForEdit(1);
                    setSelectedIndicator(row);
                    setIsEditIndicatorOpen(true);
                  }}
                />
              )}

            {row.Q1StatusId === 1 &&
              isOfficeAccessible(userState, row.DepartmentId) &&
              hasAccess(userState, 12) && (
                <CheckIcon
                  className="c-pointer check-icon"
                  onClick={() => handleApproveValue(row.Q1ResultId)}
                />
              )}
          </span>
        </span>
      ),
    },
    {
      dataField: "Quarter2",
      text: "Quarter 2",
      style: (value, quarter2) => ({
        padding: "0.75rem .25rem .75rem .75rem",
        backgroundColor:
          quarter2.Q2StatusId && quarter2.Q2StatusId === 1
            ? "#FFF8E8"
            : quarter2.Q2StatusId && quarter2.Q2StatusId === 2
              ? "#E6F8F3"
              : "#FFEBF1",
      }),

      formatter: (value, row) => (
        <span className="d-block position-relative quarter-column">
          <Tooltip title={row.Q2Result}>
            <span>{row.Q2Result}</span>
          </Tooltip>
          <span className="button-wrapper">
            {/* edit button */}
            {isOfficeAccessible(userState, row.DepartmentId) &&
              hasAccess(userState, 11) && (
                <EditIcon
                  className="c-pointer edit-icon"
                  onClick={() => {
                    setQuarterForEdit(2);
                    setSelectedIndicator(row);
                    setIsEditIndicatorOpen(true);
                  }}
                />
              )}

            {/* check button */}
            {row.Q2StatusId === 1 &&
              isOfficeAccessible(userState, row.DepartmentId) &&
              hasAccess(userState, 12) && (
                <CheckIcon
                  className="c-pointer check-icon"
                  onClick={() => handleApproveValue(row.Q2ResultId)}
                />
              )}
          </span>
        </span>
      ),
    },
    {
      dataField: "Quarter3",
      text: "Quarter 3",
      style: (value, quarter3) => ({
        padding: "0.75rem .25rem .75rem .75rem",
        backgroundColor:
          quarter3.Q3StatusId && quarter3.Q3StatusId === 1
            ? "#FFF8E8"
            : quarter3.Q3StatusId && quarter3.Q3StatusId === 2
              ? "#E6F8F3"
              : "#FFEBF1",
      }),
      formatter: (value, row) => (
        <span className="d-block position-relative quarter-column">
          <Tooltip title={row.Q3Result}>
            <span>{row.Q3Result}</span>
          </Tooltip>
          <span className="button-wrapper">
            {/* edit button */}
            {isOfficeAccessible(userState, row.DepartmentId) &&
              hasAccess(userState, 11) && (
                <EditIcon
                  className="c-pointer edit-icon"
                  onClick={() => {
                    setQuarterForEdit(3);
                    setSelectedIndicator(row);
                    setIsEditIndicatorOpen(true);
                  }}
                />
              )}

            {/* check button */}
            {row.Q3StatusId === 1 &&
              isOfficeAccessible(userState, row.DepartmentId) &&
              hasAccess(userState, 12) && (
                <CheckIcon
                  className="c-pointer check-icon"
                  onClick={() => handleApproveValue(row.Q3ResultId)}
                />
              )}
          </span>
        </span>
      ),
    },
    {
      dataField: "Quarter4",
      text: "Quarter 4",
      style: (value, quarter4) => ({
        padding: "0.75rem .25rem .75rem .75rem",
        backgroundColor:
          quarter4.Q4StatusId && quarter4.Q4StatusId === 1
            ? "#FFF8E8"
            : quarter4.Q4StatusId && quarter4.Q4StatusId === 2
              ? "#E6F8F3"
              : "#FFEBF1",
      }),
      formatter: (value, row) => (
        <span className="d-block position-relative quarter-column">
          <Tooltip title={row.Q4Result}>
            <span>{row.Q4Result}</span>
          </Tooltip>
          <span className="button-wrapper">
            {/* edit button */}
            {isOfficeAccessible(userState, row.DepartmentId) &&
              hasAccess(userState, 11) && (
                <EditIcon
                  className="c-pointer edit-icon"
                  onClick={() => {
                    setQuarterForEdit(4);
                    setSelectedIndicator(row);
                    setIsEditIndicatorOpen(true);
                  }}
                />
              )}

            {/* check button */}
            {row.Q4StatusId === 1 &&
              isOfficeAccessible(userState, row.DepartmentId) &&
              hasAccess(userState, 12) && (
                <CheckIcon
                  className="c-pointer check-icon"
                  onClick={() => handleApproveValue(row.Q4ResultId)}
                />
              )}
          </span>
        </span>
      ),
    },
  ];
  const expandRow = {
    renderer: (row) => (
      <div className="indicator-row text-justify table-row-expand-content">
        {prexcState.projectIndicators &&
          Array.isArray(prexcState.projectIndicators) &&
          distinctProject(
            prexcState.projectIndicators.filter(
              (pi) => pi.OrgOutcomeId === row.OrganizationalOutcomeId
            )
          ).map((pi) => {
            return (
              <div className="col-sm-12">
                <div className="py-3">
                  {/* <span className='text-muted'>Project:</span> {pi.ProgramTitle} <InsertIndicatorButton programId={pi.ProgramId} handleRefresh={() => handleRefresh()} />  JBURGOS */}
                  <span className="head-title mr-3">{pi.ProgramTitle}</span>
                  {hasAccess(userState, 10) && (
                    <InsertIndicatorButton
                      programId={pi.ProgramId}
                      handleRefresh={() => handleRefresh()}
                    />
                  )}
                </div>

                <BootstrapTable
                  className="indicator-table"
                  bootstrap4
                  keyField="Id"
                  data={
                    prexcState.projectIndicators.filter(
                      (i) =>
                        i.OrgOutcomeId === row.OrganizationalOutcomeId &&
                        i.ProgramId === pi.ProgramId &&
                        i.IndicatorTitle
                    )
                      ? prexcState.projectIndicators.filter(
                        (i) =>
                          i.OrgOutcomeId === row.OrganizationalOutcomeId &&
                          i.ProgramId === pi.ProgramId &&
                          i.IndicatorTitle
                      )
                      : []
                  }
                  columns={indicatorColumns}
                  noDataIndication={
                    <span style={{ color: "red" }}>
                      No data returned by search criteria.
                    </span>
                  }
                />
              </div>
            );
          })}
      </div>
    ),
    showExpandColumn: true,
    // expandByColumnOnly: true,
  };

  const paginationTotalRenderer = (from, to, size) => (
    <span
      className="react-bootstrap-table-pagination-total"
      style={{ fontSize: 11 }}
    >
      Showing {from} to {to} of {size} Organizational Outcomes
    </span>
  );
  const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange,
  }) => (
    <Dropdown>
      <Dropdown.Toggle variant="info" id="dropdown-basic">
        Showing {currSizePerPage} entries
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((option) => (
          <Dropdown.Item onClick={() => onSizePerPageChange(option.page)}>
            {option.text}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
  const options = {
    sizePerPageRenderer,
    paginationTotalRenderer,
    showTotal: true,
  };
  return (
    <React.Fragment>
      {isEditIndicatorOpen && (
        <EditIndicator
          handleRefresh={handleRefresh}
          handleClose={() => setIsEditIndicatorOpen(false)}
          open={isEditIndicatorOpen}
          IndicatorId={selectedIndicator.IndicatorId}
          Quarter={quarterForEdit}
        />
      )}
      <BootstrapTable
        classes="table table-head-custom"
        bootstrap4
        keyField="Id"
        data={prexcState.orgOutcome ? prexcState.orgOutcome : []}
        columns={columns}
        expandRow={expandRow}
        noDataIndication={
          <span style={{ color: "red" }}>
            No data returned by search criteria.
          </span>
        }
        pagination={paginationFactory(options)}
      />
      <ConfirmationDialog
        ref={deleteConfirmationRef}
        open={false}
        confirmTitle="Confirmation"
        confirmationDetail="Do you want to approve this result?"
        confirmButtonText="Yes"
        cancelButtonText="No"
      ></ConfirmationDialog>
    </React.Fragment>
  );
}
