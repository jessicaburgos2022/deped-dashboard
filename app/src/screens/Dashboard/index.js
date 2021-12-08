
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchKRAByDepartmentId, fetchOutputTypes } from "../../actions/appActions";
import RelatedTickets from "../Interface/_components/RelatedTickets";
import CommonModal from "../../components/CommonModal";
import "./styles.css";
export default () => {
  const dispatch = useDispatch();
  const accState = useSelector((state) => state.user)
  const state = useSelector((state) => state.app);
  useEffect(() => {
    var departmentId = accState.userInfo.acc[0] ? accState.userInfo.acc[0].DepartmentId : 0;
    dispatch(fetchKRAByDepartmentId(departmentId));
    dispatch(fetchOutputTypes());
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="text">Dashboard</div>

    </div>
  );
};
