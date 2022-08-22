import { AnswerModal } from "./AnswerModal";
import { Box, Button, Text, Flex, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export const QuestionCard = ({ question }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [text, setText] = useState("");
  useEffect(() => {
    axios
      .post("/api/gettext", {
        cid: question.question,
      })
      .then((res) => {
        setText(res.data.text);
      });
  }, [question]);
  return (
    <Box border={"1px solid"} borderRadius="xl" p={4} borderColor={useColorModeValue("gray.300", "gray.600")}>
      <Flex justifyContent={"space-between"} alignContent="center">
        <Text
          fontSize={"xl"}
          as="strong"
          lineHeight={2}
          onClick={() => {
            router.replace(`/question/${question.id.toString()}`);
          }}
          cursor={"pointer"}
        >
          {question.title}
        </Text>
        <Button isDisabled colorScheme="blue" borderRadius={999} h={6}>
          <Text fontSize={"xs"}>{(parseInt(question.poolMoney) / 10e17).toString()} MATIC</Text>
        </Button>
      </Flex>
      <Text>{text}</Text>

      <Button onClick={onOpen} type="solid" colorScheme="blue" marginTop={8} size="sm">
        Answer
      </Button>
      <AnswerModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        questionId={question.id.toString()}
        questionTitle={question.title}
        questionDesc={text}
      />
    </Box>
  );
};
