import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../assets/web-asset/images/login-logo-2.png";
import UseNotificationManager from "../hooks/use-notification-manager";
import { RoutPath } from "../data/Paths";

import useActions from "../hooks/use-actions";

const SignUp = () => {
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

  const OnSignup = async (event) => {
    event.preventDefault();
    const res = await useActions("post", "auth/signup", false, {
      user_name: event.target.user_name.value,
      email: event.target.email.value,
      mobile: event.target.mobile.value,
      password: event.target.password.value,
      isd_code: "+91"
    });
    // const res = await AuthCtx.onLogin(
    //   event.target.email.value,
    //   event.target.password.value
    // );
    if (res >= 400) {
      setNotificationList((prev) => [
        ...prev,
        { msg: "Something went wrong..........!" },
      ]);
    }
    else {
        navigate(RoutPath.Login);
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
              <form onSubmit={OnSignup}>
                <h4 className="h3 mb-3">Let’s Sign up</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="user_name"
                    placeholder="User Name"
                  />
                  {/* <!-- <label for="floatingInput">Name</label> --> */}
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                  />
                  {/* <!-- <label for="floatingInput">Email address</label> --> */}
                </div>
                <div className="mb-3">
                  <input
                    type="string"
                    className="form-control"
                    id="mobile"
                    placeholder="Mobile No.*"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="ConfirmPassword"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="form-content d-flex justify-content-between flex-wrap">
                  <div className="checkbox mb-3">
                    <label className="forget-pwd">
                      <span className="fa fa-exclamation-circle icon"></span>{" "}
                      Already register
                      <Link
                        to={`../${RoutPath.Login}`}
                        className="credential-link"
                      >
                        <span> Sign-in</span>
                      </Link>
                    </label>
                  </div>
                  <button className="custom-btn" type="submit">
                    Sign Up
                  </button>
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

export default SignUp;
