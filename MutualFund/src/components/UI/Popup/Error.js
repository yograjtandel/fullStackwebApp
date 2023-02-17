import React, { useState } from "react";

import PopUp from "./PopUp";

import thumb from "../../../assets/common/Images/vaadin_thumbs-down.png";

const Error = (props) => {
  const [isOpen, setisOpen] = useState(props.show);

  const CloseDialog = (event) => {
    if (event.target === event.currentTarget) {
      setisOpen(false);
    }
  };
  return (
    <PopUp
      centerFooter={true}
      button={[{ label: "Try Again !", class: "btn-danger" }]}
      id={props.id}
      type="error-modal"
      footerclassName="mb-4 pt-0"
    >
      <h2 className="text-danger text-center mb-2">Ooop it’s Error !</h2>
      <p className="text-center">
        {" "}
        ooops..!
        <br />
        something is wrong..
      </p>
      <div className="d-flex justify-content-center">
        <figure className="mb-0 pb-0">
          <img className="img-fluid" src={thumb} alt="" />
        </figure>
      </div>
    </PopUp>
    //</div>
    //   <div className="modal-footer text-center d-flex justify-content-center border-0 mb-4 pt-0">
    //     <button type="button" className="btn btn-danger">
    //       Try Again !
    //     </button>
    //   </div>
  );
};

export default Error;
