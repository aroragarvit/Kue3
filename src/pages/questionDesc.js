import { useContractRead } from "wagmi";
import { useAbi } from "../hooks/useAbi";
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

import { QuestionCard } from "../components/QuestionCard";
import Answers from "../components/Answers";

export default function QuestionDesc() {
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  useParams().then((_id) => (id = _id));
  console.log(id);
  const abi = useAbi();
  const { data, isLoading } = useContractRead({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: abi,
    functionName: "getQuestionById",
    args: [id],
  });

  console.log(data);
  return (
    <Box mb={8} py={32} width={"50%"} marginX={"auto"}>
      <QuestionCard question={data} />
      <Answers id={id} />
    </Box>
  );
}
