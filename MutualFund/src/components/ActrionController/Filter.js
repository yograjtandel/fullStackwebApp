import React from "react";
import filter from "../../assets/icons/filter.svg";

const Filter = (props) => {
  const FilterClickHandler = (event) => {
    props.FilterClickHandler(event);
  };

  return (
    <li className="nav-item dropdown" onClick={FilterClickHandler}>
      <span
        className="nav-link filter-link dropdown-toggle"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="bi bi-funnel me-1" />
        <span className="action-text">Filter</span>
      </span>
      <div
        className={`dropdown-menu ${props.Open ? "d-block" : "d-none"}`}
        aria-labelledby="navbarDropdown"
      >
        <span className="dropdown-item">Action</span>
        <span className="dropdown-item">Another action</span>
        <span className="dropdown-item">Something else here</span>
      </div>
    </li>
  );
};

export default Filter;
