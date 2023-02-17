import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useActions from "../hooks/use-actions";

import { RoutPath } from "../data/Paths";

import jwt_decode from "jwt-decode";

const AuthContext = React.createContext({
  Token: "",
  onLogin: (Token) => {},
  onLogout: () => {},
  onResetPassword: (tokne) => {},
  error: false,
});

export const AuthContextProvider = (props) => {
  const [Token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [error, seterror] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  let updateToken = async (token = false) => {
    try {
      const refreshToken = token
        ? JSON.parse(token).refresh
        : JSON.parse(Token).refresh;
      let response = await useActions("post", RoutPath.RefreshToken, false, {
        refresh: refreshToken,
      });
      let data = await response.json();

      if (response.status === 200) {
        return data;
      } else {
        onLogout();
      }
    } catch (err) {
      seterror("something went wrong");
      onLogout();
    }
  };

  const decode_token = (data = false) => {
    if (data) {
      return {
        access: jwt_decode(data.access),
        refresh: jwt_decode(data.refresh),
      };
    }
    return new Error("expecte token as argument");
  };

  const onLogin = async (email, password) => {
    if (email && password) {
      try {
        const res = await useActions("post", RoutPath.LoginApi, false, {
          email: email,
          password: password,
        });
        if (res.status === 200) {
          const data = await res.json();
          setToken(data);
          localStorage.setItem("token", JSON.stringify(data));
          localStorage.setItem("email", email);
          navigate(RoutPath.Home);
        }
        return res.status;
      } catch (err) {
        return 400;
      }
    }
    return 401;
  };

  const onLogout = () => {
    setToken(null);
    localStorage.clear();
    navigate(`${RoutPath.Login}`);
  };

  const onResetPassword = (token) => {
    // setToken(token);
    // localStorage.setItem("token", Token);
  };

  // insted of useEffect we can directly fetch data from local storage,
  // then set it as initial state of Token.
  // this is possible because localstorage is syncronus api
  // by doing this we are not override any state
  useEffect(() => {
    let fourMinutes = 1000 * 60 * 1;

    let interval = setInterval(async () => {
      if (Token) {
        const data = await updateToken();
        if (data) {
          setToken(data);
          // setUser(jwt_decode(data.access));
          localStorage.setItem("token", JSON.stringify(data));
        }
      }
    }, fourMinutes, Token);

    const setData = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      if (token) {
        if (Loading) {
          const data = await updateToken(token);
          if (data) {
            setToken(data);
            // setUser(jwt_decode(data.access));
            localStorage.setItem("token", JSON.stringify(data));
            setLoading(false);
          }
        } else {
          setToken(token);
          setEmail(email);
          if (location.pathname !== RoutPath.Login) {
            navigate(location.pathname);
          } else {
            navigate(RoutPath.Home);
          }
        }
      } else {
        // if (Object.values(RoutPath).includes(location.pathname)) {
        //   navigate(`${RoutPath.Login}`);
        // } else {
          navigate(location.pathname);
        }
    //   }
    };

    setData();
    setLoading(false);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <AuthContext.Provider
      value={{
        Token: Token,
        email: email,
        onLogin: onLogin,
        onLogout: onLogout,
        onResetPassword: onResetPassword,
        error: error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
