import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./assets/scss/style.css";
import "react-datepicker/dist/react-datepicker.css";

import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Client from "./pages/Client";
import ClientList from "./pages/ClientList";

import { RoutPath } from "./data/Paths";

import FormContext from "./store/FormContext";
import AuthContext from "./store/AuthContext";

import RootLayout from "./components/UI/RootLayout";
import Loader from "./assets/web-asset/loading.gif";
import Loader_1 from "./assets/web-asset/loading-1.gif";
import SignUp from "./pages/SignUp";

function App(props) {
  const ctx = useContext(FormContext);
  const authCtx = useContext(AuthContext);
  const location = useLocation();
  const [Loading, setLoading] = useState(true);
  const [Token, setToken] = useState(true);

  useEffect(() => {
    setToken(authCtx.Token);
    setLoading(false);
  }, [authCtx.Token]);

  const loader = (
    <div className="gif-loader-wrapper h-100 w-100 d-flex justify-content-center align-items-center bg-transparent ">
      <img className="loader" src={Loader} height={100}></img>
      <img className="loader" src={Loader_1} height={100}></img>
    </div>
  );

  if (Loading) {
    return <h1>Loading from app....</h1>;
  }
  if (authCtx.error) {
    return <h1>{authCtx.error}</h1>;
  }
  if (!Token) {
    return (
      <main className={`${"h-100 w-100"}`}>
        {/* {loader} */}
        {/* {location.pathname !== RoutPath.Login && <h1>le le Loading....</h1>} */}
        {/* <Routes>
          {!Token && <Route path="/login" element={<Login />} />}

          <Route element={<Temp />}>
            <Route path="/404" element={<Page404 />} />
            <Route path="*" element={<Page404 />} />
            <Route path="*" element={<h1> lele Loading....</h1>} />
          </Route>
        </Routes> */}
        {!Token && (
          <Routes path={RoutPath.Home}>
            <Route index element={<Login />} />
            <Route path={RoutPath.Login} element={<Login />} />
            <Route path={RoutPath.SignUp} element={<SignUp />} />
          </Routes>
        )}
      </main>
    );
  }
  return (
    <Routes>
      {Token && (
        <Route element={<RootLayout />}>
          <Route index element={<ClientList />} />
          <Route path={RoutPath.Login} element={<Login />} />
          <Route path={RoutPath.ClientForm} element={<Client />} />
          <Route path={RoutPath.ClientList} element={<ClientList />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
