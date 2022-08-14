import * as React from "react";
import {
  Flex,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";

export default function AddQuestion() {
  const [value, setValue] = React.useState("");
  const handleChange = (event) => setValue(event.target.value);
  return (
    <Flex
      grow={1}
      p="5"
      borderWidth="2px"
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Text
        mb={6}
        textTransform="uppercase"
        fontSize="lg"
        fontWeight="bold"
        color="pink.800"
      >
        Ask a question
      </Text>
      <Textarea
        value={value}
        height="200px"
        borderColor={useColorModeValue("gray.300", "gray.700")}
        borderRadius={20}
        borderWidth="3px"
        onChange={handleChange}
        placeholder="Write yout question here (keep it simple and clear to get the best answer)"
        size="sm"
      />
    </Flex>
  );
}
