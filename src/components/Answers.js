import { useContractRead } from "wagmi";
import { useAbi } from "../hooks/useAbi";
import { Box } from "@chakra-ui/react";
import AnswerCard from "../components/AnswerCard";
export default function Answers(id) {
  const abi = useAbi();
  const { data, isLoading } = useContractRead({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: abi,
    functionName: "getAnswersByQuestion",
    args: [id],
  });
  console.log(data);
  return (
    <Box mb={8} py={32} width={"50%"} marginX={"auto"}>
      {isLoading ? (
        <Box>Loading...</Box>
      ) : data ? (
        data.map((eachAns) => {
          return (
            <Box key={eachAns.id.toString()} mb={8} maxW={"60%"} marginX="auto">
              <AnswerCard key={eachAns.id.toString()} />
            </Box>
          );
        })
      ) : null}
    </Box>
  );
}
