import { Skeleton } from "@material-ui/lab";
import React from "react";

export default (props) => {
  const { row } = props;
  var rows = [];
  for (var i = 0; i < row; i++) {
    rows.push(<Skeleton width="100%"><div style={{height:60}} animation="wave"></div></Skeleton>);
  }
  return <div>{rows}</div>;
};
