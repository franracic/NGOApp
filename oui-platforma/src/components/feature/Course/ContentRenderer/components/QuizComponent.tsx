import { IQuizQuestion } from "@/typings/course";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface QuizComponentProps {
  quizData: IQuizQuestion[];
  onComplete: () => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({
  quizData,
  onComplete,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | undefined>(
    undefined
  );
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPassed, setIsPassed] = useState(false);
  if (!quizData) {
    return (
      <Alert status="warning" variant="solid" mt={6}>
        <AlertIcon />
        No quiz questions found.
      </Alert>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleNextQuestion = () => {
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(undefined);
    if (currentQuestionIndex + 1 < quizData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const finalScore =
        score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0);
      setIsPassed(finalScore / quizData.length >= 0.6);
      setIsCompleted(true);
      if (finalScore / quizData.length >= 0.6) {
        onComplete();
      }
    }
  };

  return (
    <Box p={4}>
      {!isCompleted ? (
        <>
          <Text fontSize="xl" mb={4}>
            {currentQuestion.question}
          </Text>
          {currentQuestion.type === "multiple-choice" && (
            <RadioGroup onChange={handleOptionChange} value={selectedOption}>
              <VStack align="start">
                {currentQuestion.options.map((option, index) => (
                  <Radio key={index} value={option}>
                    {option}
                  </Radio>
                ))}
              </VStack>
            </RadioGroup>
          )}
          {currentQuestion.type === "true-false" && (
            <RadioGroup onChange={handleOptionChange} value={selectedOption}>
              <Stack direction="row">
                <Radio value="True">True</Radio>
                <Radio value="False">False</Radio>
              </Stack>
            </RadioGroup>
          )}
          <Button
            mt={6}
            variant={"light"}
            onClick={handleNextQuestion}
            isDisabled={selectedOption === undefined}
          >
            {currentQuestionIndex + 1 < quizData.length
              ? "Next Question"
              : "Submit Quiz"}
          </Button>
        </>
      ) : (
        <>
          <Alert status={isPassed ? "success" : "error"} variant="solid" mt={6}>
            <AlertIcon />
            {isPassed
              ? `Congratulations! You passed with a score of ${score} / ${quizData.length}.`
              : `Unfortunately, you did not pass. Your score is ${score} / ${quizData.length}.`}
          </Alert>
          {!isPassed && (
            <Button
              mt={6}
              variant={"light"}
              onClick={() => {
                setIsCompleted(false);
                setCurrentQuestionIndex(0);
                setScore(0);
              }}
            >
              Try Again
            </Button>
          )}
        </>
      )}
    </Box>
  );
};
