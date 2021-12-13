import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {searchMajorOutput} from '../../../../actions/outputActions';

export default () => {
    const dispatch = useDispatch();
    const outputManagementState = useSelector(state => state.outputManagement);
    useEffect(()=>{
    },[])
    return (
        <div style={{ padding: 25 }}>
            <div className="text">Minor Outputs</div>
        </div>
    )
}