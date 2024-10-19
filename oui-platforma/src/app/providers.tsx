// app/providers.tsx
"use client";

import { CompletedVideosProvider } from "@/components/feature/courses/CompletedVideosContext/CompletedVideosContext";
import { ChakraProvider } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import theme from "../styles/theme/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig>
      <ChakraProvider theme={theme}>
        <CompletedVideosProvider>{children}</CompletedVideosProvider>
      </ChakraProvider>
    </SWRConfig>
  );
}
