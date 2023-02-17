import React from "react";

import NoDataFoundImg from "../../assets/web-asset/images/nodatafound.png"

const NoRecordFound = (props) => {
  return (
    <div className=" border-0">
      <div className="w-100">
        <div className="d-flex flex-column w-100">
          <figure className="w-100 d-flex justify-content-center ">
            <img className="nodataimg img-fluid" src={NoDataFoundImg} alt="img" />
          </figure>
          <h4 className="text-center">No Data Found</h4>
          <p className="text-center">
            {props.msg}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoRecordFound;
