import React from "react";
import FormViewButton from "../ActrionController/FormViewButton";

const BreadCrum = (props) => {
  return (
    <div className="distribution-selection-wrapper d-flex justify-content-between align-items-center mb-4">
      <div className="section-title-wrapper mt-0">
        <h5 className="section-title-app mb-0 text-start">{props.title}</h5>
      </div>
      {(props.to || props.FormIsValid) && <div className="mb-0 px-2">
        <FormViewButton to={props.to} FormIsValid={!props.FormIsValid}/>
      </div>}
    </div>
  );
};

export default BreadCrum;
