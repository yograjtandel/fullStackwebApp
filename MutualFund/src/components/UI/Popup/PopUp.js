import React, { useState } from "react";
import uuid from "react-uuid";

const PopUp = (props) => {
  const [isOpen, setisOpen] = useState(props.show);

  const CloseDialog = (event) => {
    if (event.target === event.currentTarget) {
      setisOpen(false);
    }
  };

  return (
    <div
      className={`modal fade ${props.type ? props.type : ""}`}
      id={props.id}
      onClick={CloseDialog}
      tabIndex="-1"
      aria-labelledby={props.id}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div
          className={`modal-content ${
            props.type !== "okmodal" ? "h-100" : ""
          } `}
        >
          <div
            className={`modal-header ${props.centerFooter ? "border-0" : ""}`}
          >
            {props.title && (
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {props.title ? props.title : ""}
              </h1>
            )}
            <button
              type="button"
              className="btn-close border-radius"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={CloseDialog}
            ></button>
          </div>
          <div
            className={`modal-body ${
              props.centerFooter
                ? "border-0 d-flex justify-content-center align-items-center flex-column"
                : ""
            }`}
          >
            {props.children}
          </div>
          <div
            className={`modal-footer ${
              props.centerFooter
                ? "text-center d-flex justify-content-center border-0"
                : ""
            } ${props.footerClass ? props.footerClass : ""}`}
          >
            {props.button.map((item) => {
              return (
                <button
                  type="button"
                  className={`btn ${item.class}`}
                  onClick={CloseDialog}
                  data-bs-dismiss={`${item.type && item.type === "close" ? "modal" : ""}`}
                  key={uuid()}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
