import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
// web.cjs is required for IE11 support
import { useSpring, animated } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import paginationFactory from "react-bootstrap-table2-paginator";
import InserProjectButton from './Insert/insertProject';
import InsertIndicatorButton from './Insert/insertIndicator';

import BootstrapTable from "react-bootstrap-table-next";
import { Dropdown, Row } from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-json-pretty/themes/monikai.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import EditIndicator from './edit/editInput';
import './styles.css';

function TransitionComponent(props) {
    const style = useSpring({
        from: {
            opacity: 0,
            transform: 'translate3d(20px,0,0)',
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
    const [isEditIndicatorOpen, setIsEditIndicatorOpen] = React.useState(false);
    const [selectedIndicator, setSelectedIndicator] = React.useState({})
    const [quarterForEdit, setQuarterForEdit] = React.useState(0);
    const distinctProject = (array) => {
        const result = [];
        const map = new Map();
        for (const item of array) {
            if (!map.has(item.ProgramId)) {
                map.set(item.ProgramId, true);    // set any value to Map
                result.push({
                    ...item
                });
            }
        }
        return result;
    }
    const columns = [
        {
            dataField: "OrganizationalOutcomeId",
            text: "Id",
            sort: true,
            headerStyle: (column, colIndex) => {
                return { width: "80px" };
            },
            hidden: true
        },
        {
            dataField: "OrganizationalOutcomeYear",
            text: "Year",
            headerStyle: (column, colIndex) => {
                return { width: "80px" };
            },
        },
        {
            dataField: "OrganizationalOutcomeTitle",
            text: "Organizational Outcome",
            formatter: (value, row) => (
                <span>
                    {value}
                    <InserProjectButton orgOutcomeId={row.OrganizationalOutcomeId} handleRefresh={() => handleRefresh()} />
                </span>
            )
        }
    ];
    const getIndicatorValue = (Quarter, IndicatorId) => {
        return prexcState.indicatorValues && Array.isArray(prexcState.indicatorValues) && prexcState.indicatorValues.find(r => r.IndicatorId === IndicatorId && r.Quarter === Quarter) ? prexcState.indicatorValues.find(r => r.IndicatorId === IndicatorId && r.Quarter === Quarter).Result : '';
    }
    const indicatorColumns = [
        {
            dataField: "IndicatorId",
            text: "Id",
            sort: true,
            headerStyle: (column, colIndex) => {
                return { width: "80px" };
            },
            hidden: true
        },
        {
            dataField: "IndicatorTitle",
            text: "Indicator",
            headerStyle: (column, colIndex) => {
                return { width: "70vh" };
            },
        },
        {
            dataField: "PhysicalTarget",
            text: "Physical Target",
            headerStyle: (column, colIndex) => {
                return { width: "50" };
            },
        },
        {
            dataField: "AccountableOffice",
            text: "Accountable Office",
            headerStyle: (column, colIndex) => {
                return { width: "50" };
            },
        },
        {
            dataField: "Quarter1",
            text: "Quarter 1",
            formatter: (value, row) => (
                <div style={{ padding: '0.75rem 0.50rem', backgroundColor: row.Q1StatusId && row.Q1StatusId === 1 ? 'orange' : row.Q1StatusId && row.Q1StatusId === 2 ? 'green' : 'red' }} >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>
                            {row.Q1Result}
                        </span>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <EditIcon className="c-pointer" onClick={() => { setQuarterForEdit(1); setSelectedIndicator(row); setIsEditIndicatorOpen(true); }} />
                                <CheckIcon className="c-pointer" />
                            </div>
                        </div >
                    </div >
                </div>
            )
        },
        {
            dataField: "Quarter2",
            text: "Quarter 2",
            formatter: (value, row) => (
                <div style={{ padding: '0.75rem 0.50rem', backgroundColor: row.Q2StatusId && row.Q2StatusId === 1 ? 'orange' : row.Q2StatusId && row.Q2StatusId === 2 ? 'green' : 'red' }} >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>
                            {row.Q2Result}
                        </span>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <EditIcon className="c-pointer" onClick={() => { setQuarterForEdit(2); setSelectedIndicator(row); setIsEditIndicatorOpen(true); }} />
                                <CheckIcon className="c-pointer" />
                            </div>
                        </div >
                    </div >
                </div>
            )
        },
        {
            dataField: "Quarter3",
            text: "Quarter 3",
            formatter: (value, row) => (
                <div style={{ padding: '0.75rem 0.50rem', backgroundColor: row.Q3StatusId && row.Q3StatusId === 1 ? 'orange' : row.Q3StatusId && row.Q3StatusId === 2 ? 'green' : 'red' }} >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>
                            {row.Q3Result}
                        </span>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <EditIcon className="c-pointer" onClick={() => { setQuarterForEdit(3); setSelectedIndicator(row); setIsEditIndicatorOpen(true); }} />
                                <CheckIcon className="c-pointer" />
                            </div>
                        </div >
                    </div >
                </div>
            )
        },
        {
            dataField: "Quarter4",
            text: "Quarter 4",
            formatter: (value, row) => (
                <div style={{ padding: '0.75rem 0.50rem', backgroundColor: row.Q4StatusId && row.Q3StatusId === 1 ? 'orange' : row.Q4StatusId && row.Q4StatusId === 2 ? 'green' : 'red' }} >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>
                            {row.Q4Result}
                        </span>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <EditIcon className="c-pointer" onClick={() => { setQuarterForEdit(4); setSelectedIndicator(row); setIsEditIndicatorOpen(true); }} />
                                <CheckIcon className="c-pointer" />
                            </div>
                        </div >
                    </div >
                </div>
            )
        }
    ];
    const expandRow = {
        renderer: (row) => (
            <div className="indicator-row text-justify table-row-expand-content">
                {prexcState.projectIndicators && Array.isArray(prexcState.projectIndicators) && distinctProject(prexcState.projectIndicators.filter(pi => pi.OrgOutcomeId === row.OrganizationalOutcomeId)).map(pi => {
                    return <div className='col-sm-12'>
                        <div style={{ padding: '1rem' }}>
                            <span className='text-muted'>Project:</span> {pi.ProgramTitle} <InsertIndicatorButton programId={pi.ProgramId} handleRefresh={() => handleRefresh()} />
                        </div>
                        <BootstrapTable
                            className="indicator-table"
                            bootstrap4
                            keyField="Id"
                            data={prexcState.projectIndicators.filter(i => i.OrgOutcomeId === row.OrganizationalOutcomeId && i.ProgramId === pi.ProgramId && i.IndicatorTitle) ? prexcState.projectIndicators.filter(i => i.OrgOutcomeId === row.OrganizationalOutcomeId && i.ProgramId === pi.ProgramId && i.IndicatorTitle) : []}
                            columns={indicatorColumns}
                            noDataIndication={
                                <span style={{ color: "red" }}>
                                    No data returned by search criteria.
                                </span>
                            }
                        />
                    </div>
                })
                }
            </div >
        ),
        showExpandColumn: true,
        // expandByColumnOnly: true,
    };

    const paginationTotalRenderer = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total" style={{ fontSize: 11 }}>
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
                    <Dropdown.Item
                        onClick={() => onSizePerPageChange(option.page)}
                    >
                        {option.text}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
    const options = {
        sizePerPageRenderer,
        paginationTotalRenderer,
        showTotal: true
    };
    return (
        <React.Fragment>
            {isEditIndicatorOpen && <EditIndicator handleRefresh={handleRefresh} handleClose={() => setIsEditIndicatorOpen(false)} open={isEditIndicatorOpen} IndicatorId={selectedIndicator.IndicatorId} Quarter={quarterForEdit} />}
            <BootstrapTable
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
        </React.Fragment>

    );
}