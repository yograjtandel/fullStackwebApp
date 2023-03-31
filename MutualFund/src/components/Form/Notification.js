import React, { useState, useEffect } from "react";

const Notification = (props) => {
  const [dNone, setdNone] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setdNone(true);
    }, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    // type
    // 1 : error-alert
    // 2 : warning-alert
    // 3 : info-alert
    // 4 : success-alert
    <div className={`custom-alert ${props.type} ${dNone ? "d-none" : ""}`}>
      <span className="bi bi-x-circle-fill error-icon-alert"></span>
      <div>
        <p className="mb-0 pb-0 custom-alert-desc">{props.msg}</p>
      </div>
    </div>
  );
};

export default Notification;
