//Button to Add a Question
import { Button } from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

export const AddQuestionButton = () => {
    return (
        <Button
            colorScheme="blue"
            variant="solid"
            leftIcon={<AddIcon />}
            onClick={() => {
                console.log("Add Question Button Clicked");
            }
            }
        >
            Post Question
        </Button>
    );
}