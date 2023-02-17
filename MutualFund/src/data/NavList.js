import uuid from "react-uuid";

// import dashboard from "../assets/icons/dashboard.png";
// import master from "../assets/icons/master.png";
// import transection from "../assets/icons/transection.png";
// import report from "../assets/icons/report.png";
// import utility from "../assets/icons/uitility.png";
// import suitcase from "../assets/icons/suitcase.svg";

// import SvgDashboard from "../assets/new-icon-componen/HomeIcon";
// import SvgUser from "../assets/new-icon-componen/User";
// import SvgTrasection from "../assets/new-icon-componen/Insurance";
// import SvgMutualfund from "../assets/new-icon-componen/MutualFund";
// import SvgBuyonline from "../assets/new-icon-componen/BuyOnline";
// import SvgFinance from "../assets/new-icon-componen/Finance";
// import SvgUtility from "../assets/new-icon-componen/Utility";
// import SvgCrm from "../assets/new-icon-componen/Crm";
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
        title: "User",
        id: uuid(),
        icon: "",
        to: RoutPath.UserList,
        subMenu: [],
      },
      {
        title: "Branch",
        id: uuid(),
        icon: "",
        to: RoutPath.None,
        subMenu: [{
            title: "Branch List",
            id: uuid(),
            icon: "",
            to: RoutPath.BranchList,
            subMenu: [],
          },{
            title: "Map Branch To Zone",
            id: uuid(),
            icon: "",
            to: RoutPath.MapBranchToZone,
            subMenu: [],
          },],
      },
      {
        title: "Distributor",
        id: uuid(),
        icon: "",
        to: RoutPath.DistributorList,
        subMenu: [],
      },
      {
        title: "Client",
        id: uuid(),
        icon: "",
        to: RoutPath.ClientList,
        subMenu: [],
      },
      {
        title: "DepartmentList",
        id: uuid(),
        icon: "",
        to: RoutPath.DepartmentList,
        subMenu: [],
      },
      {
        title: "Family",
        id: uuid(),
        icon: "",
        to: RoutPath.FamliyList,
        subMenu: [],
      },
      {
        title: "Zone",
        id: uuid(),
        icon: "",
        to: RoutPath.None,
        subMenu: [
          {
            title: "ZoneList",
            id: uuid(),
            icon: "",
            to: RoutPath.ZoneList,
            subMenu: [],
          },
          {
            title: "Map City To Zone",
            id: uuid(),
            icon: "",
            to: RoutPath.MapCitytoZone,
            subMenu: [],
          },
        ],
      },
    ],
  },
  {
    title: "Insurance",
    id: uuid(),
    to: "/transection",
    subMenu: [],
  },
  {
    title: "Holding",
    id: uuid(),
    to: RoutPath.MfHolders,
    subMenu: [],
  },
  {
    title: "Mutual Funds",
    id: uuid(),
    to: RoutPath.MutualFund,
    subMenu: [],
  },
  //   {
  //     title: "Buy Online",
  //     id: uuid(),
  //     icon: SvgBuyonline,
  //     iconAlt: "buyonline",
  //     to: "/report",
  //     subMenu: [],
  //   },
  {
    title: "Finance",
    id: uuid(),
    to: "/utility",
    subMenu: [],
  },
  {
    title: "CRM",
    id: uuid(),
    to: "CRM",
    subMenu: [],
  },
  {
    title: "Utility",
    id: uuid(),
    to: "CRM",
    subMenu: [],
  },
];

export default NavList;
