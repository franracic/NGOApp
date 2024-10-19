"use client";
import { Card, CardBody } from "@chakra-ui/react";
import { RegisterContextProvider } from "./components/RegisterContextProvider";
import { RegisterStep } from "./components/RegisterStep";
import { RegisterStepper } from "./components/RegisterStepper";

export const RegisterForm = () => {
  return (
    <RegisterContextProvider>
      <Card p={8} bg={"white"} variant={"light"}>
        <CardBody>
          <RegisterStepper />
          <RegisterStep />
        </CardBody>
      </Card>
    </RegisterContextProvider>
  );
};
