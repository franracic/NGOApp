import { Box, Button, Input } from "@chakra-ui/react";
import React from "react";

type UploadComponentProps = {
  onComplete: () => void;
};

export const UploadComponent: React.FC<UploadComponentProps> = ({
  onComplete,
}) => {
  return (
    <Box>
      <Input type="file" accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx" />
      <Button mt={4} variant={"light"} onClick={onComplete}>
        Upload
      </Button>
    </Box>
  );
};
