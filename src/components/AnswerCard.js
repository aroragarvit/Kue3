import { Box, Text, SkeletonText, useColorModeValue } from "@chakra-ui/react";
import { useAbi } from "../hooks/useAbi";
import { useContractRead } from "wagmi";

export default function AnswerCard({ answerId }) {
  const abi = useAbi();
  const { data, isLoading } = useContractRead({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: abi,
    functionName: "getAnswerById",
    args: [answerId],
  });
  return (
    <Box
      bgColor={useColorModeValue("gray.200", "gray.700")}
      p={4}
      rounded={"xl"}
      mb={8}
    >
      {isLoading && <SkeletonText />}
      {!isLoading && data && (
        <>
          <Text fontSize={"x-small"} fontFamily={"mono"} mb={4}>BY: {data.autor}</Text>
          <Text>{data.answer}</Text>
        </>
      )}
    </Box>
  );
}
