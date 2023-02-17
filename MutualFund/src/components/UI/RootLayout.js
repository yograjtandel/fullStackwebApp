import React,{use} from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";

import NavList from "../../data/NavList";

const RootLayout = () => {
  const Token = localStorage.getItem("token");
  return (
    <>
      {Token && <Header data={NavList} />}

      <main className={`main-wrapper-app`}>
        <Outlet />
      </main>
      {/* {authCtx.Token && <Footer />} */}
    </>
  );
};

export default RootLayout;
