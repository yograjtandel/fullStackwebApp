import React from "react";
import Notification from "../components/Form/Notification";

const UseNotificationManager = (List, type) => {
  return List.map((item) => <Notification type={type} msg={item.msg} />);
};

export default UseNotificationManager;
