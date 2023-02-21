import React from "react";
import uuid from "react-uuid";

import TrWrapper from "./TrWrapper";

const Tr = (props) => {
  let tdList = [];
  for (const key of props.col) {
    tdList.push(<td key={uuid()}>{props.data[key]}</td>);
  }

  return <TrWrapper data={props.data} to={props.to}>{tdList}</TrWrapper>;
};

export default Tr;
