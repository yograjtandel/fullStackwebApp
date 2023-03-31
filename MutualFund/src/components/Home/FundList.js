import React, { useContext } from "react";

import {
  Box,
  Button,
  Image,
  ListItem,
  Text,
  Flex,
  UnorderedList,
} from "@chakra-ui/react";

import BrandIcon from "../../assets/images/Coins_SVGs-01.svg";

import ActiveFilterContext from "../../store/ActiveFundFilterContext";
import uuid from "react-uuid";

const FundList = () => {
  const filterCtx = useContext(ActiveFilterContext);

  const removeFilter = (event) => {
    if (event.currentTarget.id) {
      filterCtx.removeFilter(event.currentTarget.id);
      return;
    }
  };

  const FilterList = filterCtx.filter.map((item) => {
    return (
      <>
        {["min_purchase_amount", "expense_ratio", "amu", "cagr"].includes(
          item.main.id
        ) && (
          <ListItem
            fontSize="15px"
            fontWeight="400"
            w={"fit-content"}
            px="10px"
            py="5px"
            bg="blue.50"
            borderRadius="40px"
            color="blue.400"
            mb="15px"
            ml="13px"
            _hover={{
              cursor: "pointer",
            }}
            key={uuid()}
          >
            <Text as="span" pl="15px">
              {item.main.Title}
            </Text>
            <Text as="span" pl="15px">
              {item.sub.min} - {item.sub.max}
            </Text>
            <Text
              as="span"
              pl="15px"
              pr="12px"
              textAlign={"center"}
              id={item.main.id}
              onClick={removeFilter}
            >
              x
            </Text>
          </ListItem>
        )}
        {item.main.Title &&
          !["min_purchase_amount", "expense_ratio", "amu", "cagr"].includes(
            item.main.id
          ) && (
            <ListItem
              fontSize="15px"
              fontWeight="400"
              w={"fit-content"}
              px="10px"
              py="5px"
              bg="blue.50"
              borderRadius="40px"
              color="blue.400"
              mb="15px"
              ml="13px"
              _hover={{
                cursor: "pointer",
              }}
              key={item.id}
            >
              <Text as="span" pl="15px">
                {item.main.Title}
              </Text>
              <Text
                as="span"
                pl="15px"
                pr="12px"
                textAlign={"center"}
                id={item.main.id}
                onClick={removeFilter}
              >
                x
              </Text>
            </ListItem>
          )}

        {item.sub &&
          item.sub.length !== 0 &&
          !["min_purchase_amount", "expense_ratio", "amu", "cagr"].includes(
            item.main.id
          ) && (
            <ListItem
              fontSize="15px"
              fontWeight="400"
              w={"fit-content"}
              px="10px"
              py="5px"
              bg="blue.50"
              borderRadius="40px"
              color="blue.400"
              mb="15px"
              ml="13px"
              _hover={{
                cursor: "pointer",
              }}
              key={item.id}
              id="aksdmasm"
            >
              <Text as="span" pl="15px">
                {item.sub?.Title}
              </Text>
              <Text
                as="span"
                pl="15px"
                pr="12px"
                textAlign={"center"}
                id={item.sub.id}
                onClick={removeFilter}
              >
                x
              </Text>
            </ListItem>
          )}
      </>
    );
  });

  const Funds = filterCtx.funds.map((item) => (
    <ListItem px="5px" py="12px" borderBottom={"1px"} borderColor="gray.400">
      <Flex>
        <Box pt={"7px"}>
          <Image src={BrandIcon} w="42px" h="42px" />
        </Box>
        <Box pl="10px">
          <Box py="5px">
            <Text>{item.name}</Text>
          </Box>
          <Flex fontWeight={"400"} fontSize="12px" color={"gray.500"}>
            <Text as={"span"}>AUM</Text>
            <Text as={"span"} ml="15px" color={"gray.800"}>
              ₹33,049.77 Cr.
            </Text>
            <Text as={"span"} ml="15px">
              {item.dividend}
            </Text>
            <Text as={"span"} ml="15px">
              {item.type}
            </Text>
            <Text as={"span"} ml="15px">
            {item.subtype}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </ListItem>
  ));
  return (
    <>
      <Text textAlign={"right"}>771 results</Text>
      <Flex pb="15px">
        <Box w={"74%"} ml="0">
          <UnorderedList display={"flex"} flexWrap="wrap">
            {FilterList}
          </UnorderedList>
        </Box>
        <Box w="22%" ml="4%" textAlign={"right"}>
          <Button
            borderRadius="40px"
            colorScheme="blue"
            size="sm"
            px={"25px"}
            py="7px"
          >
            Reset Filter
          </Button>
        </Box>
      </Flex>

      <UnorderedList maxH={"600px"} overflow="auto">
        {Funds}
      </UnorderedList>
    </>
  );
};

export default FundList;
