import React from "react";
import { useState } from "react";

const ActiveModelContext = React.createContext({
  model: false,
  route: false,
  setActiveModel: () => {},
});

export const ActiveModelContextProvider = (props) => {
  const [Model, setModel] = useState(false);
  const [Route, setRoute] = useState(false);

  const setActiveModel = (ActiveModel) => {
    setModel(ActiveModel.model);
    setRoute(ActiveModel.route);
  };

  return (
    <ActiveModelContext.Provider
      value={{
        model: Model,
        route: Route,
        setActiveModel: setActiveModel,
      }}
    >
      {props.children}
    </ActiveModelContext.Provider>
  );
};

export default ActiveModelContext;
