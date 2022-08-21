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

  const { data, isLoading } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abi,
    functionName: "getQuestionById",
    args: [id], //data and isLoading are states so each time they are changing then it refreshes  again as soon as data and isLoading changed we go to Questioncard
  });
console.log(data);
  return (
    <Box mb={8} pt={32} width={"50%"} marginX={"auto"} overflowY={"scroll"} maxH={"95vh"}>
      {!isLoading && data && (
        <Box>
          <QuestionCard question={data} />
          <Answers id={id} questionAuthor={data.questionAuthor} />
        </Box>
      )}
    </Box>
  );
}
