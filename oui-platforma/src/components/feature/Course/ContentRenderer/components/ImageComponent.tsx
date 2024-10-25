"use client";
import { Box, Button, Center, Image, Spinner } from "@chakra-ui/react";
import React, { Suspense } from "react";

interface ImageComponentProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  onComplete?: () => void;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  alt,
  width = "100%",
  height = "auto",
  objectFit = "cover",
  onComplete,
}) => {
  return (
    <Suspense
      fallback={
        <Center h={height}>
          <Spinner size="xl" />
        </Center>
      }
    >
      <Box
        rounded="md"
        overflow="hidden"
        width={width}
        height={height}
        border="1px"
        borderColor="gray.300"
      >
        <Image
          src={src}
          alt={alt}
          width="100%"
          height="100%"
          objectFit={objectFit}
          fallback={
            <Center h={height}>
              <Spinner />
            </Center>
          }
        />
        <Button onClick={onComplete} size="sm" w="100%" />
      </Box>
    </Suspense>
  );
};
