//Button to Add a Question
import { Button, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import {
  useWaitForTransaction,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import kueContract from "../hardhat/artifacts/src/hardhat/contracts/kueContract.sol/Kue.json";

const abi = kueContract.abi;

export const AddQuestionButton = ({ value, question }) => {
  const toast = useToast();

  const { config } = usePrepareContractWrite({
    //  making config in curly because its a js object
    //process.env.REACT_APP_CONTRACT_ADDRESS,
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
      window.location.href = "/";
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
