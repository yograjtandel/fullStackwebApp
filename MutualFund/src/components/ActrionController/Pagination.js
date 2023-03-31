import React, { useState, useEffect } from "react";

const Pagination = (props) => {
  const [rangeInputValue, setrangeInputValue] = useState("");
  const [curentPage, setcurentPage] = useState(1);
  const [RecordSkiped, setRecordSkiped] = useState(0);
  const [start, setstart] = useState(1);
  const [end, setend] = useState(0);
  const [limit, setLimit] = useState(2);
  const no_of_page = props.Pagination.count;
  const page_size = props.Pagination.page_size;

  const calculateRange = () => {
    if (no_of_page) {
      setstart(start);
      setend(+page_size + +start - 1);
      setrangeInputValue(
        `${start} -  ${
          +page_size + +start - 1 > no_of_page
            ? no_of_page + RecordSkiped
            : +page_size + +start - 1
        }`
      );
    }
  };
  useEffect(() => {
    calculateRange();
  }, [props]);

  const getList = (page, start_offset, end_offset) => {
    props.fetchUserList(
      `page=${page}&limit=${limit}&range=${start_offset},${end_offset}`
    );
  };
  const nextHandler = () => {
    if (props.Pagination.next) {
      const start_offset = end + 1;
      const end_offset =
        end + 1 + page_size - 1 < no_of_page ? end + page_size : no_of_page;
      setstart(start_offset);
      setend(end_offset);
      if (props.Pagination.next) {
        getList(props.Pagination.next, start_offset, end_offset);
      }
    }
  };

  const previousHandler = () => {
    if (props.Pagination.previous) {
      const start_offset = start - page_size;
      const end_offset = start - 1;
      setstart(start_offset);
      setend(end_offset);
      if (props.Pagination.previous) {
        getList(props.Pagination.previous, start_offset, end_offset);
      }
    }
  };
  const rangeChange = (event) => {
    setrangeInputValue(event.target.value);
  };
  const rangeSubmit = (event) => {
    event.preventDefault();
    const value = rangeInputValue;
    const start_offset = value.split("-")[0].trim();
    const end_offset = value.split("-")[1].trim();
    if (value.includes("-")) {
      setRecordSkiped(+start_offset - 1);
      setstart(start_offset);
      setend(end_offset);
    } else if (value.includes(",")) {
      setRecordSkiped(+value.split(",")[0] - 1);
      setstart(value.split(",")[0]);
      setend(value.split(",")[1]);
    } else {
      setRecordSkiped(+start - 1);
      setstart(start);
      setend(end);
    }
    setLimit(+end_offset - +start_offset + 1);
    props.fetchUserList(
      `range=${start_offset},${end_offset}&limit=${
        +end_offset - +start_offset + 1
      }`
    );
  };
  return (
    <div className="pagination mb-0">
      {/* pagination */}
      <nav
        aria-label="..."
        className="d-flex justify-content-center align-items-center"
      >
        <ul className="pagination-details d-flex justify-content-center align-items-center mb-0">
          <li className="page-item d-flex">
            <span className="page-link">
              <form onSubmit={rangeSubmit}>
                <input
                  type="text"
                  id="start"
                  onChange={rangeChange}
                  name="start"
                  value={rangeInputValue}
                />{" "}
                /{no_of_page}
                {/* /{no_of_page + RecordSkiped} */}
              </form>
            </span>
          </li>
          {/* ${!props.Pagination.previous ? "disabled" : ""} */}

          <li
            className={`page-item prev-arrow ${
              !props.Pagination.previous ? "disabled" : ""
            }`}
            onClick={previousHandler}
          >
            <span className="page-link">
              <span className="bi bi-chevron-left ms-1"></span>
            </span>
          </li>
          <li
            className={`page-item next-arrow ${
              !props.Pagination.next ? "disabled" : ""
            }`}
            onClick={nextHandler}
          >
            <span className={`page-link`}>
              <span className="bi bi-chevron-right"></span>
            </span>
          </li>
          <li
            className="nav-item dropdown pagination-dropdown px-2"
            //   onClick={recordRangeClickHandler}
          >
            <select>
              <option value={50}>1-50</option>
              <option value={25}>1-25</option>
              <option value={100}>1-100</option>
              <option value={"all"}>all</option>
            </select>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
