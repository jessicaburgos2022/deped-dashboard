import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import TreeView from './Treeview';
import CustomTable from './Table';
import InsertOrgOutcome from './Insert';
import { listOrgOutcome, listProjectIndicators } from '../../actions/prexcActions';
import { fetchRoleList } from '../../actions/appActions';
import { useDispatch } from 'react-redux';

import './styles.css'

export default () => {
    const dispatch = useDispatch();
    const [insertOrgOutcomeModalIsOpen, setInsertOrgOutcomeModalIsOpen] = useState(false);
    useEffect(() => {
        dispatch(fetchRoleList());
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
                    <div className='row justify-content-lg-between'>
                        <div className='col-auto'>
                            <h4>Organizational Outcomes</h4>
                        </div>
                        <div className='col-auto'>
                            <Button className="btn" onClick={() => setInsertOrgOutcomeModalIsOpen(true)}>New Organizational Outcome</Button>
                        </div>
                    </div>

                    <CustomTable handleRefresh={reloadPREXC} />
                    {/* <TreeView handleRefresh={reloadPREXC} /> */}
                </div>
            </div>
        </div>

    )
}