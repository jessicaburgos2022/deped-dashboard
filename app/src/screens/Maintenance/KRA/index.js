import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {searchKRA} from '../../../actions/kraActions';
import Table from './_components/table';

export default () => {
    const dispatch = useDispatch();
    const kraState = useSelector(state => state.kra);
    useEffect(()=>{
        dispatch(searchKRA())
    },[])
    return (
        <div style={{ padding: 25 }}>
            <div className="text">KRA</div>
            <Table SearchResult = {kraState.searchResult} />
        </div>
    )
}