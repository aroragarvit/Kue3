import { Question } from "./components/Question";
import { Box } from "@chakra-ui/react";
import { useContractRead } from "wagmi";
import kueContract from "./hardhat/artifacts/src/hardhat/contracts/kueContract.sol/Kue.json";
const abi = kueContract.abi;
const App = () => {
  const { data, isError, isLoading } = useContractRead({
    addressOrName: "0x1b1b016f6d2b11d729e4f55d8170cfffc3af1889",
    contractInterface: abi,
    functionName: "getLatestQuestion",
    args: [1],
  });
  // add page
  return (
    <Box py={32} w={"full"} px={16}>
      {isLoading ? (
        <Box>Loading...</Box>
      ) : data ? (
        data.map((eachQue) => {
          return <Question key={eachQue.id} question={eachQue} />;
        })
      ) : null}
    </Box>
  );
};

export default App;
