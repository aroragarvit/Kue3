import { useContractRead } from "wagmi";
import { useAbi } from "../hooks/useAbi";
import { Box, useColorModeValue, Text } from "@chakra-ui/react";
import AnswerCard from "../components/AnswerCard";
export default function Answers({ id }) {
  const abi = useAbi();
  const { data, isLoading } = useContractRead({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: abi,
    functionName: "getAnswersByQuestion",
    args: [id],
  });
  console.log(data);
  return (
    <Box
      my={8}
      p={4}
      borderWidth={1}
      borderRadius="xl"
      borderColor={useColorModeValue("gray.300", "gray.600")}
    >
      <Text fontSize={"3xl"}> Answers </Text>
      <hr />
      <Box py={4}>
        {isLoading && <Box>Loading...</Box>}
        {!isLoading &&
          data &&
          data.map((answer) => (
            <Box key={answer.toString()}>
              <AnswerCard answer={answer.toString()} />
            </Box>
          ))}
        {!isLoading && !data && (
          <Text textAlign={"center"}>
            No answers for this question has been submitted yet.
          </Text>
        )}
      </Box>
    </Box>
  );
}
