import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const sampleQuestions: Question[] = [
  {
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinking Text Mark Language",
    ],
    answer: "HyperText Markup Language",
  },
  {
    question: "Which of the following is a JavaScript framework?",
    options: ["Django", "React", "Laravel", "Flask"],
    answer: "React",
  },
];

export const QuizSection: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (questionIdx: number, answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIdx] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let newScore = 0;
    sampleQuestions.forEach((question, idx) => {
      if (selectedAnswers[idx] === question.answer) {
        newScore++;
      }
    });
    setScore(newScore);
    setShowResults(true);
  };

  return (
    <Box mt={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Quiz Section
      </Text>
      {!showResults ? (
        <VStack spacing={6} align="flex-start">
          {sampleQuestions.map((question, idx) => (
            <Box key={idx}>
              <FormControl as="fieldset">
                <FormLabel as="legend">{question.question}</FormLabel>
                <RadioGroup
                  value={selectedAnswers[idx]}
                  onChange={(value) => handleAnswerChange(idx, value)}
                >
                  <VStack align="flex-start">
                    {question.options.map((option, optIdx) => (
                      <Radio key={optIdx} value={option}>
                        {option}
                      </Radio>
                    ))}
                  </VStack>
                </RadioGroup>
              </FormControl>
            </Box>
          ))}
          <Button variant={"light"} onClick={handleSubmit}>
            Submit Answers
          </Button>
        </VStack>
      ) : (
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            You scored {score} out of {sampleQuestions.length}
          </Text>
          <Button variant={"dark"} onClick={() => setShowResults(false)}>
            Retake Quiz
          </Button>
        </Box>
      )}
    </Box>
  );
};
