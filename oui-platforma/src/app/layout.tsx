"use client";
import { Box, Stack } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box as="html" lang="en" height="100%">
      <Box as="body" height="100%">
        <Providers>
          <Stack
            direction={{
              base: "column",
              md: "row",
            }}
            alignItems="stretch"
            height="100%"
            gap={0}
          >
            {children}
          </Stack>
        </Providers>
      </Box>
    </Box>
  );
}
