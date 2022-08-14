import * as React from "react";
import { Box, Center, Image, Flex, Badge, Text, Input } from "@chakra-ui/react";
import { MdStar } from "react-icons/md";

export default function AddQuestion() {
  const [value, setValue] = React.useState("");
  const handleChange = (event) => setValue(event.target.value);
  return (
    <Center h="100vh">
      <Box p="5" width="1000px" borderWidth="2px">
        <Flex align="center" justifyContent="center" mt={2}>
          <Text
            ml={2}
            textTransform="uppercase"
            fontSize="lg"
            fontWeight="bold"
            color="pink.800"
          >
            Ask a question
          </Text>
        </Flex>
        <br></br>

        <Input
          value={value}
          height="200px"
          borderColor={value ? "black" : "gray.300"}
          borderRadius={20}
          borderWidth="3px"
          onChange={handleChange}
          placeholder="Write yout question here (keep it simple and clear to get the best answer)"
          size="sm"
        />
        <Text mt={2}>$119/night</Text>
        <Flex mt={2} align="center">
          <Box as={MdStar} color="orange.400" />
          <Text ml={1} fontSize="sm">
            <b>4.84</b> (190)
          </Text>
        </Flex>
      </Box>
    </Center>
  );
}
