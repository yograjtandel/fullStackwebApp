import React, { useState, useContext, } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

import FormContext from "../../store/FormContext";
import ActiveModelContext from "../../store/ActiveModelContext";

import TrWrapper from "./TrWrapper";

const Tr = (props) => {
//   const [check, setcheck] = useState(false);
//   const FormCtx = useContext(FormContext);
//   const ActiveModelCtx = useContext(ActiveModelContext);
//   let navigate = useNavigate();
//   const onChangeHandler = () => {
//     setcheck((prev) => !prev);
//   };

//   const onRecordClick = () => {
//     FormCtx.setActiveMode("read");
//     FormCtx.setActiveRecord(props.data);
//     const path = props.to ? props.to : ActiveModelCtx.route
//     navigate("../" + path);
//   };
  let tdList = [];
  for (const key of props.col) {
    tdList.push(<td key={uuid()}>{props.data[key]}</td>);
  }

  return <TrWrapper data={props.data} to={props.to}>{tdList}</TrWrapper>;
};

export default Tr;
