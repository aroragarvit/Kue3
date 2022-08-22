import Answers from "../../components/Answers";
import { Box } from "@chakra-ui/react";
import { QuestionCard } from "../../components/QuestionCard";
import { useAbi } from "../../hooks/useAbi";
import { useContractRead } from "wagmi";
import { useRouter } from "next/router";

export default function QuestionDesc() {
  const router = useRouter();
  const abi = useAbi();
  const {qid} = router.query
  const { data, isLoading } = useContractRead({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abi,
    functionName: "getQuestionById",
    args: [qid], //data and isLoading are states so each time they are changing then it refreshes  again as soon as data and isLoading changed we go to Questioncard
  });
  return (
    <Box mb={8} pt={32} width={"50%"} marginX={"auto"} overflowY={"scroll"} maxH={"95vh"}>
      {!isLoading && data && (
        <Box>
          <QuestionCard question={data} />
          <Answers id={qid} questionAuthor={data.questionAuthor} />
        </Box>
      )}
    </Box>
  );
}
