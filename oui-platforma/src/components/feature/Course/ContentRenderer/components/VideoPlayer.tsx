import { Box, Center, Spinner } from "@chakra-ui/react";
import React, { Suspense } from "react";

const ReactPlayer = React.lazy(() => import("react-player"));

interface VideoPlayerProps {
  url: string;
  onEnded?: () => void;
  width?: string;
  height?: string;
  controls?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  onEnded,
  width = "100%",
  height = "480px",
  controls = true,
}) => {
  return (
    <Suspense
      fallback={
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      }
    >
      <Box rounded="26px" overflow="hidden">
        <ReactPlayer
          url={url}
          controls={controls}
          width={width}
          height={height}
          onEnded={onEnded}
        />
      </Box>
    </Suspense>
  );
};
