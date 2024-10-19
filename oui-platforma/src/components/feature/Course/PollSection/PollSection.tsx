import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Progress,
  Radio,
  RadioGroup,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface PollOption {
  label: string;
  votes: number;
}

interface PollQuestion {
  question: string;
  options: PollOption[];
}

const initialPoll: PollQuestion = {
  question: "Which frontend framework do you prefer?",
  options: [
    { label: "React", votes: 10 },
    { label: "Vue", votes: 7 },
    { label: "Angular", votes: 3 },
    { label: "Svelte", votes: 5 },
  ],
};

export const PollSection: React.FC = () => {
  const [poll, setPoll] = useState<PollQuestion>(initialPoll);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const toast = useToast();

  const handleVote = () => {
    if (!selectedOption) {
      toast({
        title: "No option selected.",
        description: "Please select an option before submitting.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const updatedPoll = {
      ...poll,
      options: poll.options.map((option) =>
        option.label === selectedOption
          ? { ...option, votes: option.votes + 1 }
          : option
      ),
    };

    setPoll(updatedPoll);
    setHasVoted(true);
    toast({
      title: "Vote Submitted.",
      description: "Thank you for your feedback!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const totalVotes = poll.options.reduce(
    (acc, option) => acc + option.votes,
    0
  );

  return (
    <Box mt={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Poll
      </Text>
      <Box>
        <Text mb={2}>{poll.question}</Text>
        <FormControl as="fieldset">
          <FormLabel as="legend">Select an option:</FormLabel>
          <RadioGroup
            value={selectedOption}
            onChange={setSelectedOption}
            isDisabled={hasVoted}
          >
            <VStack align="flex-start">
              {poll.options.map((option, idx) => (
                <Radio key={idx} value={option.label}>
                  {option.label}
                </Radio>
              ))}
            </VStack>
          </RadioGroup>
        </FormControl>
        {!hasVoted && (
          <Button mt={4} variant={"light"} onClick={handleVote}>
            Submit Vote
          </Button>
        )}
      </Box>
      {hasVoted && (
        <Box mt={6}>
          <Text mb={4}>Poll Results:</Text>
          <VStack spacing={4} align="stretch">
            {poll.options.map((option, idx) => (
              <Box key={idx}>
                <Text mb={1}>
                  {option.label} -{" "}
                  {((option.votes / totalVotes) * 100).toFixed(1)}%
                </Text>
                <Progress
                  value={(option.votes / totalVotes) * 100}
                  size="lg"
                  colorScheme="yellow"
                />
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
};
