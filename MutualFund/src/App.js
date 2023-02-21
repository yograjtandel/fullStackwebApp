import React, { useContext, useState, useEffect } from "react";

import "./assets/scss/style.css";
import "react-datepicker/dist/react-datepicker.css";

import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Client from "./pages/Client";
import ClientList from "./pages/ClientList";

import { RoutPath } from "./data/Paths";

import AuthContext from "./store/AuthContext";

import RootLayout from "./components/UI/RootLayout";
import SignUp from "./pages/SignUp";

function App(props) {
  const authCtx = useContext(AuthContext);
  const [Loading, setLoading] = useState(true);
  const [Token, setToken] = useState(true);

  useEffect(() => {
    setToken(authCtx.Token);
    setLoading(false);
  }, [authCtx.Token]);

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
