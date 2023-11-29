import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useToast,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAbi } from "../hooks/useAbi";
import { prepareWriteContract, writeContract, waitForTransaction } from "@wagmi/core";

export const AnswerModal = ({ isOpen, onClose, questionId, questionTitle, questionDesc }) => {
  const toast = useToast();
  const abi = useAbi();
  const [answer, setAnswer] = useState("");

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

  const createConfig = async (answer) => {
    try {
      const config = await prepareWriteContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: abi,
        functionName: "answerQuestion",
        args: [questionId, answer],
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
    <Modal isOpen={isOpen} onClose={onClose} size={"full"}>
      <ModalOverlay />
      <ModalContent p={8}>
        <ModalCloseButton />
        <ModalBody>
          <Flex>
            <Box w={"25%"} px={4}>
              <Text fontSize={"3xl"} fontWeight={"semibold"} mb={8}>
                {questionTitle}
              </Text>
              <Text fontSize={"lg"}>{questionDesc}</Text>
            </Box>
            <Box w={"75%"} px={8}>
              <Textarea
                placeholder="Answer"
                resize={"none"}
                height={"100%"}
                onChange={(event) => {
                  setAnswer(event.target.value);
                }}
              />
            </Box>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            onClick={() => {
              handleClick();
            }}
          >
            Post Answer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
