import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TreeView from './Treeview';
import InsertOrgOutcome from './Insert';
import { listOrgOutcome, listProjectIndicators } from '../../actions/prexcActions';
import { useDispatch } from 'react-redux';

export default () => {
    const dispatch = useDispatch();
    const [insertOrgOutcomeModalIsOpen, setInsertOrgOutcomeModalIsOpen] = useState(false);
    useEffect(() => {
        dispatch(listOrgOutcome({ orgId: 0 }));
        dispatch(listProjectIndicators());
    }, [])
    const reloadPREXC = () => {
        dispatch(listOrgOutcome({ orgId: 0 }));
        dispatch(listProjectIndicators());
    }
    return (
        <div className="content-wrapper">
            {insertOrgOutcomeModalIsOpen && <InsertOrgOutcome open={insertOrgOutcomeModalIsOpen} handleRefresh={() => reloadPREXC()} handleClose={() => setInsertOrgOutcomeModalIsOpen(false)} />}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">PREXC</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">PREXC</a></li>
                                <li className="breadcrumb-item active">Report</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <div className="container-fluid">
                    <div style={{ padding: 5 }}>
                        <Button variant="contained" color="primary" onClick={() => setInsertOrgOutcomeModalIsOpen(true)}>New Organizational Outcome</Button>
                    </div>

                    <h4>Organizational Outcomes</h4>
                    <TreeView handleRefresh={reloadPREXC} />
                </div>
            </div>
        </div>

    )
}