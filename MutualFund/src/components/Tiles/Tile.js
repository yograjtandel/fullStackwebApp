import React,{useContext} from "react";
import { NavLink } from "react-router-dom";

import FormContext from "../../store/FormContext";

const Tile = (props) => {
  const ctx = useContext(FormContext);

  if (props.create) {
    ctx.setActiveMode("create");
  }
  return (
    <div className="box-card">
      <NavLink to={props.tile.to}>
        <div className="box-card-header">
          <props.tile.icon />
        </div>
        <div className="box-card-body">
          <div className="box-card-title">{props.tile.label}</div>
        </div>
      </NavLink>
    </div>
  );
};

export default Tile;
