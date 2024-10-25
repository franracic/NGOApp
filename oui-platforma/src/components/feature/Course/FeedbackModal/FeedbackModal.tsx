// FeedbackModal.tsx
import { addRating } from "@/fetchers/courses";
import { swrKeys } from "@/fetchers/swrKeys";
import {
  Button,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import useSWRMutation from "swr/mutation";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseId: number;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  courseId,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const toast = useToast();

  const { trigger: triggerAddRating } = useSWRMutation(
    swrKeys.editCourse(courseId) + "rate/",
    async (key, { arg }: { arg: { rating: number } }) =>
      addRating(courseId, arg.rating),
    {
      onSuccess: (data) => {
        toast({
          title: "Rating Submitted",
          description: "Thank you for your feedback!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: "An Error Occurred",
          description: "Unable to submit rating. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      },
    }
  );

  const handleMouseEnter = (index: number) => {
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (index: number) => {
    setRating(index);
  };

  const handleSubmit = () => {
    triggerAddRating({ rating });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Heading size="lg" mb={4}>
            Lesson completed!
          </Heading>
          <HStack spacing={1}>
            {[1, 2, 3, 4, 5].map((index) => (
              <Icon
                key={index}
                as={FaStar}
                boxSize={8}
                color={
                  (hoverRating || rating) >= index ? "yellow.400" : "gray.300"
                }
                cursor="pointer"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(index)}
              />
            ))}
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Stay</Button>
          <Button
            ml={3}
            variant={"light"}
            onClick={handleSubmit}
            isDisabled={rating === 0}
          >
            Next lesson
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
