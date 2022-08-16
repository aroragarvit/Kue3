import { Box } from "@chakra-ui/react";
import { QuestionCard } from "../components/QuestionCard";
import { useContractRead } from "wagmi";
import { useAbi } from "../hooks/useAbi";

const Home = () => {

  const abi = useAbi();
  const { data, isLoading } = useContractRead({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: abi,
    functionName: "getLatestQuestion",
    args: [1],
  });

  return (
    <Box py={32} w={"full"} px={16}>
      {isLoading ? (
        <Box>Loading...</Box>
      ) : data ? (
        data.map((eachQue) => {
          return <QuestionCard key={eachQue.id} question={eachQue} />;
        })
      ) : null}
    </Box>
  );
};

export default Home;
