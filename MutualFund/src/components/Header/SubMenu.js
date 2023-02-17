import React from "react";
import { NavLink } from "react-router-dom";
import { RoutPath } from "../../data/Paths";

const SubMenu = (props) => {
  return props.SubMenu.map((item) => {
    return (
      <li id="" className="nav-item" key={item.id}>
        {item.to === RoutPath.None ? (
          <span className="nav-link">
            <span className="nav-text">{item.title} </span>
          </span>
        ) : (
          <NavLink className="nav-link" to={item.to}>
            <span className="nav-text">{item.title} </span>
          </NavLink>
        )}

        {item.subMenu.length !== 0 && (
          <ul className="sub-menu">
            <SubMenu SubMenu={item.subMenu} />
          </ul>
        )}
      </li>
    );
  });
};

export default SubMenu;
