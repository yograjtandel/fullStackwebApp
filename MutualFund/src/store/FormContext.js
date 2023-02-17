import React, { useEffect } from "react";
import { useState } from "react";

const FormContext = React.createContext({
  mode: false,
  ActiveView: false,
  Activerecord: {},
  setActiveMode: () => {},
  setActiveview: () => {},
  setActiveRecord: () => {},
});

export const FormContextProvider = (props) => {
  const [Mode, setMode] = useState(false);
  const [Activerecord, setActiverecord] = useState({});
  const [ActiveView, setActiveView] = useState({});

  useEffect(() => {
    const record = localStorage.getItem("ActiveRecord");
    const mode = localStorage.getItem("ActiveView") === "list" ? false: localStorage.getItem("ActiveMode");
    if (record && mode) {
      setActiverecord(JSON.parse(record));
      setMode(mode);
    }
  }, []);

  const setActiveMode = (mode) => {
    setMode(mode);
    localStorage.setItem("ActiveMode", mode);
  };
  const setActiveview = (view) => {
    setActiveView(view);
    localStorage.setItem("ActiveView", view);
  }

  const setActiveRecord = (record) => {
    setActiverecord(record);
    localStorage.setItem("ActiveRecord", JSON.stringify(record));
  };
  return (
    <FormContext.Provider
      value={{
        mode: Mode,
        Activerecord: Activerecord,
        ActiveView: ActiveView,
        setActiveMode: setActiveMode,
        setActiveview: setActiveview,
        setActiveRecord: setActiveRecord,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};

export default FormContext;
