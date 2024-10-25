"use client";

import { SurveyQuestion } from "@/typings/course";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface SurveyComponentProps {
  survey_questions: SurveyQuestion[];
  onComplete: (responses: { [key: number]: any }) => void;
}

export const SurveyComponent: React.FC<SurveyComponentProps> = ({
  survey_questions: surveyData,
  onComplete,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<{ [key: number]: any }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  if (!surveyData || surveyData.length === 0) {
    return (
      <Alert status="warning" variant="solid" mt={6}>
        <AlertIcon />
        No survey questions found.
      </Alert>
    );
  }

  const currentQuestion = surveyData[currentQuestionIndex];

  const handleOptionChange = (value: any) => {
    setResponses((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNextQuestion = () => {
    if (
      responses[currentQuestion.id] === undefined ||
      responses[currentQuestion.id] === ""
    ) {
      return;
    }
    if (currentQuestionIndex + 1 < surveyData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsCompleted(true);
      onComplete(responses);
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "multiple-choice":
        return (
          <RadioGroup
            onChange={handleOptionChange}
            value={responses[currentQuestion.id] || ""}
          >
            <VStack align="start">
              {currentQuestion.options?.map((option, index) => (
                <Radio key={index} value={option}>
                  {option}
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
        );
      case "text":
        return (
          <Input
            placeholder="Your answer"
            value={responses[currentQuestion.id] || ""}
            onChange={(e) => handleOptionChange(e.target.value)}
          />
        );
      case "rating":
        return (
          <RadioGroup
            onChange={handleOptionChange}
            value={responses[currentQuestion.id] || ""}
          >
            <Stack direction="row">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Radio key={rating} value={rating.toString()}>
                  {rating}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        );
      default:
        return null;
    }
  };

  return (
    <Box
      p={4}
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      bg="gray.50"
    >
      {!isCompleted ? (
        <VStack spacing={4} align="stretch">
          <Text fontSize="xl">{currentQuestion.question}</Text>
          {renderQuestion()}
          <Button
            mt={4}
            colorScheme="blue"
            onClick={handleNextQuestion}
            isDisabled={
              responses[currentQuestion.id] === undefined ||
              responses[currentQuestion.id] === ""
            }
          >
            {currentQuestionIndex + 1 < surveyData.length
              ? "Next"
              : "Submit Survey"}
          </Button>
        </VStack>
      ) : (
        <Alert status="success" variant="solid">
          <AlertIcon />
          Thank you for completing the survey!
        </Alert>
      )}
    </Box>
  );
};
