import { Box, Button, Text, Flex, useColorModeValue } from "@chakra-ui/react";

export const Question = () => {
  return (
    <Box
      border={"1px solid"}
      borderRadius="xl"
      p={4}
      borderColor={useColorModeValue("gray.300", "gray.600")}
    >
      <Flex justifyContent={"space-between"} alignContent="center">
        <Text fontSize={"xl"} as="strong" lineHeight={2}>
          What are zero knowlege proofs?
        </Text>
        <Button isDisabled colorScheme="blue" borderRadius={999} h={6}>
          <Text fontSize={"xs"}>0.123 MATIC</Text>
        </Button>
      </Flex>
      <Text>
        I came across this term recently and I want to know what it means. Can
        you please explain about it in details? Thanks
      </Text>
      <Button type="solid" colorScheme="blue" marginTop={4} size="sm">
        {" "}
        Answer{" "}
      </Button>
    </Box>
  );
};
