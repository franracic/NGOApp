"use client";
import { RegisterForm } from "@/components/feature/auth/RegisterForm/RegisterForm";
import { Container } from "@chakra-ui/react";

export default function Login() {
  return (
    <Container maxHeight="100%" alignContent={"center"}>
      <RegisterForm />
    </Container>
  );
}
