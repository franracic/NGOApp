import { Box, Button, Image } from "@chakra-ui/react";
import React from "react";

interface ImageViewerProps {
  url: string;
  onComplete: () => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  url,
  onComplete,
}) => {
  return (
    <Box textAlign="center">
      <Image
        src={url}
        alt="Practical task image"
        maxW="100%"
        maxH="500px"
        mb={4}
      />
      <Button variant={"light"} onClick={onComplete}>
        Mark as Viewed
      </Button>
    </Box>
  );
};
