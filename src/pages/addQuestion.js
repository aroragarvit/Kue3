import * as React from "react";
import { Box, Flex, Text, Textarea, useColorModeValue } from "@chakra-ui/react";
import { AddQuestionButton } from "../components/AddQuestionButton";

export default function AddQuestion() {
  const [value, setValue] = React.useState("");
  const handleChange = (event) => setValue(event.target.value);
  return (
    <Flex
      grow={1}
      p="5"
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Box width={"50%"}>
        <Text
          mb={6}
          textTransform="uppercase"
          fontSize="lg"
          fontWeight="bold"
        >
          Ask a question
        </Text>
        <Textarea
          value={value}
          height="200px"
          borderColor={useColorModeValue("gray.300", "gray.700")}
          borderRadius={20}
          borderWidth="1px"
          onChange={handleChange}
          placeholder="Write yout question here (keep it simple and clear to get the best answer)"
          bgColor={useColorModeValue("gray.100", "gray.700")}
          resize="none"
          focusBorderColor={useColorModeValue("blue.500", "blue.100")}
          mb={6}
        />
        <AddQuestionButton />
      </Box>
    </Flex>
  );
}
