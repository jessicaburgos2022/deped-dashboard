import * as React from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
// web.cjs is required for IE11 support
import { useSpring, animated } from 'react-spring';
import { useSelector, useDispatch } from 'react-redux';
import paginationFactory from "react-bootstrap-table2-paginator";
import InserProjectButton from './Insert/insertProject';
import InsertIndicatorButton from './Insert/insertIndicator';

import BootstrapTable from "react-bootstrap-table-next";
import { Dropdown } from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-json-pretty/themes/monikai.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";


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

const StyledTreeItem = styled((props) => (
    <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
        '& .close': {
            opacity: 0.3,
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));

const StyledTreeItemIndicator = styled((props) => (
    <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 15,
        paddingLeft: 18,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));


// function StyledTreeItem(props) {
//   const {
//     bgColor,
//     color,
//     labelIcon: LabelIcon,
//     labelInfo,
//     labelText,
//     ...other
//   } = props;

//   return (
//     <StyledTreeItemRoot
//       label={
//         <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
//           <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
//           <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
//             {labelText}
//           </Typography>
//           <Typography variant="caption" color="inherit">
//             {labelInfo}
//           </Typography>
//         </Box>
//       }
//       style={{
//         '--tree-view-color': color,
//         '--tree-view-bg-color': bgColor,
//       }}
//       {...other}
//     />
//   );
// }

export default function CustomizedTreeView(props) {
    const { handleRefresh } = props;
    const prexcState = useSelector((state) => state.prexc);
    const distinctProject = (array) => {
        console.log(array)
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
    const indicatorColumns = [
        {
            dataField: "IndicatorId",
            text: "Id",
            sort: true,
            headerStyle: (column, colIndex) => {
                return { width: "80px" };
            },
            hide: true
        },
        {
            dataField: "IndicatorTitle",
            text: "Indicator",
            headerStyle: (column, colIndex) => {
                return { width: "100" };
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
            text: "Quarter 1"
        },
        {
            dataField: "Quarter2",
            text: "Quarter 2"
        },
        {
            dataField: "Quarter3",
            text: "Quarter 3"
        },
        {
            dataField: "Quarter4",
            text: "Quarter 4"
        }
    ];
    const expandRow = {
        renderer: (row) => (
            <div className="col-sm-12 d-flex text-justify table-row-expand-content">
                {distinctProject(prexcState.projectIndicators.filter(pi => pi.OrgOutcomeId === row.OrganizationalOutcomeId)).map(pi => {
                    return <div className='col-sm-12'>
                        <div>
                            <span className='text-muted'>Project:</span> {pi.ProgramTitle} <InsertIndicatorButton programId={pi.ProgramId} handleRefresh={() => handleRefresh()} />
                        </div>
                        <BootstrapTable
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
                        {/* {prexcState.projectIndicators.filter(i => i.OrgOutcomeId === oo.OrganizationalOutcomeId && i.ProgramId === pi.ProgramId && i.IndicatorTitle).map(i => {
                                return <StyledTreeItemIndicator nodeId={`indicator-${i.IndicatorId}`} label={
                                    <div>
                                        <p><span className='text-muted'>Indicator:</span> {i.IndicatorTitle} </p>
                                        <p><span className='text-muted'>P. Target:</span> {i.PhysicalTarget}</p>
                                        <p><span className='text-muted'>Accountable Office:</span> {i.AccountableOffice}</p>
                                    </div>}>
                                </StyledTreeItemIndicator>
                            })} */}
                    </div>
                })}
            </div>
        ),
        showExpandColumn: true,
        // expandByColumnOnly: true,
    };

    const paginationTotalRenderer = (from, to, size) => (
        <span className="react-bootstrap-table-pagination-total" style={{ fontSize: 11 }}>
            Showing {from} to {to} of {size} Results
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
        <BootstrapTable
            bootstrap4
            keyField="Id"
            data={prexcState.orgOutcome ? prexcState.orgOutcome : []}
            columns={columns}
            expandRow={expandRow}
            // showTotal={true}
            noDataIndication={
                <span style={{ color: "red" }}>
                    No data returned by search criteria.
                </span>
            }
            pagination={paginationFactory(options)}
        />
        // <TreeView
        //     aria-label="customized"
        //     // defaultExpanded={[1, 2, 3, 4, 5, 6]}
        //     defaultCollapseIcon={<MinusSquare />}
        //     defaultExpandIcon={<PlusSquare />}
        //     // defaultEndIcon={<CloseSquare />}
        //     sx={{ height: '100%', flexGrow: 1, minHeight: 'calc(100vh - 15rem)' }}
        // >
        //     {
        //         prexcState.orgOutcome.map((oo) => {
        //             return (
        //     <StyledTreeItem nodeId={`oo-${oo.OrganizationalOutcomeId}`} label={<div><span className='text-muted'>Organizational Outcome:</span> {oo.OrganizationalOutcomeTitle} <InserProjectButton orgOutcomeId={oo.OrganizationalOutcomeId} handleRefresh={() => handleRefresh()} /></div>} >
        //       {distinctProject(prexcState.projectIndicators.filter(pi => pi.OrgOutcomeId === oo.OrganizationalOutcomeId)).map(pi => {
        //         return <StyledTreeItem nodeId={`project-${pi.ProgramId}`} label={
        //           <div><span className='text-muted'>Project:</span> {pi.ProgramTitle} <InsertIndicatorButton programId ={pi.ProgramId} handleRefresh={() => handleRefresh()} /></div>}>
        //           {prexcState.projectIndicators.filter(i => i.OrgOutcomeId === oo.OrganizationalOutcomeId && i.ProgramId === pi.ProgramId && i.IndicatorTitle).map(i => {
        //             return <StyledTreeItemIndicator nodeId={`indicator-${i.IndicatorId}`} label={
        //               <div>
        //                 <p><span className='text-muted'>Indicator:</span> {i.IndicatorTitle} </p>
        //                 <p><span className='text-muted'>P. Target:</span> {i.PhysicalTarget}</p>
        //                 <p><span className='text-muted'>Accountable Office:</span> {i.AccountableOffice}</p>
        //               </div>}>
        //             </StyledTreeItemIndicator>
        //           })}
        //         </StyledTreeItem>
        //       })}
        //       {/* <StyledTreeItem nodeId="2" label={<div><span className='text-muted'>Project:</span> Number of education researches completed <PlusSquare onClick={() => null} /></div>}>
        //         <StyledTreeItem nodeId="4" label="Basic Education Inputs" />
        //       </StyledTreeItem>
        //       <StyledTreeItem nodeId="3" label="Inclusive Education">
        //         <StyledTreeItem nodeId="4" label="Support to Schools and Learners" />
        //       </StyledTreeItem>
        //       <StyledTreeItem nodeId="5" label="Support to Schools and Learners">
        //       </StyledTreeItem>
        //       <StyledTreeItem nodeId="6" label="Education Human Resource Development" /> */}
        //     </StyledTreeItem>)
        //         })
        //     }
        // </TreeView >
    );
}