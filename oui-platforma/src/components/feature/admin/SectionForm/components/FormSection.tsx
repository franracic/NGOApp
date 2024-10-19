// components/FormSection.tsx
import { IFormField } from "@/typings/course";
import { DragHandleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export const FormSection = ({
  formFields,
  onChange,
}: {
  formFields: IFormField[];
  onChange: (updatedFormFields: IFormField[]) => void;
}) => {
  const [fields, setFields] = useState<IFormField[]>(formFields || []);
  const [errors, setErrors] = useState<{ [key: number]: { label?: string } }>(
    {}
  );

  const addField = () => {
    setFields([...fields, { label: "", type: "text" }]);
  };

  const updateField = (index: number, key: keyof IFormField, value: any) => {
    const updatedFields = [...fields];
    updatedFields[index] = { ...updatedFields[index], [key]: value };
    setFields(updatedFields);
    validateField(index, updatedFields[index]);
    onChange(updatedFields);
  };

  const validateField = (index: number, field: IFormField) => {
    const newErrors: { label?: string } = {};
    if (!field.label) {
      newErrors.label = "Field label is required.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [index]: newErrors }));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedFields = Array.from(fields);
    const [movedField] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, movedField);

    setFields(reorderedFields);
    onChange(reorderedFields);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="fields">
        {(provided) => (
          <Stack
            {...provided.droppableProps}
            ref={provided.innerRef}
            spacing={4}
          >
            {fields.map((field, fIndex) => (
              <Draggable
                key={`field-${fIndex}`}
                draggableId={`field-${fIndex}`}
                index={fIndex}
              >
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    p={4}
                    borderWidth="1px"
                    rounded="lg"
                    mb={4}
                    bg={snapshot.isDragging ? "blue.50" : "white"}
                    boxShadow={snapshot.isDragging ? "md" : "none"}
                    _hover={{ boxShadow: "lg" }}
                  >
                    <Flex justifyContent="space-between" alignItems="center">
                      <FormControl isInvalid={!!errors[fIndex]?.label}>
                        <Input
                          placeholder=" "
                          value={field.label}
                          onChange={(e) =>
                            updateField(fIndex, "label", e.target.value)
                          }
                          mb={4}
                        />
                        <FormLabel>Field Label</FormLabel>
                        <FormErrorMessage>
                          {errors[fIndex]?.label}
                        </FormErrorMessage>
                      </FormControl>
                      <IconButton
                        aria-label="Drag"
                        icon={<DragHandleIcon />}
                        {...provided.dragHandleProps}
                        variant="ghost"
                        cursor="grab"
                        size="sm"
                      />
                    </Flex>

                    <Select
                      value={field.type}
                      onChange={(e) =>
                        updateField(fIndex, "type", e.target.value)
                      }
                      mb={4}
                    >
                      <option value="text">Text</option>
                      <option value="select">Select</option>
                      <option value="checkbox">Checkbox</option>
                      <option value="radio">Radio</option>
                      <option value="file">File</option>
                    </Select>

                    {field.type === "select" && (
                      <FormControl>
                        <Input
                          placeholder=" "
                          value={field.options?.join(", ") || ""}
                          onChange={(e) =>
                            updateField(
                              fIndex,
                              "options",
                              e.target.value.split(",")
                            )
                          }
                          mb={4}
                        />
                        <FormLabel>Comma-separated options</FormLabel>
                      </FormControl>
                    )}
                  </Box>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Stack>
        )}
      </Droppable>
      <Button colorScheme="teal" onClick={addField}>
        Add Field
      </Button>
    </DragDropContext>
  );
};
