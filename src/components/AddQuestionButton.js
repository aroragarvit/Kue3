import { AddIcon } from "@chakra-ui/icons";
import { Button, useToast } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useAbi } from "../hooks/useAbi";
import { prepareWriteContract, writeContract, waitForTransaction } from "@wagmi/core";
import axios from "axios";

export const AddQuestionButton = ({ value, title, question }) => {
  const toast = useToast();
  const abi = useAbi();

  const handleClick = async () => {
    const cid = await postToIPFS();
    const config = await createConfig(cid);
    const { hash } = await writeContract(config);
    toast({
      title: "Success",
      description: "Your question has been posted!",
      status: "success",
      isClosable: true,
    });
  };
  const postToIPFS = async () => {
    try {
      const res = await axios.post("/api/addtext", {
        text: question,
      });
      return res.data.cid;
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        isClosable: true,
      });
      console.log(error);
    }
  };

  const createConfig = async (cid) => {
    try {
      const config = await prepareWriteContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: abi,
        functionName: "createQuestion",
        args: [title, cid],
        value: ethers.utils.parseEther(value),
      });
      return config;
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        isClosable: true,
      });
      console.log(error);
    }
  };

  return (
    <Button colorScheme="blue" variant="solid" leftIcon={<AddIcon />} onClick={handleClick}>
      Post Question
    </Button>
  );
};
