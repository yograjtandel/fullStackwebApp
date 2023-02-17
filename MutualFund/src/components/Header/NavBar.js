import React from "react";
import { NavLink } from "react-router-dom";

import SubMenu from "./SubMenu";

const NavBar = (props) => {
  const NavList = props.data.map((item) => {
    return (
      <li className="nav-item" key={item.id}>
        {item.subMenu.length === 0 && (
          <NavLink className="nav-link" to={item.to}>
            <span className="nav-text">
              {item.icon && (
                <span className={`${item.icon} color-primary  font-18`}></span>
              )}
              {item.title
                ? item.icon && item.title
                  ? " " + item.title
                  : "" + item.title
                : ""}
            </span>
          </NavLink>
        )}

        {item.subMenu.length !== 0 && (
          <>
            <span className="nav-link">
              <span className="nav-text">
                {item.icon && (
                  <span
                    className={`${item.icon} color-primary  font-18`}
                  ></span>
                )}
                {item.title
                  ? item.icon && item.title
                    ? " " + item.title
                    : "" + item.title
                  : ""}
              </span>
            </span>
            <ul className="sub-menu">
              <SubMenu SubMenu={item.subMenu} />
            </ul>
          </>
        )}
      </li>
    );
  });
  return NavList;
};

export default NavBar;
