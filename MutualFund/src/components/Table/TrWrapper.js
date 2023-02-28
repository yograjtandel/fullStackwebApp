import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import FormContext from "../../store/FormContext";

const TrWrapper = (props) => {
  const FormCtx = useContext(FormContext);
  let navigate = useNavigate();

  const onRecordClick = (event) => {
    event.stopPropagation();
    FormCtx.setActiveMode("read");
    FormCtx.setActiveRecord(props.data);
    navigate("../CreateClient");
  };

  return <tr onClick={onRecordClick}>{props.children}</tr>;
};

export default TrWrapper;
