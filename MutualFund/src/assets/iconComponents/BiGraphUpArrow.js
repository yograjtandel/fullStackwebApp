import * as React from "react";

const SvgBiGraphUpArrow = (props) => (
  <svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#bi_graph-up-arrow_svg__a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0h1.875v28.125H30V30H0V0Zm18.75 6.563a.938.938 0 0 1 .938-.938h7.5a.937.937 0 0 1 .937.938v7.5a.938.938 0 0 1-1.875 0V9.186l-6.774 8.282a.938.938 0 0 1-1.388.07l-4.85-4.85-6.855 9.425a.938.938 0 0 1-1.516-1.103l7.5-10.312a.938.938 0 0 1 1.422-.113l4.892 4.894 6.528-7.98h-5.521a.937.937 0 0 1-.938-.938Z"
        fill="#003F66"
      />
    </g>
    <defs>
      <clipPath id="bi_graph-up-arrow_svg__a">
        <path fill="#fff" d="M0 0h30v30H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SvgBiGraphUpArrow;
