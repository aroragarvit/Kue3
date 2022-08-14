import { Question } from "./components/Question";
import { Box } from "@chakra-ui/react";
const App = () => {
  return (
    <Box py={32} w={"full"} px={16}>
      <Question />
    </Box>
  );
};

export default App;
