import * as React from "react";

const SvgAvatarPerson = (props) => (
  <svg
    width={40}
    height={40}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity={0.8} clipPath="url(#avatar-person_svg__a)">
      <path
        d="M20 40c11.046 0 20-8.954 20-20S31.046 0 20 0 0 8.954 0 20s8.954 20 20 20Z"
        fill="#C1C7D0"
      />
      <path
        d="M32.188 31.918a17.228 17.228 0 0 1-12.137 4.957c-4.8 0-9.136-1.947-12.238-5.066V29.75c0-2.622 2.181-4.75 4.875-4.75h14.624c2.694 0 4.875 2.128 4.875 4.75v2.168ZM19.999 7.5a7.186 7.186 0 0 0-7.186 7.186A7.188 7.188 0 1 0 19.998 7.5Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="avatar-person_svg__a">
        <path fill="#fff" d="M0 0h40v40H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgAvatarPerson;
