import React from "react";
import { useContext } from "react";
import BurgerMenuContext from "../../store/BurgerMenuContext";

const BurgerMenu = (props) => {
  const ctx = useContext(BurgerMenuContext);
  const burgermenuClickHandler = () => {
    ctx.closeBurgerMenu(!ctx.menuOpen);
  };

  return (
    // <div
    //   className={`burger2 menu ${ctx.menuOpen ? "open" : ""}`}
    //   onClick={burgermenuClickHandler}
    // >
    //   <div className="icon"></div>
    // </div>
    <button
      className={`navbar-toggler ${ctx.menuOpen ? "" : "collapsed"}`}
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded={ctx.menuOpen ? true : false}
      aria-label="Toggle navigation"
      onClick={burgermenuClickHandler}
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  );
};

export default BurgerMenu;
