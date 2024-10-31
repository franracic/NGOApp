import { RegisterForm } from "@/components/feature/auth/RegisterForm/RegisterForm";
import { Container } from "@chakra-ui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Create Your Account",
  description:
    "Sign up to access exclusive features and your personalized dashboard.",
};

export default function Register() {
  return (
    <Container maxHeight="100%" alignContent={"center"}>
      <RegisterForm />
    </Container>
  );
}
