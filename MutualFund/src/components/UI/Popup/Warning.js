import React, { useState } from "react";

import PopUp from "./PopUp";

import emojione_warning from "../../../assets/common/Images/emojione_warning.png";

const Warning = (props) => {
  const [isOpen, setisOpen] = useState(props.show);

  const CloseDialog = (event) => {
    if (event.target === event.currentTarget) {
      setisOpen(false);
    }
  };
  return (
    <PopUp
      centerFooter={true}
      button={[{ label: "Try Again !", class: "btn-warning" }]}
      id={props.id}
      type="error-modal"
      footerclassName="mb-4 pt-0"
    >
      <h2 className="text-warning text-center mb-2">Warning !</h2>
      <p className="text-center">
        ooho..!
        <br />
        you get wrong turn.
      </p>
      <div className="d-flex justify-content-center">
        <figure className="mb-0 pb-0">
          <img className="img-fluid" src={emojione_warning} alt="" />
        </figure>
      </div>
    </PopUp>
  );
};

export default Warning;
