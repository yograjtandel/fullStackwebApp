import React from "react";
import uuid from "react-uuid";

import groupby from "../../assets/icons/groupby.svg";

const Groupby = (props) => {
  const GroupByClickHandler = (event) => {
    props.GroupByClickHandler(event);
  };

  return (
    <li className="nav-item dropdown" onClick={GroupByClickHandler}>
      <span
        className="nav-link groupby-link dropdown-toggle"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="bi bi-stack me-1" />
        <span className="action-text">Groupby</span>
      </span>
      <div
        className={`dropdown-menu ${props.Open ? "d-block" : "d-none"}`}
        aria-labelledby="navbarDropdown"
      >
        {props.GroupBy.map((item) => {
          return (
            <span className="dropdown-item" onClick={item.onClick} key={uuid()}>
              {item.item}
            </span>
          );
        })}
        <span className="dropdown-item">Another action</span>
        <span className="dropdown-item">Something</span>
      </div>
    </li>
  );
};

export default Groupby;
