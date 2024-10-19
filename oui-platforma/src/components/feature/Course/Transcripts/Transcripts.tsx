import { Box, Button, Collapse, Text } from "@chakra-ui/react";
import React from "react";

interface TranscriptsProps {
  transcript?: string;
}

export const Transcripts: React.FC<TranscriptsProps> = ({ transcript }) => {
  const [showTranscript, setShowTranscript] = React.useState(false);

  if (!transcript) return null;

  return (
    <Box mt={4}>
      <Button
        size="sm"
        onClick={() => setShowTranscript(!showTranscript)}
        mb={2}
      >
        {showTranscript ? "Hide Transcript" : "Show Transcript"}
      </Button>
      <Collapse in={showTranscript} animateOpacity>
        <Box p={4} bg="gray.100" rounded="md">
          <Text fontSize="sm" whiteSpace="pre-wrap">
            {transcript}
          </Text>
        </Box>
      </Collapse>
    </Box>
  );
};
