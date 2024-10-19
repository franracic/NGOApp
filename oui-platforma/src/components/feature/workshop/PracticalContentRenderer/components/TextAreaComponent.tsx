import { Button, Textarea, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

interface TextAreaComponentProps {
  placeholder?: string;
  onComplete: (inputText: string) => void;
}

export const TextAreaComponent: React.FC<TextAreaComponentProps> = ({
  placeholder = "Please write your explanation here...",
  onComplete,
}) => {
  const [inputText, setInputText] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    if (inputText.trim()) {
      onComplete(inputText);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder={placeholder}
        minHeight="200px"
      />
      <Button variant={"light"} onClick={handleSubmit}>
        Submit Explanation
      </Button>
    </VStack>
  );
};
