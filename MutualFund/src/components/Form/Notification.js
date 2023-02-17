import React, { useState, useEffect } from "react";

const Notification = (props) => {
  const [dNone, setdNone] = useState(false);
  useEffect(() => {
    const timeout =   setTimeout(() => {
        setdNone(true);
      }, 4000);
    return () => {
        clearTimeout(timeout)
    } 
  }, [])

  return (
    // <div className={`o_notification_manager  ${dNone ? 'd-none' : ''}`}>
    //   <div
    //     role="alert"
    //     aria-live="assertive"
    //     aria-atomic="true"
    //     className="o_notification o_notification_fade border border-danger bg-white mb-2 position-relative o_notification_fade-enter-active"
    //   >
    //     <div className="o_notification_body ps-3 pe-5 py-2">
    //       <div className="me-auto o_notification_content">{props.msg}</div>
    //     </div>
    //   </div>
    // </div>

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
