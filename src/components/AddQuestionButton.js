import { AddIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useAbi } from "../hooks/useAbi";
import { useEffect, useState } from "react";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import axios from "axios";

export const AddQuestionButton = ({ value, title, question }) => {
  const toast = useToast();
  const abi = useAbi();
  const [cid, setCid] = useState();
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
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
      onClick={async () => {
        try {
          const res = await axios.post("/api/addtext", {
            text: question,
          });
          console.log(res.data.cid);
          setCid(res.data.cid);
          setTimeout(() => {
            write();
          }, 1000);
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
