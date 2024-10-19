"use client";
import {
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  Stepper,
  StepSeparator,
  StepStatus,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import { RegisterContext } from "./RegisterContextProvider";

const steps = [
  { title: "First", description: "Personal" },
  { title: "Second", description: "Location" },
  { title: "Third", description: "Work" },
  { title: "Fourth", description: "Account" },
];

export const RegisterStepper = () => {
  const { activeStep, setActiveStep } = useContext(RegisterContext);

  const activeStepText = steps[activeStep].description;

  const handleClick = (index: number) => {
    if (index <= activeStep) {
      setActiveStep(index);
    }
  };

  return (
    <Stack>
      <Stepper size="sm" index={activeStep} gap="0" colorScheme="yellow">
        {steps.map((step, index) => (
          <Step
            key={index}
            onClick={() => handleClick(index)}
            style={{ gap: 0 }}
          >
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <StepSeparator style={{ margin: 0, backgroundColor: "black" }} />
          </Step>
        ))}
      </Stepper>
      <Text>
        Step {activeStep + 1}: <b>{activeStepText}</b>
      </Text>
    </Stack>
  );
};
