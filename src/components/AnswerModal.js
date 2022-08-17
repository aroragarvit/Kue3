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
                onChange={() => {
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
          <Button colorScheme="blue">Post Answer</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
