import * as React from "react";
import {
  Box,
  Flex,
  Input,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddQuestionButton } from "../components/AddQuestionButton";

export default function AddQuestion() {
  const [question, setQuestion] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [value, setValue] = React.useState("0");
  const handleChange = (event) => setQuestion(event.target.value);
  return (
    <Flex
      grow={1}
      p="5"
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Box width={"50%"}>
        <Text mb={6} textTransform="uppercase" fontSize="lg" fontWeight="bold">
          Ask a question
        </Text>
        <Input
          bgColor={useColorModeValue("gray.100", "gray.700")}
          borderColor={useColorModeValue("gray.300", "gray.700")}
          mb={6}
          placeholder="Give your question a title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          bgColor={useColorModeValue("gray.100", "gray.700")}
          borderColor={useColorModeValue("gray.300", "gray.700")}
          borderRadius={"12px"}
          borderWidth="1px"
          focusBorderColor={useColorModeValue("blue.500", "blue.100")}
          height="200px"
          mb={6}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Write yout question here (keep it simple and clear to get the best answer)"
          resize="none"
        />
        <Input
          bgColor={useColorModeValue("gray.100", "gray.700")}
          borderColor={useColorModeValue("gray.300", "gray.700")}
          mb={6}
          placeholder="Fund your Question"
          onChange={(e) => setValue(e.target.value)}
        />
        <AddQuestionButton value={value ? value : "0"} title={title} question={question} />
      </Box>
    </Flex>
  );
}
