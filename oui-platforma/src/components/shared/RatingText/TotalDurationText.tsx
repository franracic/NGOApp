import { Text } from "@chakra-ui/react";
import React from "react";

interface TotalDurationTextProps {
  total_duration: string | undefined;
}

const TotalDurationText: React.FC<TotalDurationTextProps> = ({
  total_duration,
}) => {
  return (
    <Text fontSize="sm">
      <Text as="span" fontWeight="bold" fontSize={"md"}>
        {total_duration}
      </Text>{" "}
      <Text as={"span"} color={"gray.600"}>
        Total
      </Text>
    </Text>
  );
};

export default TotalDurationText;
