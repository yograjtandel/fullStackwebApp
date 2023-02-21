import React, { useState, useEffect } from "react";

const Pagination = (props) => {
  const [rangeInputValue, setrangeInputValue] = useState("");
  const [curentPage, setcurentPage] = useState(1);
  const [RecordSkiped, setRecordSkiped] = useState(0);
  const [start, setstart] = useState(1);
  const [end, setend] = useState(0);
  const no_of_page = props.Pagination.count;
  const page_size = props.Pagination.page_size;

  const calculateRange = () => {
    if (no_of_page) {
      //   let start_range = (+curentPage - 1) * page_size + 1;
      // //   let start_range = curentPage;
      //   let end_range = start_range;
      //   setstart(start_range);
      //   setend(end_range);

      //   if (page_size < no_of_page) {
      //     end_range = page_size * +curentPage;
      //     setend(end_range);
      //     if (end_range > no_of_page) {
      //       end_range = no_of_page;
      //       setend(end_range);
      //     }
      //   }
      //   setrangeInputValue(start_range + " - " + end_range);
      setstart(start);
      setend(+page_size + +start - 1);
      setrangeInputValue(
        `${start} -  ${
          +page_size + +start - 1 > no_of_page
            ? no_of_page + RecordSkiped
            : +page_size + +start - 1
        }`
      );
      //   setrangeInputValue(`${start} -  ${(+page_size + +start - 1)  > no_of_page ? no_of_page : (+page_size + +start - 1) }`);
      //   setrangeInputValue(`${start} - ${(+page_size + +start - 1) }`);
    }
  };
  useEffect(() => {
    calculateRange();
  }, [props]);

  const getList = (url) => {
    let qryparems = url.searchParams;
    let page = qryparems.get("page");
    if (!page) {
      page = 1;
    }
    setcurentPage(page);
    props.fetchUserList(url.search);
  };
  const nextHandler = () => {
    if (props.Pagination.next) {
      setstart(end + 1);
      setend(end + 1 + page_size < no_of_page ? end + page_size : no_of_page);
      if (props.Pagination.next) {
        const url = new URL(props.Pagination.next);
        getList(url);
      }
    }
  };

  const previousHandler = () => {
    if (props.Pagination.previous) {
      setstart(start - page_size);
      setend(start - 1);
      if (props.Pagination.previous) {
        const url = new URL(props.Pagination.previous);
        getList(url);
      }
    }
  };
  const rangeChange = (event) => {
    setrangeInputValue(event.target.value);
  };
  const rangeSubmit = (event) => {
    event.preventDefault();
    const value = rangeInputValue;
    if (value.includes("-")) {
      setRecordSkiped(+value.split("-")[0] - 1);
      setstart(value.split("-")[0]);
      setend(value.split("-")[1]);
    } else if (value.includes(",")) {
      setRecordSkiped(+value.split(",")[0] - 1);
      setstart(value.split(",")[0]);
      setend(value.split(",")[1]);
    } else {
      setRecordSkiped(+start - 1);
      setstart(start);
      setend(end);
    }
    // setcurentPage(value.split("-")[0].trim())
    props.fetchUserList(
      `?range=${value.split("-")[0].trim()},${value.split("-")[1].trim()}`
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
                /{no_of_page + RecordSkiped}
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
            <select >
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
