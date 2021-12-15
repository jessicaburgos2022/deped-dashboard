import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchKRA } from '../../actions/kraActions';
export default ()=>  {
  const dispatch = useDispatch();
  const kraState = useSelector(state => state.kra);
  useEffect(()=>{
    dispatch(searchKRA())
  },[])
    return (
      <>
        <div className="text">Maintenance / Administrator</div>
        <div style={{ display: "flex", justifyContent: "center", margin:'auto', marginTop:'20%' }}>
          <h1>Page is under construction</h1>
        </div>
      </>
    );
  
}
