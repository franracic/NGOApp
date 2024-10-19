import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";
import { Box, Container, Stack } from "@chakra-ui/react";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Box flexGrow={1} overflowY="auto" alignContent={"center"}>
        <Container maxW="container.2xl" p={0} overflow={"show"}>
          <AuthRedirect to="/dashboard" condition="loggedIn" />
          <Stack height="100%" alignItems="center" justifyContent="center">
            {children}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default AuthLayout;
