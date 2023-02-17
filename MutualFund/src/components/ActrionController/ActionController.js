import React, { useState } from "react";

import Pagination from "./Pagination";
import Action from "./Action";
import Filter from "./Filter";
import Groupby from "./GroupBy";
import FormViewButton from "./FormViewButton";

import search from "../../assets/icons/search.svg";

const ActionConreoller = (props) => {
  const [ActionDropdownOpen, setActionDropdownOpen] = useState(false);
  const [FilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [GroupByDropdownOpen, setGroupByDropdownOpen] = useState(false);

  const ActionClickHandler = (event) => {
    event.stopPropagation();
    setFilterDropdownOpen(false);
    setGroupByDropdownOpen(false);
    setActionDropdownOpen((prev) => !prev);
  };

  const FilterClickHandler = (event) => {
    event.stopPropagation();
    setGroupByDropdownOpen(false);
    setActionDropdownOpen(false);
    setFilterDropdownOpen((prev) => !prev);
  };

  const GroupByClickHandler = (event) => {
    event.stopPropagation();
    setActionDropdownOpen(false);
    setFilterDropdownOpen(false);
    setGroupByDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <div className="w-100 row d-flex justify-content-between flex-wrap filter-wrapper py-2 m-0  pt-0 ">
        <div className="mb-0 p-1 col-md-3 col-sm-12">
          <input
            type="search"
            className={`form-control`}
            id="search_funds"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
        <div className="action-wrapper col-md-9 col-sm-12 d-flex justify-content-md-end mb-0 col-sm-12">
          <ul className="nav flex-row mb-0">
            {/* <Action
              ActionClickHandler={ActionClickHandler}
              Open={ActionDropdownOpen}
              model={props.Model}
            /> */}
            {props.Filter && (
              <Filter
                FilterClickHandler={FilterClickHandler}
                Open={FilterDropdownOpen}
              />
            )}
            {props.GroupBy && (
              <Groupby
                GroupByClickHandler={GroupByClickHandler}
                Open={GroupByDropdownOpen}
                GroupBy={props.GroupBy}
              />
            )}
            {props.Pagination && (
              <Pagination
                Pagination={props.Pagination.Pagination}
                fetchUserList={props.Pagination.fetchUserList}
              />
            )}
          </ul>
        </div>
      </div>
      {/* <div className="w-100 d-flex table-title-wrapper ">
        <div className="col-4">
          <h4 className="table-title">List</h4>
        </div>
        <div className="col-8 d-flex justify-content-end  ">
          <div className="input-group d-flex justify-content-end ">
            <input
              type="text"
              className={`form-control form-control-sm`}
              id="search_funds"
              placeholder="Search Funds"
              aria-label="Search"
            />
            <span className="input-group-text " id="basic-addon2">
              <img src={search} alt="search" />
            </span>
          </div>
        </div>
      </div>
      <div className="col-12 d-flex justify-content-between filter-wrapper">
        <div className="pagination mb-0">
          <nav aria-label="...">
            <ul className="pagination d-flex justify-content-center align-items-center mb-0">
              <li className="page-item">
                <FormViewButton
                  to={props.to}
                  create={props.create}
                  className="btn btn-primary btn-sm"
                />
              </li>
            </ul>
          </nav>
        </div>
        <div className="action-wrapper mb-0">
          <ul className="d-flex mb-0">
            <Action
              ActionClickHandler={ActionClickHandler}
              Open={ActionDropdownOpen}
              model={props.Model}
            />
            <Filter
              FilterClickHandler={FilterClickHandler}
              Open={FilterDropdownOpen}
            />
            <Groupby
              GroupByClickHandler={GroupByClickHandler}
              Open={GroupByDropdownOpen}
              GroupBy={props.GroupBy}
            />
            <Pagination
              Pagination={props.Pagination}
              fetchUserList={props.fetchUserList}
            />
          </ul>
        </div>
      </div> */}
    </>
  );
};

export default ActionConreoller;
