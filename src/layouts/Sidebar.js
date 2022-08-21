import { Flex, useColorModeValue, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const Sidebar = () => {
  const router = useRouter();
  const path = router.pathname;
  return (
    <Flex h="100vh" bg={useColorModeValue("gray.100", "gray.900")} py={4} px={10} alignItems="flex-end">
      {path === "/" && (
        <Button
          colorScheme="blue"
          onClick={() => {
            router.replace("/askquestion");
          }}
          w={"12rem"}
        >
          Ask a Question
        </Button>
      )}
      {path !== "/" && (
        <Button
          colorScheme="blue"
          onClick={() => {
            router.replace("/");
          }}
          w={"12rem"}
        >
          Home
        </Button>
      )}
    </Flex>
  );
};
