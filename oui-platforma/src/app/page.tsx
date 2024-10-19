"use client";
import { useRedirect } from "@/hooks/useRedirect";
import { Spinner, VStack } from "@chakra-ui/react";

export default function Page() {
  const isRunning = useRedirect("/dashboard", true);

  if (isRunning) {
    return (
      <VStack py={16}>
        <Spinner size="xl" />
      </VStack>
    );
  }

  return null;
}
