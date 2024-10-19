import { Badge, Box, FormControl, FormLabel, Switch } from "@chakra-ui/react";
import React from "react";

interface NetworkingStatusProps {
  isNetworking: boolean | undefined;
  handleToggleNetworkingStatus: () => void;
}

export const NetworkingStatus: React.FC<NetworkingStatusProps> = ({
  isNetworking,
  handleToggleNetworkingStatus,
}) => {
  return (
    <Box textAlign="center" w="100%">
      <FormControl
        display="flex"
        alignItems="center"
        justifyContent="center"
        variant={"light"}
      >
        <FormLabel htmlFor="networking-status" mb="0">
          Networking Status
        </FormLabel>
        <Switch
          id="networking-status"
          isChecked={isNetworking}
          onChange={handleToggleNetworkingStatus}
          colorScheme="green"
        />
      </FormControl>
      <Badge
        colorScheme={isNetworking ? "green" : "red"}
        variant="solid"
        px={4}
        py={1}
        borderRadius="full"
      >
        {isNetworking ? "Open to Networking" : "Not Open to Networking"}
      </Badge>
    </Box>
  );
};
