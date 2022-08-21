import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useAbi } from "../hooks/useAbi";
import { useEffect } from "react";
import {
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";

export default function Approve({
  answerId = answerId,
  questionId = questionId,
}) {
  const abi = useAbi();
  const toast = useToast();
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: abi,
    functionName: "approvePayment",
    args: [questionId, answerId],
  });
  const { data, write } = useContractWrite(config); // write is a function that writes to the contract
  const { isSuccess } = useWaitForTransaction({ hash: data?.hash });
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Payment Approved",
        status: "success",

        isClosable: true,
      });
    }
  }, [isSuccess]);
  return (
    <Flex justifyContent={"right"} w={"full"}>
      <Button
        colorScheme="blue"
        variant="solid"
        size={"sm"}
        mt={4}
        onClick={() => {
          write();
        }}
      >
        Approve 
      </Button>
    </Flex>
  );
}
