import { Button } from '@material-ui/core';
import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProject } from '../../../actions/projectActions';
import Table from './_components/table';
import AddOutput from './_components/addOutput'; 
 
export default () => {
    const [isAddOpen, setIsAddOpen] = useState(false);
    const dispatch = useDispatch();
    const projectState = useSelector(state => state.project);
    useEffect(()=>{
        dispatch(searchProject())
    },[])
    const handleClose = () => setIsAddOpen(false);
    const handleRefresh = () => dispatch(searchProject());
    return (
        <div style={{ padding: 25 }}>
        {isAddOpen &&   <AddOutput open={isAddOpen} handleClose={handleClose} handleRefresh={handleRefresh}/>}
            <div className="text">PROJECT  &nbsp; <Button variant="contained" color="success" onClick={() => setIsAddOpen(true)} >Add PROJECT</Button></div>
            <Table SearchResult = {projectState.searchResult} />
           
        </div>
        
    )
}