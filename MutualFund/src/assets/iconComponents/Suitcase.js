import * as React from "react";

const SvgSuitcase = (props) => (
  <svg
    // width="1em"
    // height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      opacity={0.2}
      d="M21 15v4.5a.75.75 0 0 1-.75.75H3.75A.75.75 0 0 1 3 19.5V15"
      fill="#CE120D"
    />
    <path
      d="M20.25 6H16.5v-.75A2.259 2.259 0 0 0 14.25 3h-4.5A2.26 2.26 0 0 0 7.5 5.25V6H3.75a1.5 1.5 0 0 0-1.5 1.5v12a1.5 1.5 0 0 0 1.5 1.5h16.5a1.5 1.5 0 0 0 1.5-1.5v-12a1.5 1.5 0 0 0-1.5-1.5ZM9 5.25a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75V6H9v-.75ZM20.25 7.5v6.75H3.75V7.5h16.5Zm0 12H3.75v-3.75h16.5v3.75Z"
      fill="#CE120D"
    />
  </svg>
);

export default SvgSuitcase;
