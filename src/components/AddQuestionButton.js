import { AddIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useAbi } from "../hooks/useAbi";
import { useEffect } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

export const AddQuestionButton = ({ value, question }) => {
  const toast = useToast();
  const abi = useAbi();
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: abi,
    functionName: "createQuestion",
    args: [question],
    overrides: {
      value: ethers.utils.parseEther(value),
    },
  });
  const { data, write } = useContractWrite(config); // write is a function that writes to the contract
  const { isSuccess } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Question added successfully",
        status: "success",

        isClosable: true,
      });
      setTimeout(function () {
        window.location.href = "/";
      }, 1000);
    }
  }, [isSuccess]);
  return (
    <Button
      colorScheme="blue"
      variant="solid"
      leftIcon={<AddIcon />}
      onClick={() => {
        try {
          write();
        } catch (error) {
          toast({
            title: "Error",
            description: error.message,
            status: "error",
            isClosable: true,
          });
        }
      }}
    >
      Post Question
    </Button>
  );
};
