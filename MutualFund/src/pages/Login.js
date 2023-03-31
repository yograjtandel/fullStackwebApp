import React, { useContext, useState } from "react";
import uuid from "react-uuid";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../assets/web-asset/images/login-logo-2.png";
import AuthContext from "../store/AuthContext";
import UseNotificationManager from "../hooks/UseNotificationManager";
import { RoutPath } from "../data/Paths";

const Login = () => {
  const AuthCtx = useContext(AuthContext);
  const [NotificationList, setNotificationList] = useState([]);
  const notificationList = UseNotificationManager(
    NotificationList,
    "error-alert"
  );
  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    navigate("/");
    return;
  }

  const OnLogin = async (event) => {
    event.preventDefault();
    const res = await AuthCtx.onLogin(
      event.target.email.value,
      event.target.password.value
    );

    if (res >= 400) {
      setNotificationList((prev) => [
        ...prev, 
        { id: uuid(), msg: "Something went wrong..........!" },
      ]);
    }
  };

  const jsx = (
    <section className="credential-section h-100 w-100">
      <div className="container h-100 w-100">
        <div className="error-sidebar">{notificationList}</div>
        <div className="row d-flex justify-content-center align-items-center h-100 w-100 m-0">
          <div className="card col-md-8 col-sm-12 credential-card">
            <div className="col-md-6 login-img-wrapper d-flex justify-content-center align-items-center">
              <figure className="m-0 p-0">
                <img src={Logo} className="img-fluid" alt="img" />
              </figure>
            </div>
            <div className="col-md-6 col-sm-12 ">
              <form onSubmit={OnLogin}>
                <h4 className="h3 mb-3"> Sign in</h4>
                <div className=" mb-3">
                  <select
                    className="form-select form-control"
                    aria-label="Default select example"
                  >
                    <option defaultValue={"login_as"}>Login As</option>
                    <option value="1">Client</option>
                    <option value="2">Admin</option>
                    <option value="3">Distributor</option>
                  </select>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                  />
                </div>
                <div className="form-content d-flex justify-content-between align-items-center">
                  <div className="checkbox mb-3">
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                      >
                        Save Password
                      </label>
                    </div>
                    <a className="mb-2 forgot-pwd" href="forget-password.html">
                      {" "}
                      <label className="forget-pwd">
                        <span className="fa fa-exclamation-circle icon me-2"></span>{" "}
                        Forgot Password
                      </label>
                    </a>
                  </div>
                  <div className="btn-wrapper">
                    <button className="custom-btn" type="submit">
                      Sign in
                    </button>
                  </div>
                  {/* <!-- </div> -->   */}
                </div>
                <div className="col-md-12 mt-3 mb-3">
                  <label className="credentail-link">
                    Not Registered?{" "}
                    <Link
                      to={`../${RoutPath.SignUp}`}
                      className="credential-link"
                    >
                      Create Your Account
                    </Link>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  return jsx;
};

export default Login;
