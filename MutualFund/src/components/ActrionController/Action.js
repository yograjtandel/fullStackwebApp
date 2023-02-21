import React from "react";

import useActions from "../../hooks/use-actions";

const Action = (props) => {
  const ActionClickHandler = (event) => {
    props.ActionClickHandler(event);
  };

  const DeleteRecordsHandler = (event) => {
    event.stopPropagation();
    useActions("delete", props.model);
  };

  return (
    <li className="nav-item dropdown" onClick={ActionClickHandler}>
      <span
        className="nav-link action-link dropdown-toggle"
        id="navbarDropdown"
        role="button"
      >
        <span className="bi bi-gear me-1" />
        <span className="action-text">Action</span>
      </span>
      <div
        className={`dropdown-menu ${props.Open ? "d-block" : "d-none"}`}
        aria-labelledby="navbarDropdown"
      >
        <span className="dropdown-item" onClick={DeleteRecordsHandler}>
          Delete
        </span>
        <span className="dropdown-item">Export</span>

        <span className="dropdown-item">Export All</span>
      </div>
    </li>
  );
};

export default Action;
