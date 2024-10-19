// components/AddContentModal.tsx
import { ICourseContent } from "@/typings/course";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { FormSection } from "../SectionForm/components/FormSection";
import { PollSection } from "../SectionForm/components/PollSection";
import { QuizSection } from "../SectionForm/components/QuizSection";

export const AddContentModal = ({
  onAddContent,
  initialContent,
  isEditMode,
}: {
  onAddContent: (content: ICourseContent) => void;
  initialContent?: ICourseContent;
  isEditMode?: boolean;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newContent, setNewContent] = useState<ICourseContent>(
    initialContent || {
      title: "",
      description: "",
      type: "text",
    }
  );

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  const validate = () => {
    let validationErrors: { [key: string]: string } = {};
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))" + // domain name and extension
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    if (!newContent.title) {
      validationErrors.title = "Content title is required.";
    }
    if (!newContent.description) {
      validationErrors.description = "Content description is required.";
    }
    if (
      newContent.type === "video" &&
      (!newContent.url || !urlPattern.test(newContent.url))
    ) {
      validationErrors.url = "A valid Video URL is required.";
    }
    if (
      newContent.type === "quiz" &&
      (!newContent.quizData || newContent.quizData.length === 0)
    ) {
      validationErrors.quizData = "Quiz must have at least one question.";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onAddContent(newContent);
      setNewContent({ title: "", description: "", type: "text" }); // Reset content form
      onClose();
    }
  };

  return (
    <>
      <Button onClick={onOpen} mb={2} variant="light">
        {isEditMode ? "Edit" : "Add Content"}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditMode ? "Edit Content" : "Add New Content"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.title}>
                <Input
                  name="title"
                  placeholder=" "
                  value={newContent.title}
                  onChange={handleInputChange}
                  borderColor="gray.300"
                />
                <FormLabel>Content Title</FormLabel>
                <FormErrorMessage>{errors.title}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.description}>
                <Textarea
                  name="description"
                  placeholder=" "
                  value={newContent.description}
                  onChange={handleInputChange}
                  borderColor="gray.300"
                />

                <FormLabel>Content Description</FormLabel>
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              </FormControl>

              <Select
                name="type"
                value={newContent.type}
                onChange={handleInputChange}
                borderColor="gray.300"
              >
                <option value="text">Text</option>
                <option value="video">Video</option>
                <option value="quiz">Quiz</option>
                <option value="form">Form</option>
                <option value="upload">Upload</option>
                <option value="survey">Survey</option>
                <option value="youtube">YouTube</option>
                <option value="poll">Poll</option>
                <option value="image">Image</option>
                <option value="pdf">PDF</option>
                <option value="audio">Audio</option>
              </Select>

              {newContent.type === "video" && (
                <FormControl isInvalid={!!errors.url}>
                  <Input
                    name="url"
                    placeholder=" "
                    value={newContent.url || ""}
                    onChange={handleInputChange}
                    borderColor="gray.300"
                  />
                  <FormLabel>Video URL</FormLabel>
                  <FormErrorMessage>{errors.url}</FormErrorMessage>
                </FormControl>
              )}

              {newContent.type === "quiz" && (
                <QuizSection
                  quizData={newContent.quizData || []}
                  onChange={(quizData) =>
                    setNewContent((prevContent) => ({
                      ...prevContent,
                      quizData,
                    }))
                  }
                />
              )}

              {newContent.type === "poll" && (
                <PollSection
                  pollData={
                    newContent.pollData || { question: "", options: [] }
                  }
                  onChange={(pollData) =>
                    setNewContent((prevContent) => ({
                      ...prevContent,
                      pollData,
                    }))
                  }
                />
              )}

              {newContent.type === "form" && (
                <FormSection
                  formFields={newContent.formFields || []}
                  onChange={(formFields) =>
                    setNewContent((prevContent) => ({
                      ...prevContent,
                      formFields,
                    }))
                  }
                />
              )}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleSave}>
              Save Content
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
