// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { SWRConfig } from "swr";
import theme from "../styles/theme/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </SWRConfig>
  );
}
