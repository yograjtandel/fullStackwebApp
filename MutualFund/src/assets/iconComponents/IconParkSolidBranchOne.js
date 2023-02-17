import * as React from "react";

const SvgIconParkSolidBranchOne = (props) => (
  <svg
    width={60}
    height={60}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="icon-park-solid_branch-one_svg__a"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={2}
      y={8}
      width={56}
      height={46}
    >
      <path
        d="M30 41.25v-22.5"
        stroke="#fff"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 11.25h35v7.5h-35v-7.5Z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="m10 40 7.5-8.75h24.968L50 40"
        stroke="#fff"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 41.25h10v10H5v-10Zm20 0h10v10H25v-10Zm20 0h10v10H45v-10Z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </mask>
    <g mask="url(#icon-park-solid_branch-one_svg__a)">
      <path d="M0 0h60v60H0V0Z" fill="#003F66" />
    </g>
  </svg>
);

export default SvgIconParkSolidBranchOne;
