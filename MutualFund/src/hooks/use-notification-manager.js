import React from "react";
import uuid from "react-uuid";
import Notification from "../components/Form/Notification";

const UseNotificationManager = (List, type) => {
  return List.map((item) => <Notification type={type} msg={item.msg} key={uuid()} />);
};

export default UseNotificationManager;
