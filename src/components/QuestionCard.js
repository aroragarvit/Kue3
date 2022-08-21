import { Box, Button, Text, Flex, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { AnswerModal } from "./AnswerModal";
import { useRouter } from "next/router";

export const QuestionCard = ({ question }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  return (
    <Box border={"1px solid"} borderRadius="xl" p={4} borderColor={useColorModeValue("gray.300", "gray.600")}>
      <Flex justifyContent={"space-between"} alignContent="center">
        <Text
          fontSize={"xl"}
          as="strong"
          lineHeight={2}
          onClick={() => {
            router.replace(`/questionDesc/${question.id.toString()}`);
          }}
        >
          Blockchain
        </Text>
        <Button isDisabled colorScheme="blue" borderRadius={999} h={6}>
          <Text fontSize={"xs"}>{(parseInt(question.poolMoney) / 10e17).toString()} MATIC</Text>
        </Button>
      </Flex>
      <Text>{question.question}</Text>

      <Button onClick={onOpen} type="solid" colorScheme="blue" marginTop={8} size="sm">
        Answer
      </Button>
      <AnswerModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        questionId={question.id.toString()}
        questionTitle={"Blockchain"}
        questionDesc={question.question}
      />
    </Box>
  );
};