import { Box, Button, Text, Flex, useColorModeValue } from "@chakra-ui/react";
import { ethers } from "ethers";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const Question = ({ question }) => {
  console.log(question);
  return (
    <Box
      border={"1px solid"}
      borderRadius="xl"
      p={4}
      borderColor={useColorModeValue("gray.300", "gray.600")}
    >
      <Flex justifyContent={"space-between"} alignContent="center">
        <Text fontSize={"xl"} as="strong" lineHeight={2}>
          Blockchain
        </Text>
        <Button isDisabled colorScheme="blue" borderRadius={999} h={6}>
          <Text fontSize={"xs"}>
            {ethers.BigNumber.from(question.poolMoney).toString()} pol
          </Text>
        </Button>
      </Flex>
      <Text>{question.question}</Text>

      <Button
        onClick={(window.location.href = "./answer")}
        type="solid"
        colorScheme="blue"
        marginTop={8}
        size="sm"
      >
        Answer
      </Button>
    </Box>
  );
};
