import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import KRAModule from './KRA'
export default () => {
  return (
    <>
      <div className="text">Maintenance / Administrator</div>
      <KRAModule />
    </>
  );

}
