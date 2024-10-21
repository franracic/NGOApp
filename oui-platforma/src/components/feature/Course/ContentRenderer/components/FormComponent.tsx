import { IFormField } from "@/typings/course";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface FormComponentProps {
  formFields: IFormField[];
  onComplete: () => void;
}

export const FormComponent: React.FC<FormComponentProps> = ({
  formFields,
  onComplete,
}) => {
  const [formValues, setFormValues] = useState<any>({});

  const handleChange = (field: string, value: any) => {
    setFormValues((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box>
      <Heading size="md" mb={4}>
        (Optional) Please fill out the following form:
      </Heading>
      {formFields?.map((field, index) => (
        <FormControl key={index} mb={4}>
          <FormLabel>{field.label}</FormLabel>
          {field.type === "text" && (
            <Input
              type="text"
              value={formValues[field.label] || ""}
              onChange={(e) => handleChange(field.label, e.target.value)}
            />
          )}
          {field.type === "textarea" && (
            <Textarea
              value={formValues[field.label] || ""}
              onChange={(e) => handleChange(field.label, e.target.value)}
            />
          )}
          {field.type === "rating" && (
            <Slider
              colorScheme="yellow"
              defaultValue={3}
              min={1}
              max={5}
              step={1}
              onChange={(val) => handleChange(field.label, val)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
          )}
          {field.type === "multiple-choice" && (
            <RadioGroup
              value={formValues[field.label] || ""}
              onChange={(val) => handleChange(field.label, val)}
            >
              <Stack direction="column">
                {field.options?.map((option, idx) => (
                  <Radio key={idx} value={option}>
                    {option}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          )}
        </FormControl>
      ))}
      <Flex gap={5}>
        <Button variant="light" onClick={onComplete}>
          Submit
        </Button>
        <Button variant="light" onClick={onComplete}>
          Skip
        </Button>
      </Flex>
    </Box>
  );
};
