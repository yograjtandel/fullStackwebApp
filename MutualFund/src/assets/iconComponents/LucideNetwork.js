import * as React from "react";

const SvgLucideNetwork = (props) => (
  <svg
    width={60}
    height={60}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.5 40V30h35v10M30 30V20M22.5 5h15v15h-15V5ZM40 40h15v15H40V40ZM5 40h15v15H5V40Z"
      stroke="#003F66"
      strokeWidth={5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgLucideNetwork;
