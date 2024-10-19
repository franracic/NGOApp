// components/PollSection.tsx
import { PollQuestion } from "@/typings/course";
import { DragHandleIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const PollSection = ({
  pollData,
  onChange,
}: {
  pollData: PollQuestion;
  onChange: (updatedPollData: PollQuestion) => void;
}) => {
  const [poll, setPoll] = useState<PollQuestion>(
    pollData || { question: "", options: [] }
  );
  const [errors, setErrors] = useState<{ question?: string; options?: string }>(
    {}
  );

  const addOption = () => {
    setPoll({ ...poll, options: [...poll.options, { label: "", votes: 0 }] });
  };

  const updateOption = (index: number, value: string) => {
    const updatedOptions = [...poll.options];
    updatedOptions[index] = { ...updatedOptions[index], label: value };
    setPoll({ ...poll, options: updatedOptions });
    validatePoll({ ...poll, options: updatedOptions });
    onChange({ ...poll, options: updatedOptions });
  };

  const validatePoll = (poll: PollQuestion) => {
    const newErrors: { question?: string; options?: string } = {};
    if (!poll.question) {
      newErrors.question = "Poll question is required.";
    }
    if (poll.options.length < 2) {
      newErrors.options = "Poll must have at least two options.";
    }
    setErrors(newErrors);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedOptions = Array.from(poll.options);
    const [movedOption] = reorderedOptions.splice(result.source.index, 1);
    reorderedOptions.splice(result.destination.index, 0, movedOption);

    setPoll({ ...poll, options: reorderedOptions });
    onChange({ ...poll, options: reorderedOptions });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.question}>
          <Input
            placeholder=" "
            value={poll.question}
            onChange={(e) => {
              setPoll({ ...poll, question: e.target.value });
              validatePoll({ ...poll, question: e.target.value });
              onChange({ ...poll, question: e.target.value });
            }}
            mb={4}
          />
          <FormLabel>Poll Question</FormLabel>
          <FormErrorMessage>{errors.question}</FormErrorMessage>
        </FormControl>

        <Droppable droppableId="options">
          {(provided) => (
            <Stack
              {...provided.droppableProps}
              ref={provided.innerRef}
              spacing={2}
            >
              {poll.options.map((option, oIndex) => (
                <Draggable
                  key={`option-${oIndex}`}
                  draggableId={`option-${oIndex}`}
                  index={oIndex}
                >
                  {(provided, snapshot) => (
                    <FormControl
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      isInvalid={!!errors.options}
                      mb={2}
                      bg={snapshot.isDragging ? "blue.50" : "white"}
                      _hover={{ boxShadow: "sm" }}
                      borderRadius="md"
                    >
                      <Flex alignItems="center">
                        <FormControl>
                          <Input
                            placeholder=" "
                            value={option.label}
                            onChange={(e) =>
                              updateOption(oIndex, e.target.value)
                            }
                            flex="1"
                            mr={2}
                          />
                          <FormLabel>Option {oIndex + 1}</FormLabel>
                          <FormErrorMessage>{errors.options}</FormErrorMessage>
                        </FormControl>
                        <IconButton
                          aria-label="Drag"
                          icon={<DragHandleIcon />}
                          variant="ghost"
                          cursor="grab"
                          size="sm"
                          {...provided.dragHandleProps}
                        />
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => {
                            const updatedOptions = poll.options.filter(
                              (_, i) => i !== oIndex
                            );
                            setPoll({ ...poll, options: updatedOptions });
                            onChange({ ...poll, options: updatedOptions });
                          }}
                        >
                          Remove
                        </Button>
                      </Flex>
                      {oIndex === poll.options.length - 1 && (
                        <FormErrorMessage>{errors.options}</FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>

        <Button colorScheme="teal" onClick={addOption}>
          Add Option
        </Button>
      </Stack>
    </DragDropContext>
  );
};
