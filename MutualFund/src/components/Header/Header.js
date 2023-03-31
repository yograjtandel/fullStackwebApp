import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import SvgLogo from "../../assets/iconComponents/Logo";
import user_image from "../../assets/web-asset/images/user-1.png";


import NavBar from "./NavBar";
import BurgerMenu from "./BurgerMenu";
import BurgerMenuContext from "../../store/BurgerMenuContext";
import AuthContext from "../../store/AuthContext";

const Header = (props) => {
  const ctx = useContext(BurgerMenuContext);
  const authCtx = useContext(AuthContext);

  const LogoutHandler = () => {
    authCtx.onLogout();
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">
            <SvgLogo width="114" height="57" viewBox="0 0 114 57" />
          </NavLink>
          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          <BurgerMenu />
          <div
            className={`collapse navbar-collapse ${ctx.menuOpen ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <NavBar data={props.data} />
              <li className="dropdown p-0 m-0 nav-item position-relative nav-item">
                <a
                  className="nav-link p-0 m-0 dropdown-toggle text-start bi bi-user-circle color-primary me-2 d-flex justify-content-md-start justify-content-sm-start align-items-center"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="nav-text p-0 m-0"> My Profile </span>
                </a>

                <ul className="dropdown-menu profile-dropdown">
                  <li className="nav-link">
                    <div className="d-flex justify-content-start ps-3 align-items-center pb-1 mb-2 border-bottom ">
                      <figure className="m-0 p-0 rounded-circle">
                        <img
                          src={user_image}
                          className="img-fluid profile-img mb-2 me-1"
                          alt=""
                        />
                      </figure>
                      <div>
                        <p className=" m-0 p-0 w-100 text-start font-14">
                          User Name
                        </p>
                        <p className="m-0 p-0 font-12">test@email.com</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a className="dropdown-item text-start" href="#">
                      <span className="bi bi-person me-2"></span>Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item text-start" href="#">
                      <span className="bi bi-telephone me-2"></span>Help &
                      Support
                    </a>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-start"
                      onClick={LogoutHandler}
                    >
                      {" "}
                      <span className="bi bi-box-arrow-left me-2"></span> LogOut
                    </button>
                  </li>
                </ul>
              </li>
              {props.children}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
