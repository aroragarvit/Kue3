import { useContractRead } from "wagmi";
import { useAbi } from "../hooks/useAbi";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { QuestionCard } from "../components/QuestionCard";
import Answers from "../components/Answers";
export default function QuestionDesc() {
  let id = useParams();
  id = id.id.toString();
  const abi = useAbi();

  const { data } = useContractRead({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: abi,
    functionName: "getQuestionById",
    args: [id],
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
  });

  return <Box mb={8} py={32} width={"50%"} marginX={"auto"}></Box>;
}
