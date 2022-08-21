import { AddIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useAbi } from "../hooks/useAbi";
import { useEffect, useState } from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useIPFS } from "../hooks/useIPFS";

export const AddQuestionButton = ({ value, title, question }) => {
  const toast = useToast();
  const abi = useAbi();
  const [cid, setCid] = useState();
  const {addText} = useIPFS();
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: abi,
    functionName: "createQuestion",
    args: [title, cid],
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
          const cid = addText(question);
          console.log(cid);
          setCid(cid);
          write();
        } catch (error) {
          toast({
            title: "Error",
            description: error.message,
            status: "error",
            isClosable: true,
          });
          console.log(error);
        }
      }}
    >
      Post Question
    </Button>
  );
};
