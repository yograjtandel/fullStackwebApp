import React, { useState } from "react";

import PopUp from "./PopUp";

import thumb from "../../../assets/common/Images/vaadin_thumbs-up-o.png";

const Success = (props) => {
  return (
    <PopUp
      centerFooter={true}
      button={[{ label: "Continue", class: "btn-success" }]}
      type="error-modal"
      id={props.id}
      footerclassName="mb-4 pt-0"
    >
      <h2 className="text-success text-center mb-2">Success</h2>
      <p className="text-center">
        Woo ooh..! <br />
        your account has been created.
      </p>
      <div className="d-flex justify-content-center">
        <figure className="mb-0 pb-0">
          <img src={thumb} alt="" />
        </figure>
      </div>
    </PopUp>
  );
};

export default Success;
