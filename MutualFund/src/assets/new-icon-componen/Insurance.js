import * as React from "react";

const SvgInsurance = (props) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.25 2.5H3.75A1.25 1.25 0 0 0 2.5 3.75v12.5a1.25 1.25 0 0 0 1.25 1.25h12.5a1.25 1.25 0 0 0 1.25-1.25V3.75a1.25 1.25 0 0 0-1.25-1.25Z"
      stroke="#F24E1E"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="m8.75 12.917 2.083 1.666 3.334-4.166M5.833 6.25h8.334M5.833 9.583h3.334"
      stroke="#F24E1E"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgInsurance;
