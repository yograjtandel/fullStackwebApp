import React, { useState } from "react";

import PopUp from "./PopUp";

import fun from "../../../assets/common/Images/birthday-cap-with-confetti-serpentine-explosion_1017-17924-1 1.png";

const SuccessMsg = (props) => {
  return (
    <PopUp
      centerFooter={true}
      button={[{ label: "Continue", class: "btn-success" }]}
      type="error-modal"
      id={props.id}
      footerclassName="mb-4 pt-0"
    >
      <h2 className=" text-center mb-2">It’s your Room...</h2>
      <p className="text-center mb-0">
        {" "}
        Hello ! Hardik prajapati <br />
        welcome to dashboad.
      </p>
      <div className="d-flex justify-content-center">
        <figure className="mb-0 pb-0">
          <img className="img-modal" src={fun} alt="" />
        </figure>
      </div>
    </PopUp>
  );
};

export default SuccessMsg;
