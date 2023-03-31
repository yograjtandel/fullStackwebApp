import React,{useContext} from "react";

import FormContext from '../../store/FormContext'

const Card = (props) => {
  const ctx = useContext(FormContext);
  return (
    <div
      className={`card-spacing d-flex justify-content-center ${props.className}`}
    >
      <div
        className={`card ${
          props.position ? "align-self-" + props.position : ""} ${ctx.mode === 'read' ? 'readOnly' : ''}`}
        style={{ width: props.width ? props.width : "fit-content", height: "fit-content" }}
      >
        <div className="row">
          <div className="col">
            <span className="title">{props.title}</span>
          </div>
        </div>
        <div className="row">
          <div className="col p-0 m-0">{props.children}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
