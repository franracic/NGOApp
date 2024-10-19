import { PollQuestion } from "@/typings/course";
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

interface PollComponentProps {
  pollData: PollQuestion;
  onComplete: () => void;
}

export const PollComponent: React.FC<PollComponentProps> = ({
  pollData,
  onComplete,
}) => {
  const [poll, setPoll] = useState<PollQuestion>(pollData);
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
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  const totalVotes = poll.options.reduce(
    (acc, option) => acc + option.votes,
    0
  );

  return (
    <Box mt={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        {poll.question}
      </Text>
      {!hasVoted ? (
        <Box>
          <FormControl as="fieldset">
            <FormLabel as="legend">Select an option:</FormLabel>
            <RadioGroup value={selectedOption} onChange={setSelectedOption}>
              <VStack align="flex-start">
                {poll.options.map((option, idx) => (
                  <Radio key={idx} value={option.label} colorScheme="yellow">
                    {option.label}
                  </Radio>
                ))}
              </VStack>
            </RadioGroup>
          </FormControl>
          <Button mt={4} variant={"light"} onClick={handleVote}>
            Submit Vote
          </Button>
        </Box>
      ) : (
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
                  variant={"light"}
                  value={(option.votes / totalVotes) * 100}
                  size="lg"
                  isAnimated={option.label === selectedOption}
                  hasStripe={option.label === selectedOption}
                  colorScheme={"yellow"}
                />
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
};
