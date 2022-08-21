import { Box, Text, SkeletonText, useColorModeValue } from "@chakra-ui/react";
import { useAbi } from "../hooks/useAbi";
import { useContractRead, useAccount } from "wagmi";
import Approve from "./Approve";
export default function AnswerCard({
  answerId = answerId,
  questionId = questionId,
  questionAuthor = questionAuthor,
}) {
  const abi = useAbi();
  const { address } = useAccount();
  const { data, isLoading } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
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
          <Text fontSize={"x-small"} fontFamily={"mono"} mb={4}>
            BY: {data.autor}
          </Text>
          <Text>{data.answer}</Text>
          {address === questionAuthor && (
            <Approve answerId={answerId} questionId={questionId} />
          )}
        </>
      )}
    </Box>
  );
}
