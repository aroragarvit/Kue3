import { useAbi } from "../hooks/useAbi";
import { Button, Flex, useToast } from "@chakra-ui/react";
import { prepareWriteContract, writeContract, waitForTransaction } from "@wagmi/core";

export default function Approve({ answerId = answerId, questionId = questionId }) {
  const abi = useAbi();
  const toast = useToast();

  const handleClick = async () => {
    const config = await createConfig(answer);
    await writeContract(config);
    toast({
      title: "Success",
      description: "Your question has been posted!",
      status: "success",
      isClosable: true,
    });
  };

  const createConfig = async () => {
    try {
      const config = await prepareWriteContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: abi,
        functionName: "approvePayment",
        args: [questionId, answerId],
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
    <Flex justifyContent={"right"} w={"full"}>
      <Button colorScheme="blue" variant="solid" size={"sm"} mt={4} onClick={handleClick}>
        Approve
      </Button>
    </Flex>
  );
}
