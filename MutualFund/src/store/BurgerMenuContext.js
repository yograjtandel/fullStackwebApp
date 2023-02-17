import React from "react";
import { useState } from "react";

const BurgerMenuContext = React.createContext({
  menuOpen: false,
  closeBurgerMenu: (open) => {}
});

export const BurgerMenuContextProvider = (props) => {
  const [menuOpen, setmenuOpen] = useState(false);

  const closeBurgerMenu = (open) => {
    setmenuOpen(open);
  };

  return (
    <BurgerMenuContext.Provider
      value={{
        menuOpen: menuOpen,
        closeBurgerMenu: closeBurgerMenu,
      }}
    >
      {props.children}
    </BurgerMenuContext.Provider>
  );
};

export default BurgerMenuContext;
