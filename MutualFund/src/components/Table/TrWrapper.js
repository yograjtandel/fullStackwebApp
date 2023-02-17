import React, { useState, useContext, } from "react";
import { useNavigate } from "react-router-dom";
import uuid from "react-uuid";

import FormContext from "../../store/FormContext";
import ActiveModelContext from "../../store/ActiveModelContext";

const TrWrapper = (props) => {
  const [check, setcheck] = useState(false);
  const FormCtx = useContext(FormContext);
  const ActiveModelCtx = useContext(ActiveModelContext);
  let navigate = useNavigate();
  const onChangeHandler = () => {
    setcheck((prev) => !prev);
  };

  const onRecordClick = (event) => {
    event.stopPropagation();
    FormCtx.setActiveMode("read");
    FormCtx.setActiveRecord(props.data);
    const path = props.to ? props.to : ActiveModelCtx.route
    navigate("../" + path);
  };

  return <tr onClick={onRecordClick}>{props.children}</tr>;
};

export default TrWrapper;
