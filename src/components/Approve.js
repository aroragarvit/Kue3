import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { ethers } from "ethers";
import { useAbi } from "../hooks/useAbi";
import { useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Textarea,
  useToast,
  toast,
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
    <Button
      variantColor="green"
      variant="outline"
      onClick={() => {
        write();
      }}
    >
      Approve
    </Button>
  );
}
