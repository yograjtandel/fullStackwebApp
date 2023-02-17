import * as React from "react";

const SvgReport = (props) => (
  <svg
    // width="1em"
    // height="1em"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.75 15.75h7v1.75h-7v-1.75Zm0-4.375h10.5v1.75H8.75v-1.75Zm0 8.75h4.375v1.75H8.75v-1.75Z"
      fill="#000"
    />
    <path
      d="M21.875 4.375H19.25V3.5a1.75 1.75 0 0 0-1.75-1.75h-7A1.75 1.75 0 0 0 8.75 3.5v.875H6.125a1.75 1.75 0 0 0-1.75 1.75V24.5a1.75 1.75 0 0 0 1.75 1.75h15.75a1.75 1.75 0 0 0 1.75-1.75V6.125a1.75 1.75 0 0 0-1.75-1.75ZM10.5 3.5h7V7h-7V3.5Zm11.375 21H6.125V6.125H8.75V8.75h10.5V6.125h2.625V24.5Z"
      fill="#000"
    />
  </svg>
);

export default SvgReport;
