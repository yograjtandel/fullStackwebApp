import React from "react";
import ReactDOM from "react-dom/client";
// import "./assets/scss/index.css"
import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BurgerMenuContextProvider } from "./store/BurgerMenuContext";
import { FormContextProvider } from "./store/FormContext";
// import { ActiveFilterContextProvider } from "./store/ActiveFundFilterContext";
import { AuthContextProvider } from "./store/AuthContext";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <BurgerMenuContextProvider>
        <FormContextProvider>
          {/* <ActiveFilterContextProvider> */}
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
          {/* </ActiveFilterContextProvider> */}
        </FormContextProvider>
      </BurgerMenuContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
