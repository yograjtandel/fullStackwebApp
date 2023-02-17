import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import FormContext from "../../store/FormContext";

const FormViewButton = (props) => {
  const ctx = useContext(FormContext);
  //   useEffect(() => {
  //     if (props.create) {
  //       ctx.setActiveMode("create");
  //     }
  //     if (props.edit) {
  //       ctx.setActiveMode("create");
  //     }
  //   }, []);

  const clickHandler = () => {
    if (!ctx.mode ) {
      ctx.setActiveMode("save");
    } else {
      ctx.setActiveMode("edit");
    }
  };
  return (
    <div className="mb-0 px-2">
      {(ctx.mode !== "save" && ctx.mode !== "edit") && (
        <NavLink to={`${props.to}`}>
          <button
            type={`button`}
            className={` custom-btn pspl-btn ${props.className}`}
            onClick={clickHandler}
          >
            {/* {props.create ? "Create" : ""}
          {props.edit ? "Edit" : ""} */}
            {!ctx.mode && "Create"}
            {ctx.mode === "read" && "Edit"}
            {/* {ctx.mode === "edit" && "Save"} */}
          </button>
        </NavLink>
      )}
      {(ctx.mode === "save" || ctx.mode === "edit") && (
        <button
          type="submit"
          className={` custom-btn pspl-btn ${props.className}`}
          disabled={props.FormIsValid}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default FormViewButton;
