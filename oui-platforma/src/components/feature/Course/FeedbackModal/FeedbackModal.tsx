import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  onNext,
}) => {
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    console.log({ rating, feedback });
    onClose();
    onNext();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Heading size="lg" mb={4}>
            Lession completed!
          </Heading>
          <Textarea
            placeholder="Provide feedback?"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Stay</Button>
          <Button ml={3} variant={"light"} onClick={handleSubmit}>
            Next lesson
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
