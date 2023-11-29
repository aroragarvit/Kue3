import Answers from "../../components/Answers";
import { Box } from "@chakra-ui/react";
import { QuestionCard } from "../../components/QuestionCard";
import { useAbi } from "../../hooks/useAbi";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";

export default function QuestionDesc() {
  const router = useRouter();
  const abi = useAbi();
  const { qid } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    readContract({
      address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
      abi: abi,
      functionName: "getQuestionById",
      args: [qid],
    }).then((res) => {
      setData(res);
    });
  }, [abi, qid]);

  return (
    <Box mb={8} pt={32} width={"50%"} marginX={"auto"} overflowY={"scroll"} maxH={"95vh"}>
      {data && (
        <Box>
          <QuestionCard question={data} />
          <Answers id={qid} questionAuthor={data.questionAuthor} />
        </Box>
      )}
    </Box>
  );
}
