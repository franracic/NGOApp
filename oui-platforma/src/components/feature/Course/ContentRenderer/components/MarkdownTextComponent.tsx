"use client";

import { Box, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownTextComponentProps {
  content: string;
  fontSize?: string | number;
  color?: string;
  fontWeight?: string | number;
  onComplete: () => void;
  completeAfterSeconds?: number;
}

export const MarkdownTextComponent: React.FC<MarkdownTextComponentProps> = ({
  content,
  fontSize = "md",
  color = "black",
  fontWeight = "normal",
  onComplete,
  completeAfterSeconds = 10,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, completeAfterSeconds * 1000);

    return () => clearTimeout(timer);
  }, [onComplete, completeAfterSeconds]);

  return (
    <Box
      p={4}
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      bg="gray.50"
    >
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => (
            <Text
              fontSize={fontSize}
              color={color}
              fontWeight={fontWeight}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
};
