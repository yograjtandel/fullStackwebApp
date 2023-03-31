import React, { useContext, useState } from "react";
import uuid from "react-uuid";

import {
  Button,
  Card,
  CardBody,
  Container,
  Collapse,
  Flex,
  SimpleGrid,
  GridItem,
  Heading,
  Image,
  Text,
  Box,
  UnorderedList,
  ListItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import SideBar from "../components/Home/SideBar";

import { FundSubcategories, GettingStarted } from "../data/Home";
import MutualFundSideNavList from "../data/MutualFundSideNavList";
import { MutualFundList } from "../data/TabList";

import FundList from "../components/Home/FundList";
import ActiveFilterContext from "../store/ActiveFundFilterContext";

const Home = () => {
  const [SubCategoryList, setSubCategoryList] = useState([]);
  const [NavList, setNavList] = useState([...MutualFundSideNavList]);
  const [prevActiveCategory, setprevActiveCategory] = useState("");

  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: IsModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const filterCtx = useContext(ActiveFilterContext);

  const CtegoryClickHandler = (e) => {
    const tabId = e.currentTarget.id;
    const categorys = FundSubcategories.filter((item) => item.id === tabId)[0]
      .SubCategory;

    const list = [...MutualFundSideNavList];
    list.forEach((item) => {
      if (item.id === "sub_category") {
        item["subMenu"] = categorys;
      }
    });
    setNavList(list);
    setSubCategoryList(
      categorys.map((item) => (
        <ListItem
          id={item.id}
          w={"fit-content"}
          px="15px"
          py="3px"
          border="1px"
          borderColor="gray.600"
          borderRadius="20px"
          color="gray.600"
          my="3"
          ml="10"
          key={uuid()}
          _hover={{
            color: "blue.400",
            borderColor: "blue.400",
            cursor: "pointer",
          }}
          onClick={(e) => {
            filterCtx.AddFilter(e, { tabId: tabId });
          }}
        >
          {item.Title}
        </ListItem>
      ))
    );
    setprevActiveCategory(e.currentTarget.id);
    if (
      e.currentTarget.id === prevActiveCategory ||
      prevActiveCategory === "" ||
      !isOpen
    ) {
      onToggle();
    }
  };

  const GettingStartedList = GettingStarted.map((item) => (
    <GridItem w="100%" key={uuid()}>
      <Card
        size="md"
        border={"1px"}
        borderColor="gray.100"
        _hover={{
          cursor: "pointer",
        }}
        onClick={onModalOpen}
      >
        <CardBody py={"15px"} pl="30px" pr="10px">
          <Image
            src={item.icon}
            w="28px"
            h="28px"
            position={"absolute"}
            left="-16px"
            top={"25px"}
          ></Image>
          <Heading
            size="sm"
            color={"blackAlpha.800"}
            _hover={{
              color: "blue.400",
            }}
          >
            {item.Title}
          </Heading>
          <Text pt="2" fontSize="sm" color="blackAlpha.500">
            {item.subTitle}
          </Text>
        </CardBody>
      </Card>
    </GridItem>
  ));

  return (
    <Container maxW="1160px" fontFamily="Inter, sans-serif">
      <Flex flexWrap="wrap">
        {/* sidebar start */}
        <Box w={["100%", "100%", "100%", "22%"]}>
          <SideBar NavList={NavList} />
        </Box>
        {/* sidebar end */}
        {/* category box start */}
        <Box
          w={["100%", "100%", "100%", "74%"]}
          ml={["0%", "0%", "4%", "4%"]}
          mr={["0%", "0%", "4%", "0%"]}
          display={`${filterCtx.filter.length ? "none" : ""}`}
        >
          <Box mt={"30px"}>
            <Heading size={"md"} mb={4}>
              {" "}
              Categories{" "}
            </Heading>
            <Text fontSize={"md"} color="blackAlpha.500">
              Select fund categories for you to start investing
            </Text>
          </Box>

          {/* category start */}
          <Box>
            <SimpleGrid
              columns={{ base: 1, md: 3, lg: 3 }}
              w="100%"
              my="25px"
              mx={0}
              gap={8}
              fontWeight="500"
            >
              <GridItem>
                <Card
                  id="equity"
                  size="md"
                  variant={"filled"}
                  onClick={CtegoryClickHandler}
                  _hover={{
                    bg: "blue.50",
                  }}
                >
                  <CardBody textAlign={"center"}>Equity</CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card
                  id="debt"
                  size="md"
                  variant={"filled"}
                  onClick={CtegoryClickHandler}
                  _hover={{
                    bg: "blue.50",
                  }}
                >
                  <CardBody textAlign={"center"}>Debt</CardBody>
                </Card>
              </GridItem>
              <GridItem>
                <Card
                  id="hybrid"
                  size="md"
                  variant={"filled"}
                  onClick={CtegoryClickHandler}
                  _hover={{
                    bg: "blue.50",
                  }}
                >
                  <CardBody textAlign={"center"}>Hybrid</CardBody>
                </Card>
              </GridItem>
            </SimpleGrid>
            <Collapse in={isOpen} animateOpacity>
              <Box
                px="18px"
                py="5"
                rounded="md"
                shadow="md"
                border={"1px"}
                borderColor="gray.100"
              >
                <UnorderedList display={"flex"} flexWrap="wrap">
                  {SubCategoryList}
                </UnorderedList>
              </Box>
            </Collapse>
          </Box>
          <Box>
            <SimpleGrid
              columns={{ base: 1, md: 3, lg: 3 }}
              w="100%"
              my="25px"
              mx={0}
              gap={8}
              fontWeight="500"
            >
              <GridItem w="100%">
                <Card
                  size="md"
                  onClick={(e) => {
                    filterCtx.AddFilter(e, { tabId: "fund_of_fund" });
                  }}
                  variant={"filled"}
                  _hover={{
                    bg: "blue.50",
                  }}
                >
                  <CardBody textAlign={"center"}>Fund of Funds</CardBody>
                </Card>
              </GridItem>
              <GridItem w="100%">
                <Card
                  size="md"
                  onClick={(e) =>
                    filterCtx.AddFilter(e, { tabId: "index_funds" })
                  }
                  variant={"filled"}
                  _hover={{
                    bg: "blue.50",
                  }}
                >
                  <CardBody textAlign={"center"}>Index Funds</CardBody>
                </Card>
              </GridItem>
              <GridItem w="100%">
                <Card
                  size="md"
                  onClick={(e) =>
                    filterCtx.AddFilter(e, { tabId: "solution_oriented" })
                  }
                  variant={"filled"}
                  _hover={{
                    bg: "blue.50",
                  }}
                >
                  <CardBody textAlign={"center"}>Solution Oriented</CardBody>
                </Card>
              </GridItem>
            </SimpleGrid>
          </Box>
          {/* category end */}
          {/* category box end */}

          <Box mt={"30px"}>
            <Heading size={"md"} mb={4}>
              {" "}
              Get started{" "}
            </Heading>
            <Text fontSize={"md"} color="blackAlpha.500">
              Find the right mutual fund across these asset classes
            </Text>
          </Box>
          <SimpleGrid columns={[1, 2, 2]} w="100%" my="25px" mx={0} gap={8}>
            {GettingStartedList}
          </SimpleGrid>
        </Box>

        <Box
          w={["100%", "100%", "100%", "74%"]}
          ml={["0%", "0%", "4%", "4%"]}
          mr={["0%", "0%", "4%", "0%"]}
          display={`${filterCtx.filter.length ? "" : "none"}`}
        >
          <FundList />
        </Box>
      </Flex>

      <Modal isOpen={IsModalOpen} onClose={onModalClose}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>fwef wef we fwe fwef wef w</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Home;
