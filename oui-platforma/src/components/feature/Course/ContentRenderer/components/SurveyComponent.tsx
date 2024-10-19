import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import React from "react";

interface SurveyComponentProps {
  questions: Array<{ question: string; options: string[] }>;
  onComplete: () => void;
}

export const SurveyComponent: React.FC<SurveyComponentProps> = ({
  questions,
  onComplete,
}) => {
  return (
    <Box>
      {questions.map((question, index) => (
        <FormControl key={index} mb={4}>
          <FormLabel>{question.question}</FormLabel>
          <RadioGroup>
            <Stack direction="column">
              {question.options.map((option, idx) => (
                <Radio key={idx} value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
      ))}
      <Button variant={"light"} onClick={onComplete}>
        Submit Survey
      </Button>
    </Box>
  );
};
