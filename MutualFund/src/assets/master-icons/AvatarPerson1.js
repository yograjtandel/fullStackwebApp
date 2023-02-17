import * as React from "react";

const SvgAvatarPerson1 = (props) => (
  <svg
    width={80}
    height={80}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity={0.8} clipPath="url(#avatar-person-1_svg__a)">
      <path
        d="M40 80c22.091 0 40-17.909 40-40S62.091 0 40 0 0 17.909 0 40s17.909 40 40 40Z"
        fill="#C1C7D0"
      />
      <path
        d="M64.375 63.837c-6.191 6.113-14.781 9.913-24.273 9.913-9.598 0-18.271-3.895-24.477-10.132V59.5c0-5.244 4.363-9.5 9.75-9.5h29.25c5.387 0 9.75 4.256 9.75 9.5v4.337ZM39.998 15c-7.94 0-14.373 6.434-14.373 14.373 0 7.943 6.434 14.377 14.373 14.377 7.939 0 14.377-6.434 14.377-14.377 0-7.94-6.438-14.373-14.377-14.373Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="avatar-person-1_svg__a">
        <path fill="#fff" d="M0 0h80v80H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgAvatarPerson1;
