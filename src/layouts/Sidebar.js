import {
  Flex,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

export default function Sidebar() {
  return (
    <Flex h="100vh" bg={useColorModeValue("gray.100", "gray.900")} py={4} px={10} alignItems="flex-end">
      <Button colorScheme="blue" onClick={() => {}} w={"12rem"}>Ask a Question</Button>
    </Flex>
  );
}
