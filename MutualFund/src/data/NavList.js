import uuid from "react-uuid";
import { RoutPath } from "./Paths";

const NavList = [
  {
    id: uuid(),
    icon: "fa fa-home",
    iconAlt: "dashboard",
    to: RoutPath.Home,
    subMenu: [],
  },
  {
    title: "Master",
    id: uuid(),
    to: RoutPath.None,
    subMenu: [
      {
        title: "Client",
        id: uuid(),
        icon: "",
        to: RoutPath.ClientList,
        subMenu: [],
      },
    ],
  },
];

export default NavList;
