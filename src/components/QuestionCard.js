import {
  Box,
  Button,
  Text,
  Flex,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { AnswerModal } from "./AnswerModal";
import { Link } from "react-router-dom";

export const QuestionCard = ({ question }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      border={"1px solid"}
      borderRadius="xl"
      p={4}
      borderColor={useColorModeValue("gray.300", "gray.600")}
    >
      <Flex justifyContent={"space-between"} alignContent="center">
        <Link to={`/questionDesc/${question.id.toString()}`}>
          <Text fontSize={"xl"} as="strong" lineHeight={2}>
            Blockchain
          </Text>
        </Link>
        <Button isDisabled colorScheme="blue" borderRadius={999} h={6}>
          <Text fontSize={"xs"}>
            {(parseInt(question.poolMoney) / 10e18).toString()} MATIC
          </Text>
        </Button>
      </Flex>
      <Text>{question.question}</Text>

      <Button
        onClick={onOpen}
        type="solid"
        colorScheme="blue"
        marginTop={8}
        size="sm"
      >
        Answer
      </Button>
      <AnswerModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Box>
  );
};
