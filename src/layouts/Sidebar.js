import { Link } from "react-router-dom";
import { Flex, useColorModeValue, Button } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

export const Sidebar = () => {
  const href = useLocation();
  return (
    <Flex
      h="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      py={4}
      px={10}
      alignItems="flex-end"
    >
      <Link to="/addquestion">
        {href.pathname !== "/addquestion" && (
          <Button colorScheme="blue" onClick={() => {}} w={"12rem"}>
            Ask a Question
          </Button>
        )}
        {href.pathname === "/addquestion" && (
          <Button
            colorScheme="blue"
            onClick={() => {
              window.location.href = "/";
            }}
            w={"12rem"}
          >
            Home
          </Button>
        )}
      </Link>
    </Flex>
  );
}
