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

export const AnswerModal = ({
  isOpen,
  onClose,
  questionId,
  questionTitle,
  questionDesc,
}) => {
  const [answer, setAnswer] = useState("");
  const toast = useToast();
  const abi = useAbi();
  const { config } = usePrepareContractWrite({
    addressOrName: process.env.REACT_APP_CONTRACT_ADDRESS,
    contractInterface: abi,
    functionName: "answerQuestion",
    args: [questionId, answer],
  });
  const { data, write } = useContractWrite(config); // write is a function that writes to the contract
  const { isSuccess } = useWaitForTransaction({ hash: data?.hash });
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Answer posted successfully",
        status: "success",

        isClosable: true,
      });
    }
  }, [isSuccess]);
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
            Post Answer
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
