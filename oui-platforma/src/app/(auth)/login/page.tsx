import { LoginForm } from "@/components/feature/auth/LoginForm/LoginForm";
import { Container } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Access Your Account",
  description: "Log in to access your personalized dashboard and features.",
};

export default function Login() {
  return (
    <Container maxHeight="100%" alignContent={"center"}>
      <LoginForm />
    </Container>
  );
}
