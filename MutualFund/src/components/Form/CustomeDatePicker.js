import React, { useState } from "react";
import DatePicker from "react-datepicker";

const CustomeDatePicker = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const ToDay = new Date();
  const years = range(1990, ToDay.getFullYear() + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  function range(start, end) {
    return new Array(end - start).fill().map((d, i) => i + start);
  }

  return (
    <DatePicker
      dateFormat={props.dateFormat}
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        //   decreaseMonth,
        //   increaseMonth,
        //   prevMonthButtonDisabled,
        //   nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
          {"<"}
        </button> */}
          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
          {">"}
        </button> */}
        </div>
      )}
      selected={props.selected}
      onChange={props.onChange}
      onBlur={props.onBlur}
      className={props.className}
      onCalendarClose={props.onCalendarClose}
      disabled={props.disabled}
    />
  );
};

export default CustomeDatePicker;
