import React from "react";

const Col = props => {
    return <div className={`col-lg-6 col-md-6 col-sm-12 position-relative ${props.className}`}>
        {props.children}
    </div>
}

export default Col;
