import { useContractRead } from "wagmi";
import { useAbi } from "../hooks/useAbi";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
export default function QuestionCard() {
  const { id } = useParams();
  const abi = useAbi();
  const { data, isLoading } = useContractRead({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: abi,
    functionName: "getQuestionById",
    args: [id],
  });
  console.log(data);
}
