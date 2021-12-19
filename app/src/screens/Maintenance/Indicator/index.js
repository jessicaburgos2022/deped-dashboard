import { Button } from '@material-ui/core';
import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {searchKRA} from '../../../actions/kraActions';
import Table from './_components/table';
import AddOutput from './_components/addOutput'; 
 
export default () => {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const dispatch = useDispatch();
    const kraState = useSelector(state => state.kra);
    useEffect(()=>{
        dispatch(searchKRA())
    },[])
    const handleClose = () => setIsAddOpen(false);
    const handleRefresh = () => dispatch(searchKRA());
    return (
        <div style={{ padding: 25 }}>
        {isAddOpen &&   <AddOutput open={isAddOpen} handleClose={handleClose} handleRefresh={handleRefresh}/>}
            <div className="text">KRA  &nbsp; <Button variant="contained" color="success" onClick={() => setIsAddOpen(true)} >Add KRA</Button></div>
            <Table SearchResult = {kraState.searchResult} />
           
        </div>
        
    )
}