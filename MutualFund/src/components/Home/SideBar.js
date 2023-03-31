import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import MutualFundSideNavList from "../../data/MutualFundSideNavList";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

import ActiveFilterContext from "../../store/ActiveFundFilterContext";

import { FundSubcategories } from "../../data/Home";
import uuid from "react-uuid";

const SideBar = (props) => {
  const [NavList, setNavList] = useState([...props.NavList]);
  const filterCtx = useContext(ActiveFilterContext);

  useEffect(() => {
    const Token = localStorage.getItem("token");
    let Authorization = Token
      ? "Bearer " +
        JSON.parse(Token)["token"].access +
        " " +
        JSON.parse(Token)["token"].refresh
      : false;
    const GetAMC = async () => {
      const res = await axios.get("http://localhost:5000/mf/amc", {
        headers: {
          "Content-Type": "Application/Json",
          Authorization: Authorization,
        },
      });
      const NavItems = [...NavList];
      const AMCList = res.data.map((item, index) => {
        return {
          id: item.name.replace(/ /g, "_"),
          Title: item.name,
          dbId: item.id,
        };
      });
      NavItems[NavItems.findIndex((item) => item.id === "amc")].subMenu =
        AMCList;
      setNavList(NavItems);
    };
    GetAMC();
  }, []);

  const SideBarClickHandler = (e, item) => {
    const tabId = e.currentTarget.id;
      if (item.id === "category") {
      const categorys = FundSubcategories.filter((item) => item.id === tabId)[0]
        .SubCategory;

      const list = [...MutualFundSideNavList];
      list.forEach((item) => {
        if (item.id === "sub_category") {
          item["subMenu"] = categorys;
        }
      });
      setNavList(list);
    }
    filterCtx.AddFilter(e, { tabId: item.id, sideBar: true, dbId: e.currentTarget.value });
  };

  const sideBar = NavList.map((item) => {
    const menu = item.subMenu.map((menu) => (
      <ListItem
        pl={"1rem"}
        py={"8px"}
        _hover={{
          color: "blue.400",
          background: "blackAlpha.50",
        }}
        id={menu.id}
        value = {menu.dbId ? menu.dbId : false}
        onClick={(e) => {
          SideBarClickHandler(e, item);
        }}
        key={uuid()}
      >
        <Box as="span">{menu.Title}</Box>
      </ListItem>
    ));
    return (
      <AccordionItem
        borderTop={0}
        borderBottom={"1px solid"}
        borderColor="gray.300"
        key={uuid()}
      >
        <AccordionButton
          px={2}
          pt={"30px"}
          pb="20px"
          color="blue.400"
          _hover={{
            color: "blue.600",
            background: "blackAlpha.50",
          }}
        >
          <Box as="span" flex="1" textAlign="left">
            {item.Title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel p={0}>
          <UnorderedList m={0} maxH="220px" overflow={"auto"}>
            {menu}
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    );
  });

  return (
    <Accordion
      w={"100%"}
      fontSize="15px"
      lineHeight={"24px"}
      fontWeight={"400"}
      allowToggle
    >
      {sideBar}
    </Accordion>
  );
};

export default SideBar;
