"use client";

import { Box, Center, Spinner } from "@chakra-ui/react";
import React, { Suspense } from "react";

const ReactPlayer = React.lazy(() => import("react-player"));

interface AudioPlayerProps {
  url: string;
  onComplete?: () => void;
  width?: string;
  height?: string;
  controls?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  url,
  onComplete,
  width = "100%",
  height = "60px",
  controls = true,
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
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <ReactPlayer
          url={url}
          controls={controls}
          width={width}
          height={height}
          onEnded={onComplete}
          config={{
            file: {
              attributes: {
                preload: "auto",
              },
            },
          }}
        />
      </Box>
    </Suspense>
  );
};
