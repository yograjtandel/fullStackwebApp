import React from "react";
import { useState, useEffect } from "react";
import { EndPoint } from "../data/EndPoint";
import MutualFundSideNavList from "../data/MutualFundSideNavList";

const ActiveFilterContext = React.createContext({
  filter: [],
  Funds: [],
  onsetFilter: () => {},
});

export const ActiveFilterContextProvider = (props) => {
  const [Filter, setFilter] = useState([]);
  const [Funds, setFunds] = useState([]);
  const [Filters, setFilters] = useState([]);

  useEffect(() => {
    const getFunds = async () => {
      const qry = Filters.reduce((prm, item) => {
        if (prm.length === 0) {
          prm += `${Object.keys(item)[0]}=${item[Object.keys(item)[0]]}`;
        } else {
          prm += "&";
          prm += Object.keys(item)[0];
        }
        return prm;
      }, "");

      if (Filters.length !== 0) {
        const funds = await fetch(`${EndPoint}mf/funds/?${qry}`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/Json",
            //   "Authorization": "Bearer " + AuthCtx.access
            //   Authorization: Authorization,
          },
        });
        setFunds(await funds.json());
      }
    };
    getFunds();
  }, [Filters]);

  const setactiveFilter = (filter) => {
    setFilter(filter);
  };

  const findrecord = (id) => {
    const Mainindex = MutualFundSideNavList.findIndex((item) => item.id === id);

    let Subindex = {};
    MutualFundSideNavList.forEach((item, parentId) => {
      const index = item.subMenu.findIndex((subitem) => subitem.id === id);
      if (index !== -1) {
        Subindex = { main: parentId, sub: index };
      }
    });
    const index =
      Mainindex !== -1
        ? { main: Mainindex }
        : Subindex?.main !== -1
        ? Subindex
        : -1;
    return index;
  };

  const checkFilterExist = (id) => {
    const mainIndex = Filter.findIndex((item) => item.main.id === id);
    const subIndex = Filter.findIndex((item) => item.sub?.id === id);
    const submenuIndex = Filter.findIndex((item) => item.main.submenuId === id);
    const subsubmenuIndex = Filter.findIndex(
      (item) => item.sub?.submenuId === id
    );

    const temp = {
      index:
        mainIndex !== -1
          ? mainIndex
          : subIndex !== -1
          ? subIndex
          : submenuIndex !== -1
          ? submenuIndex
          : subsubmenuIndex !== -1
          ? subsubmenuIndex
          : -1,
      sub: subIndex !== -1 ? true : false,
      submenu: submenuIndex !== -1 ? true : false,
      subsubmenu: subsubmenuIndex !== -1 ? true : false,
    };
    return temp;
  };

  const AddFilter = (e, { tabId, sideBar = false }) => {
    // ToDo: Add logic for remove filter when same filter is clicked
    let filter = [...Filter];
    const subResponce = findrecord(e.currentTarget.id);
    const subrecord = MutualFundSideNavList[subResponce.main];
    if (sideBar) {
      // if clicked sidebar option
      const { index, sub } = checkFilterExist(tabId);
      const where = [];
      if (tabId === "amc") {
        where.push({ AMCId: e.currentTarget.value });
      }
      if (tabId === "sub_category") {
        where.push({
          subtype: subrecord.subMenu[subResponce.sub].id.replace("_", " "),
        });
      }
      if (tabId === "category") {
        where.push({ type: subrecord.subMenu[subResponce.sub].id });
      }

      setFilters(where);

      if (index !== -1) {
        if (!sub) {
          filter[index].main = {
            id: tabId,
            Title: subrecord.subMenu[subResponce.sub].Title,
            submenuId: subrecord.subMenu[subResponce.sub].id,
          };
          filter[index].sub = false;
        } else {
          filter[index].sub = {
            id: subrecord.id,
            Title: subrecord.subMenu[subResponce.sub].Title,
            submenuId: subrecord.subMenu[subResponce.sub].id,
          };
        }
      } else {
        if (tabId === "sub_category") {
          const index = filter.findIndex((item) => item.main.id === "category");
          filter[index].sub = {
            id: subrecord.id,
            Title: subrecord.subMenu[subResponce.sub].Title,
            submenuId: subrecord.subMenu[subResponce.sub].id,
          };
        } else {
          filter.push({
            main: {
              id: tabId,
              Title: subrecord.subMenu[subResponce.sub].Title,
              submenuId: subrecord.subMenu[subResponce.sub].id,
            },
          });
        }
      }
    } else {
      // if clicked invoke from tab
      const responce = findrecord(tabId);
      const record = MutualFundSideNavList[responce.main];

      if (record.id === "category") {
        if (
          ["fund_of_fund", "index_funds", "solution_oriented"].includes(
            record.subMenu[responce.sub].id
          )
        ) {
          filter.push({
            main: {
              id: record.id,
              Title: record.subMenu[responce.sub].Title,
              submenuId: record.subMenu[responce.sub].id,
            },
          });
        } else {
          filter.push({
            main: {
              id: record.id,
              Title: record.subMenu[responce.sub].Title,
              submenuId: record.subMenu[responce.sub].id,
            },
            sub: {
              id: subrecord.id,
              Title: subrecord.subMenu[subResponce.sub].Title,
              submenuId: subrecord.subMenu[subResponce.sub].id,
            },
          });
        }
      }
    }
    setFilter(filter);
  };

  const removeFilter = (id) => {
    const { index, sub } = checkFilterExist(id);
    const filter = [...Filter];
    if (sub) {
      filter[index].sub = [];
    } else {
      filter.splice(index, 1);
    }
    setFilter(filter);
  };

  return (
    <ActiveFilterContext.Provider
      value={{
        filter: Filter,
        funds: Funds,
        onsetFilter: setactiveFilter,
        checkFilterExist: checkFilterExist,
        removeFilter: removeFilter,
        AddFilter: AddFilter,
      }}
    >
      {props.children}
    </ActiveFilterContext.Provider>
  );
};

export default ActiveFilterContext;
