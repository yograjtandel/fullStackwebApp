import React from "react";
import uuid from "react-uuid";
import Notification from "../components/Form/Notification";

function UseNotificationManager(List, type) {
  return List.map((item) => {
    return <Notification type={type} msg={item.msg} key={item.id} />;
  });
}

export default UseNotificationManager;
