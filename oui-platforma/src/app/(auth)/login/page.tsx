"use client";
import { LoginForm } from "@/components/feature/auth/LoginForm/LoginForm";
import { Container } from "@chakra-ui/react";

export default function Login() {
  return (
    <Container maxHeight="100%" alignContent={"center"}>
      <LoginForm />
    </Container>
  );
}
